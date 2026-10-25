import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { copyFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const websiteRoot=fileURLToPath(new URL('.',import.meta.url));
const iplSource=resolve(websiteRoot,'../Portfolio Assets/03 - Angel One x IPL - Ad Campaign 2025/images/ipl cover.webp');
const iplPublic=resolve(websiteRoot,'public/assets/projects/angel-one-ipl/ipl-cover.webp');

function syncIplCover(){
 // Hosted builds use the checked-in public copy when the local archive is absent.
 if(existsSync(iplSource))copyFileSync(iplSource,iplPublic);
}

function localPortfolioImages(){
 return {
  name:'local-portfolio-images',
  buildStart:syncIplCover,
  configureServer(server){
   syncIplCover();
   server.watcher.add(iplSource);
   let timer;
   const onImageChange=file=>{
    if(resolve(file)!==iplSource)return;
    clearTimeout(timer);
    timer=setTimeout(()=>{
     try{syncIplCover();server.ws.send({type:'full-reload'});}
     catch(error){server.config.logger.error(`Could not refresh IPL cover: ${error.message}`);}
    },200);
   };
   server.watcher.on('change',onImageChange).on('add',onImageChange);
   server.httpServer?.once('close',()=>{
    clearTimeout(timer);
    server.watcher.off('change',onImageChange).off('add',onImageChange);
   });
  }
 };
}
const projectEntries=Object.fromEntries(readdirSync('work',{withFileTypes:true}).filter(entry=>entry.isDirectory()).map(entry=>[entry.name,resolve(`work/${entry.name}/index.html`)]));
export default defineConfig({plugins:[localPortfolioImages()],build:{rollupOptions:{input:{home:resolve('index.html'),...projectEntries}}}});
