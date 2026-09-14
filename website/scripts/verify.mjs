import fs from 'node:fs/promises';
import path from 'node:path';
const base = 'http://127.0.0.1:5173';
const files = await fs.readdir('public', { recursive: true, withFileTypes: true });
const assets = files.filter(file => file.isFile()).map(file => '/'+path.relative('public',path.join(file.parentPath,file.name)).replaceAll('\\','/'));
const projects=JSON.parse(await fs.readFile('src/projects.json','utf8'));
const routes=['/', '/work/angel-one-for-everyone/',...projects.map(p=>`/work/${p.slug}/`)];
const urls = [...routes, ...assets];
const results = await Promise.all(urls.map(async url => {
 const response = await fetch(base+url);
 const body = await response.arrayBuffer();
 if(!response.ok || !body.byteLength) throw new Error(`${url}: ${response.status}`);
 if(url.endsWith('.pdf')&&!response.headers.get('content-type')?.includes('pdf'))throw new Error('Resume did not return a PDF');
 if(/\.(webp|jpg|png|svg)$/.test(url)&&!response.headers.get('content-type')?.startsWith('image/'))throw new Error(`${url}: not an image response`);
 return {url,status:response.status,bytes:body.byteLength};
}));
for(const route of routes)await fs.access(`dist${route}index.html`);
for(const p of projects){if(!p.challenge.length||!p.process.length||!p.outcome.length||!p.cover)throw new Error(`Incomplete project: ${p.slug}`);}
console.log(JSON.stringify({routes:routes.length,assets:assets.length,passed:results.length},null,2));
