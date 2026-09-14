// Floating navigation adapted to the portfolio's existing vanilla JavaScript setup.
export function mountNavigation(header){
 const content=document.createElement('div');
 content.className='floating-nav-content';content.id='primary-navigation-content';
 content.append(...header.children);header.append(content);
 const toggle=document.createElement('button');
 toggle.type='button';toggle.className='floating-nav-toggle';
 toggle.setAttribute('aria-label','Expand navigation');toggle.setAttribute('aria-controls',content.id);
 toggle.innerHTML='<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M5 7h14M5 12h14M5 17h14"/></svg>';
 header.append(toggle);header.classList.add('floating-nav');
 let expanded=true,lastY=window.scrollY,peakY=lastY,frame=0;
 const setExpanded=value=>{
  expanded=value;header.classList.toggle('is-collapsed',!value);
  content.inert=!value;content.setAttribute('aria-hidden',String(!value));
  toggle.tabIndex=value?-1:0;toggle.setAttribute('aria-expanded',String(value));
  toggle.setAttribute('aria-hidden',String(value));
 };
 setExpanded(true);
 const expand=event=>{setExpanded(true);lastY=window.scrollY;peakY=lastY;if(event.detail===0)content.querySelector('a')?.focus({preventScroll:true});else toggle.blur();};
 toggle.addEventListener('click',expand);
 const update=()=>{
  frame=0;const y=Math.max(0,window.scrollY);peakY=Math.max(peakY,y);
  if(y<80)setExpanded(true);
  else if(expanded&&y>150&&y-lastY>2&&!header.querySelector(':focus-visible')){setExpanded(false);peakY=y;}
  else if(!expanded&&peakY-y>80){setExpanded(true);peakY=y;}
  lastY=y;
 };
 const scroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
 window.addEventListener('scroll',scroll,{passive:true});
 header.addEventListener('keydown',event=>{if(event.key==='Escape'&&expanded){setExpanded(false);toggle.focus({preventScroll:true});}});
 return ()=>{window.removeEventListener('scroll',scroll);cancelAnimationFrame(frame);};
}
