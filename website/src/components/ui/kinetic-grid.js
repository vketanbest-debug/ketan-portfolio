// Canvas adaptation of the supplied React KineticGrid for this vanilla Vite site.
export function mountKineticGrid(host) {
  const canvas = document.createElement('canvas');
  canvas.className = 'kinetic-grid';
  canvas.setAttribute('aria-hidden', 'true');
  host.prepend(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) { canvas.remove(); return () => {}; }
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let width = 0, height = 0, frame = 0, visible = true, disposed = false;
  let mouse = { x: -9999, y: -9999 }, target = { ...mouse }, ripples = [];
  const mix = (a, b, t) => a + (b - a) * t;
  const isLight=()=>document.documentElement.dataset.theme==='light';
  const color = (t, base = .13) => {const neutral=isLight()?35:255;return `rgba(${Math.round(mix(neutral,74,t))},${Math.round(mix(neutral,158,t))},${Math.round(mix(neutral,255,t))},${mix(base,.9,t)})`;};

  function draw(now) {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = isLight()?'#ff6363':'rgba(255,255,255,.05)';
    for (let x = 14; x < width; x += 28) for (let y = 14; y < height; y += 28) {
      ctx.beginPath(); ctx.arc(x,y,.7,0,Math.PI*2); ctx.fill();
    }
    ripples = ripples.filter(r => now-r.born < 834);
    const cols = Math.max(2, Math.ceil(width/55))+1;
    const rows = Math.max(2, Math.ceil(height/55))+1;
    const points = [];
    for (let row=0; row<rows; row++) {
      points[row]=[];
      for (let col=0; col<cols; col++) {
        const gx=col*width/(cols-1), gy=row*height/(rows-1);
        const pin=Math.min(col/1.5,(cols-1-col)/1.5,1)**2*Math.min(row/1.5,(rows-1-row)/1.5,1)**2;
        const dx=gx-mouse.x, dy=gy-mouse.y, dist=Math.hypot(dx,dy);
        const proximity=Math.max(0,1-dist/260)*pin;
        let x=gx,y=gy;
        if (dist>0&&dist<260) {
          const warp=(1-dist/260)**2*Math.min(1,dist/60)*24*pin;
          x-=dx/dist*warp; y-=dy/dist*warp;
        }
        for (const ripple of ripples) {
          const age=Math.max(0,(now-ripple.born)/1000), radius=age*400;
          const rdx=gx-ripple.x,rdy=gy-ripple.y,rdist=Math.hypot(rdx,rdy),diff=rdist-radius;
          if (Math.abs(diff)<55&&rdist>0) {
            const strength=(1-Math.abs(diff)/55)*Math.max(0,1-age*1.2)*18*pin*(diff<0?1:-1);
            x+=rdx/rdist*strength; y+=rdy/rdist*strength;
          }
        }
        points[row][col]={x,y,proximity};
      }
    }
    const segment=(a,b)=>{
      const average=(a.proximity+b.proximity)/2,t=average*average*(3-2*average);
      ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);
      ctx.strokeStyle=color(t);ctx.lineWidth=mix(.8,1.5,t);ctx.stroke();
    };
    for (let row=0;row<rows;row++) for(let col=0;col<cols;col++) {
      const p=points[row][col];
      if(col<cols-1)segment(p,points[row][col+1]);
      if(row<rows-1)segment(p,points[row+1][col]);
    }
    for(const row of points) for(const p of row) {
      const t=p.proximity*p.proximity*(3-2*p.proximity),radius=mix(1.8,3.2,t);
      if(t>.3) {
        const glowRadius=radius+6*(t-.3)/.7;
        const glow=ctx.createRadialGradient(p.x,p.y,radius*.5,p.x,p.y,glowRadius);
        glow.addColorStop(0,`rgba(74,158,255,${t*.3})`);glow.addColorStop(1,'rgba(74,158,255,0)');
        ctx.beginPath();ctx.arc(p.x,p.y,glowRadius,0,Math.PI*2);ctx.fillStyle=glow;ctx.fill();
      }
      ctx.beginPath();ctx.arc(p.x,p.y,radius,0,Math.PI*2);ctx.fillStyle=color(t,.2);ctx.fill();
    }
    for(const r of ripples) {
      const age=Math.max(0,(now-r.born)/1000);
      ctx.beginPath();ctx.arc(r.x,r.y,age*400,0,Math.PI*2);
      ctx.strokeStyle=`rgba(100,180,255,${Math.max(0,1-age*1.2)*.28})`;ctx.lineWidth=1.5;ctx.stroke();
    }
  }
  function tick(now) {
    frame=0;
    if(disposed||!visible||document.hidden)return;
    mouse.x=mix(mouse.x,target.x,.12);mouse.y=mix(mouse.y,target.y,.12);
    draw(now);
    if(!reduced.matches&&(Math.hypot(mouse.x-target.x,mouse.y-target.y)>.15||ripples.length))frame=requestAnimationFrame(tick);
  }
  function wake(){if(!frame&&!disposed&&visible&&!document.hidden)frame=requestAnimationFrame(tick);}
  function resize(){
    const bounds=host.getBoundingClientRect();width=bounds.width;height=bounds.height;
    const dpr=Math.min(devicePixelRatio||1,2);
    canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);wake();
  }
  function move(event){
    if(reduced.matches||event.pointerType==='touch')return;
    const bounds=host.getBoundingClientRect();target={x:event.clientX-bounds.left,y:event.clientY-bounds.top};
    if(mouse.x===-9999)mouse={...target};wake();
  }
  function leave(){target={x:-9999,y:-9999};wake();}
  function click(event){
    if(reduced.matches||event.target.closest('a,button'))return;
    const bounds=host.getBoundingClientRect();
    ripples.push({x:event.clientX-bounds.left,y:event.clientY-bounds.top,born:performance.now()});
    ripples=ripples.slice(-6);wake();
  }
  function preference(){mouse=target={x:-9999,y:-9999};ripples=[];wake();}
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);
  const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)wake();else {cancelAnimationFrame(frame);frame=0;} });intersection.observe(host);
  host.addEventListener('pointermove',move,{passive:true});host.addEventListener('pointerleave',leave);
  host.addEventListener('click',click);reduced.addEventListener('change',preference);
  document.addEventListener('visibilitychange',wake);window.addEventListener('portfolio-theme-change',wake);resize();
  return ()=>{disposed=true;cancelAnimationFrame(frame);resizeObserver.disconnect();intersection.disconnect();host.removeEventListener('pointermove',move);host.removeEventListener('pointerleave',leave);host.removeEventListener('click',click);reduced.removeEventListener('change',preference);document.removeEventListener('visibilitychange',wake);window.removeEventListener('portfolio-theme-change',wake);canvas.remove();};
}
