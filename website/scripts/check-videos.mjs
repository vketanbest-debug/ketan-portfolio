import fs from 'node:fs/promises';
const projects=JSON.parse(await fs.readFile('src/projects.json','utf8'));
const results=[];
await fs.mkdir('public/assets/video-thumbnails',{recursive:true});
for(const project of projects){
 await Promise.all(project.videos.map(async video=>{
  try{
   const response=await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(video.url)}&format=json`,{signal:AbortSignal.timeout(10000)});
   if(response.ok){
    const info=await response.json();video.title=info.title;
    const thumbnail=await fetch(info.thumbnail_url,{signal:AbortSignal.timeout(10000)});
    if(!thumbnail.ok||!thumbnail.headers.get('content-type')?.startsWith('image/'))throw new Error('Thumbnail unavailable');
    video.thumbnail=`/assets/video-thumbnails/${video.video_id}.jpg`;
    await fs.writeFile(`public${video.thumbnail}`,Buffer.from(await thumbnail.arrayBuffer()));
    results.push({id:video.video_id,status:'available',thumbnail:video.thumbnail});
   }
   else results.push({id:video.video_id,status:response.status});
  }catch{results.push({id:video.video_id,status:'unverified'});}
 }));
}
await fs.writeFile('src/projects.json',JSON.stringify(projects,null,2));
console.log(JSON.stringify(results,null,2));
