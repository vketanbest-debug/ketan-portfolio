import { gsap } from 'gsap';

export function mountBrandSlider(hero, brands) {
 const items=brands.map(([name,file,width,height,tone])=>`<li class="brand-slider-logo ${tone?`is-${tone}`:''} ${width===height?'is-square':''}"><img src="/assets/Logos/${encodeURIComponent(file)}" width="${width}" height="${height}" alt="${name}" decoding="async"></li>`).join('');
 hero.classList.add('has-brand-slider');
 hero.insertAdjacentHTML('beforeend',`<section id="brands" class="brand-slider" aria-label="Brands I worked with"><div class="brand-slider-window" tabindex="0" aria-label="Brand logos"><div class="brand-slider-track"><ul class="brand-slider-group" role="list">${items}</ul><ul class="brand-slider-group brand-slider-copy" aria-hidden="true">${items.replaceAll(/alt="[^"]*"/g,'alt=""')}</ul></div></div><button class="brand-slider-toggle" type="button" aria-label="Pause logo slider" aria-pressed="false"><span aria-hidden="true">Ⅱ</span></button></section>`);
 const slider=hero.querySelector('.brand-slider');
 const track=slider.querySelector('.brand-slider-track');
 const viewport=slider.querySelector('.brand-slider-window');
 const button=slider.querySelector('.brand-slider-toggle');
 const media=gsap.matchMedia();
 media.add('(prefers-reduced-motion: no-preference)',()=>{
  const tween=gsap.fromTo(track,{xPercent:0},{xPercent:-50,duration:track.scrollWidth/2/40,repeat:-1,ease:'none'});
  let manuallyPaused=false;
  const sync=()=>tween.paused(manuallyPaused||slider.matches(':hover')||slider.contains(document.activeElement));
  const toggle=()=>{
   manuallyPaused=!manuallyPaused;
   button.setAttribute('aria-pressed',String(manuallyPaused));
   button.setAttribute('aria-label',manuallyPaused?'Play logo slider':'Pause logo slider');
   button.firstElementChild.textContent=manuallyPaused?'▶':'Ⅱ';
   sync();
  };
  const focusOut=()=>queueMicrotask(sync);
  slider.addEventListener('mouseenter',sync);
  slider.addEventListener('mouseleave',sync);
  slider.addEventListener('focusin',sync);
  slider.addEventListener('focusout',focusOut);
  button.addEventListener('click',toggle);
  sync();
  return ()=>{
   slider.removeEventListener('mouseenter',sync);
   slider.removeEventListener('mouseleave',sync);
   slider.removeEventListener('focusin',sync);
   slider.removeEventListener('focusout',focusOut);
   button.removeEventListener('click',toggle);
   button.setAttribute('aria-pressed','false');
   button.setAttribute('aria-label','Pause logo slider');
   button.firstElementChild.textContent='Ⅱ';
   viewport.scrollLeft=0;
  };
 });
 return ()=>media.revert();
}
