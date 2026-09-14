import './style.css';
import projectsData from './projects.json';
import {renderProject,connectProjectLinks} from './project-page.js';
import { mountKineticGrid } from './components/ui/kinetic-grid.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const caseUrl='/work/angel-one-for-everyone/';
const currentProject=projectsData.find(p=>location.pathname.replace(/\/$/,'')===`/work/${p.slug}`);
const isCase=Boolean(currentProject)||location.pathname.startsWith(caseUrl.slice(0,-1));
const nav=`<a class="skip" href="#main">Skip to content</a><header class="topbar"><a class="identity" href="/" aria-label="Ketan Vishwakarma home"><span class="monogram">k<span>.</span></span><span>Ketan Vishwakarma<small>Creative Lead & Art Director</small></span></a><nav aria-label="Main navigation"><a href="/#work">Work</a><a href="/#about">About</a><a href="/#experience">Experience</a><a class="contact-link" href="/#contact">Let’s talk <span>↗</span></a></nav></header>`;
document.querySelector('#app').innerHTML=nav+(isCase?`<div class="case-layout"><aside class="contents"><a class="back" href="/#work">← All work</a><div class="eyebrow">IN THIS CASE STUDY</div><nav aria-label="Case study contents">${['Overview','The challenge','My role','Creative system','Campaign in the wild','Social & digital','Impact'].map((t,i)=>`<a href="#${['overview','challenge','role','system','campaign','social','impact'][i]}"><span>0${i+1}</span>${t}</a>`).join('')}</nav><div class="reading"><span>Reading progress</span><span id="progress-label">0%</span><div><i id="progress-bar"></i></div></div></aside><main id="main"><section id="overview" class="case-hero"><div class="eyebrow">ANGEL ONE <span> / </span> INTEGRATED BRAND CAMPAIGN</div><h1>Investing.<br>For <em>everyone.</em></h1><p class="hero-deck">One inclusive idea. Every touchpoint.<br>A unified campaign that made investing feel within reach.</p><div class="case-meta"><div><span>MY ROLE</span>Creative Lead</div><div><span>DISCIPLINES</span>Strategy · Art direction · Production</div><div><span>CHANNELS</span>OOH · Print · Digital</div></div><figure class="hero-figure"><img src="/assets/angel/002-OOH-copy.webp" width="1536" height="1024" alt="Angel One for Everyone campaign on an outdoor billboard" fetchpriority="high"><figcaption><span>ANGEL ONE FOR EVERYONE</span><span>01 / INTEGRATED CAMPAIGN</span></figcaption></figure></section><div id="case-body"></div></main></div>`:`<main id="main"><section class="home-hero"><div class="hero-copy"><div class="eyebrow">CREATIVE STRATEGY. ART DIRECTION. IMPACT.</div><h1>Make it clear.<br>Make it <em>matter.</em></h1><p>I’m Ketan, a Creative Lead turning complex ideas into campaigns people connect with.</p><a class="button" href="#work">Explore selected work <span>↓</span></a><div class="hero-note">12+ years of creative craft <span>Based in Mumbai, India</span></div></div><div class="portrait"><img src="/assets/portrait.webp" width="1805" height="1023" alt="Portrait of Ketan Vishwakarma against an orange background"><span class="portrait-label">KETAN VISHWAKARMA<br>CREATIVE LEAD / MUMBAI</span></div></section><section id="work" class="home-section"><div class="section-top"><div class="eyebrow">01 / SELECTED WORK</div><span>Strategy into stories. Stories into impact.</span></div><a class="featured" href="${caseUrl}"><div class="featured-image"><img src="/assets/angel/002-OOH-copy.webp" width="1536" height="1024" alt="Angel One for Everyone campaign billboard"><span class="round-arrow">↗</span></div><div class="project-caption"><div><span class="eyebrow">ANGEL ONE / INTEGRATED CAMPAIGN</span><h2>A brand for everyone.</h2></div><span class="project-result">10M+<small>campaign reach</small></span></div></a></section><div id="home-body"></div></main>`);

const sizes={'002-OOH-copy.webp':[1536,1024],'003-asset.webp':[1254,1254],'004-asset.webp':[1024,1536],'005-asset.webp':[1672,941],'006-asset.webp':[1014,1551],'007-asset.webp':[991,1548],'008-asset.webp':[1520,1035],'009-asset.jpg':[1080,1350],'010-asset.jpg':[1080,1350],'011-asset.jpg':[1080,1350]};
const themeToggle=document.createElement('button');
themeToggle.className='theme-toggle';
themeToggle.type='button';
document.querySelector('.topbar nav').append(themeToggle);
function applyTheme(theme){
 document.documentElement.dataset.theme=theme;
 const light=theme==='light';
 themeToggle.innerHTML=light?'<span aria-hidden="true">☾</span>':'<span aria-hidden="true">☀</span>';
 themeToggle.setAttribute('aria-label',light?'Switch to dark mode':'Switch to light mode');
 themeToggle.title=themeToggle.getAttribute('aria-label');
 document.querySelector('meta[name="theme-color"]')?.setAttribute('content',light?'#e2dfd7':'#040506');
 window.dispatchEvent(new Event('portfolio-theme-change'));
}
let initialTheme='dark';try{initialTheme=localStorage.getItem('portfolio-theme')==='light'?'light':'dark';}catch{}
applyTheme(initialTheme);
themeToggle.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='light'?'dark':'light';applyTheme(next);try{localStorage.setItem('portfolio-theme',next);}catch{}});
if(isCase){
 const cover=document.querySelector('.hero-figure');
 cover.classList.add('case-cover');
 cover.id='cover';
 cover.setAttribute('aria-label','Angel One for Everyone campaign cover');
 const introduction=document.querySelector('.case-hero');
 introduction.innerHTML=`<a class="case-back" href="/#work">← All work</a><div class="case-index">Nº 01 <span></span> Case study</div><div class="case-intro-grid"><div><div class="case-tags"><span>Fintech</span><span>Brand campaign</span><span>Integrated</span></div><h1>Angel One for Everyone:<br>Integrated Brand Campaign</h1><p class="hero-deck">Making investing feel within reach. One inclusive idea, brought to life across outdoor, print and digital.</p></div><dl class="case-facts"><div><dt>CLIENT</dt><dd>Angel One</dd></div><div><dt>MY ROLE</dt><dd>Creative Lead</dd></div><div><dt>DISCIPLINES</dt><dd>Strategy · Art direction · Production</dd></div></dl></div>`;
 introduction.append(cover);
 document.querySelector('.case-layout').before(introduction);
 document.querySelector('.skip').href='#overview';
 document.querySelector('.contents nav').insertAdjacentHTML('afterbegin','<a href="#cover"><span>↗</span>Campaign cover</a>');
}
const hero=document.querySelector('.home-hero');
if(hero){
 const heroContent=document.createElement('div');
 heroContent.className='hero-content';
 heroContent.append(...hero.children);
 hero.append(heroContent);
 const cleanupGrid=mountKineticGrid(hero);
 window.addEventListener('pagehide',cleanupGrid,{once:true});
 if(import.meta.hot)import.meta.hot.dispose(cleanupGrid);
}
const media=(file,alt,caption,cls='')=>`<figure class="media ${cls}"><button class="zoom-image" data-image="/assets/angel/${file}" data-caption="${caption}" aria-label="Enlarge: ${alt}"><img src="/assets/angel/${file}" width="${sizes[file][0]}" height="${sizes[file][1]}" alt="${alt}" loading="lazy" decoding="async"><span class="zoom-hint" aria-hidden="true">↗</span></button><figcaption>${caption}</figcaption></figure>`;
const chapter=(n,label,title)=>`<div class="chapter-head"><span class="eyebrow">${n} / ${label}</span><h2>${title}</h2></div>`;
const footer=`<footer id="contact"><div class="eyebrow">LET’S MAKE SOMETHING MEANINGFUL</div><h2>Your next big idea.<br><em>Let’s bring it to life.</em></h2><a class="email-link" href="mailto:vketan.best@gmail.com">vketan.best@gmail.com <span>↗</span></a><div class="footer-bottom"><span>© ${new Date().getFullYear()} Ketan Vishwakarma</span><div><a href="https://www.linkedin.com/in/kpicx" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="/assets/ketan-vishwakarma-resume.pdf" target="_blank" rel="noopener">Résumé ↗</a><a href="#main">Back to top ↑</a></div></div></footer>`;
if(isCase){
 document.querySelector('#case-body').innerHTML=`
 <div class="summary-strip"><div><strong>10M+</strong><span>Overall campaign reach</span></div><div><strong>10+</strong><span>Adaptable creative formats</span></div><div><strong>360°</strong><span>One connected brand story</span></div></div>
 <section id="challenge" class="chapter">${chapter('02','THE CHALLENGE','Investing had an<br>image problem.')}<div class="story"><p>Retail investing in India was often perceived as complex and reserved for experienced traders. “Angel One for Everyone” set out to challenge that perception and build trust with first-time investors.</p><p>The brief was to create a visual system that worked across digital, web and physical environments—communicating offers such as a free demat account and zero brokerage, with a consistent identity from a mobile screen to a billboard.</p></div><div class="statement"><span class="eyebrow">THE CREATIVE AMBITION</span><p>Make an unfamiliar financial world<br>feel <em>familiar, accessible and human.</em></p></div></section>
 <section id="role" class="chapter">${chapter('03','MY ROLE','Leading the idea.<br>Connecting the execution.')}<p class="intro">As Creative Lead, I led the execution of the integrated campaign, connecting brand strategy, art direction and production across teams and channels.</p><div class="role-list"><article><span>01</span><div><h3>Brand identity & visual direction</h3><p>Defined the overarching visual narrative and directed photoshoot and visual assets to resonate with Indian audiences.</p></div></article><article><span>02</span><div><h3>An adaptable creative framework</h3><p>Built a modular system for 10+ formats, including outdoor billboards, print, Google Display Network banners, App Store assets and social ads.</p></div></article><article><span>03</span><div><h3>From awareness to acquisition</h3><p>Partnered with growth marketers to translate brand assets into digital ad variations, maintaining a connected journey from offline exposure to app install.</p></div></article></div></section>
 <section id="system" class="chapter">${chapter('04','CREATIVE SYSTEM','One visual language.<br>Room for every format.')}<p class="intro">The campaign’s blue and orange palette, human portraits and prominent app imagery keep the story recognisable as the canvas changes.</p><div class="system-board"><div class="brand-lockup"><img src="/assets/angel/001-Angel_One_Logo_edited.png" width="960" height="198" loading="lazy" alt="Angel One white campaign logo"><p>for <em>Everyone</em></p></div><div class="swatches"><span style="background:#064bd3">Campaign blue</span><span style="background:#f47809;color:#161616">Signal orange</span><span style="background:#fff;color:#161616">Clear space</span></div><div class="principles"><div><span>01 / PEOPLE FIRST</span><p>Familiar faces.<br>An approachable tone.</p></div><div><span>02 / PRODUCT VISIBLE</span><p>The app in hand.<br>The next step in view.</p></div><div><span>03 / FLEXIBLE BY DESIGN</span><p>A consistent identity.<br>Many ways to show up.</p></div></div></div>${media('005-asset.webp','Wide Angel One campaign artwork featuring a woman holding a phone','The campaign language: people, product and a clear call to action.','full-media')}</section>
 <section id="campaign" class="chapter">${chapter('05','CAMPAIGN IN THE WILD','Built to be seen.<br>Designed to be recognised.')}<p class="intro">The same visual idea moves from high-impact outdoor to compact display placements. Hierarchy and composition adapt while the campaign stays recognisable.</p>${media('002-OOH-copy.webp','Angel One campaign outdoor billboard','Outdoor / A large-format expression of the “for Everyone” idea.','full-media')}<div class="image-pair">${media('006-asset.webp','Vertical campaign creative featuring a man and woman','Vertical display / People and product within a narrow canvas.')}${media('007-asset.webp','Vertical campaign creative featuring a woman holding the Angel One app','Vertical display / A consistent hierarchy across creative variations.')}</div><p class="archive-note">Campaign artwork is shown in its original context. Product offers reflect the campaign period.</p></section>
 <section id="social" class="chapter">${chapter('06','SOCIAL & DIGITAL','From the street<br>to the scroll.')}<p class="intro">Social creatives carry the campaign’s tone into everyday feeds. The execution flexes across placement and audience while keeping the brand story connected.</p><div class="digital-pair">${media('003-asset.webp','Angel One campaign shown in a social feed','Social feed / Brand recognition in a familiar environment.')}${media('004-asset.webp','Angel One creative shown in a mobile Google search result','Search / Carrying the visual identity into discovery.')}</div>${media('008-asset.webp','Angel One App for Smart Investing campaign creative','Digital campaign / A direct product message within the shared visual system.','full-media')}<div class="social-trio">${media('009-asset.jpg','Orange Angel One It’s a match social creative','Orange / A playful social expression.')}${media('010-asset.jpg','Blue Angel One It’s a match social creative','Blue / One idea, multiple personalities.')}${media('011-asset.jpg','Green Angel One It’s a match social creative','Green / Visual variety within the campaign.')}</div></section>
 <section id="impact" class="chapter impact">${chapter('07','IMPACT','A consistent story.<br>At a national scale.')}<div class="impact-number">10M<span>+</span></div><p class="impact-label">Overall campaign reach</p><div class="story"><p>The campaign established a consistent identity across first-time investor touchpoints, connecting high-impact outdoor with print, paid social and search.</p><p>The lasting contribution was a modular creative framework: a shared visual narrative that could adapt across 10+ formats and support high-volume delivery.</p></div><p class="archive-note">Reach and format count are reported in the original project documentation.</p><div class="skill-tags">${['Creative strategy','Art direction','Video production','Key visual development','Print & OOH','Agency management','Cross-functional collaboration'].map(x=>`<span>${x}</span>`).join('')}</div><a class="button" href="/#work">Back to selected work <span>↗</span></a></section>`;
 document.querySelector('.case-layout main').insertAdjacentHTML('beforeend',footer);
 document.querySelector('.contents nav').insertAdjacentHTML('beforeend','<a href="#contact"><span>08</span>Let’s talk</a>');
}else{
 const archive=[['02','Product-led campaigns','Stocks · IPO · F&O · MTF','comp-mown4ox0'],['03','Angel One × IPL','Ad campaign / 2025','comp-mn2xicfa'],['04','Pesto','SaaS product explainer','comp-mrw3kwgo'],['05','MyMuse','Product-led ads','comp-mryyrib6'],['06','A study in time','Cinematic watch promo','comp-mt9yx9ea'],['07','Making finance understandable','YouTube educational content','comp-mqyt67vz'],['08','Angel One brand films','Brand storytelling','comp-mp0xl8cx'],['09','Banking, beyond the branch','HDFC · ICICI · Yes Bank / Events','comp-mp0v5or0'],['10','Toyota × Drum Tao','India tour','comp-mp11fik6']];
 document.querySelector('#home-body').innerHTML=`<section class="home-section archive"><div class="section-top"><div class="eyebrow">MORE FROM THE ARCHIVE</div><span>Explore projects on my original portfolio ↗</span></div>${archive.map(([n,title,cat,id])=>`<a class="archive-row" href="https://ketanv.wixsite.com/home/portfolio-2#${id}" target="_blank" rel="noopener noreferrer"><span class="archive-index">${n}</span><h3>${title}</h3><span class="archive-category">${cat}</span><span>↗</span></a>`).join('')}</section>
 <section id="about" class="home-section about"><div class="eyebrow">02 / THE PERSON BEHIND THE WORK</div><div class="about-grid"><h2>Strategy in mind.<br>Craft at heart.<br><em>People at the centre.</em></h2><div><p>I’m Ketan Vishwakarma, a Creative Lead based in Mumbai with 12+ years across financial services, e-commerce and brand communications.</p><p>I lead integrated campaigns from the first brief through art direction, production and final delivery. My work brings designers, video teams, agencies and growth marketers together around a shared creative direction.</p><p>I also explore AI-assisted production to make more room for thinking, experimenting and refining the work.</p><a class="text-link" href="/assets/ketan-vishwakarma-resume.pdf" target="_blank" rel="noopener">Read my résumé ↗</a></div></div><div class="approach-grid"><article><span class="eyebrow">01 / STRATEGY</span><h3>Find the human truth.</h3><p>Turn the business brief into a clear creative direction that speaks to the audience.</p></article><article><span class="eyebrow">02 / CRAFT</span><h3>Make the idea tangible.</h3><p>Shape visual identities, campaign systems and films with a consistent point of view.</p></article><article><span class="eyebrow">03 / LEADERSHIP</span><h3>Give good work room.</h3><p>Guide teams and production partners from concept through delivery and optimisation.</p></article></div><div class="playground"><div><span class="eyebrow">A LITTLE CREATIVE CURIOSITY</span><h3>Ideas take shape.</h3><p>Explore a small interactive study in form.</p></div><div class="shape-zone" id="shape-zone"><span class="static-shape" aria-hidden="true">✳</span></div><button class="outline-button" id="shape-toggle" aria-pressed="false">Explore in 3D ↗</button></div></section>
 <section id="experience" class="home-section experience"><div class="section-top"><div class="eyebrow">03 / THE JOURNEY SO FAR</div><a class="text-link" href="/assets/ketan-vishwakarma-resume.pdf" target="_blank" rel="noopener">Full résumé ↗</a></div><h2>From making visuals<br>to <em>leading the vision.</em></h2><div class="timeline"><article><time>Aug 2021 — Feb 2026</time><div><span class="company">Angel One</span><h3>Chief Manager, Creative Lead</h3><p>Led integrated campaign strategy, performance creatives, IPL campaigns and educational video production. Introduced GenAI workflows that reduced production turnaround by 35%.</p></div></article><article><time>Jun 2017 — Jul 2021</time><div><span class="company">YardnVision Studio</span><h3>Head of Design</h3><p>Led a team of six designers across e-commerce campaigns, product shoots, healthcare UX and accessible eLearning experiences.</p></div></article><article><time>Jul 2014 — May 2017</time><div><span class="company">WOOTFactor Brand Architects</span><h3>Senior Visual Designer</h3><p>Owned visual narratives and production for banking brands across digital, ATL/BTL, exhibitions and 14+ events a year.</p></div></article></div><div class="education"><span class="eyebrow">EDUCATION & CONTINUED LEARNING</span><p>Bachelor of Design & Animation · MAAC / IGNOU · 2013–2016</p><p>Google AI Essentials · Google Ads Video · Google Digital Marketing · Design Thinking: Customer Experience</p></div></section>${footer}`;
}

if(!isCase){
 const projects=[
  {name:'Angel One for Everyone',tag:'INTEGRATED CAMPAIGN',description:'One inclusive idea. Every touchpoint.',image:'/assets/angel/002-OOH-copy.webp',alt:'Angel One for Everyone campaign billboard',url:caseUrl,type:'lead',width:1536,height:1024},
  {name:'MyMuse',tag:'PRODUCT-LED ADS',description:'A more personal kind of storytelling.',image:'/assets/covers/mymuse.webp',alt:'MyMuse Glow product campaign',url:'https://ketanv.wixsite.com/home/portfolio-2#comp-mryyrib6',type:'portrait-card',width:1024,height:1536},
  {name:'Pesto',tag:'SAAS / MOTION & 3D',description:'Complex products. Clear stories.',image:'/assets/covers/pesto.jpg',alt:'Pesto platform presented on a three-dimensional tablet',url:'https://ketanv.wixsite.com/home/portfolio-2#comp-mrw3kwgo',width:1920,height:1080},
  {name:'Angel One × IPL',tag:'CAMPAIGN / 2025',description:'Creative at the speed of the game.',image:'/assets/covers/ipl.webp',alt:'Angel One and Tata IPL campaign partnership artwork',url:'https://ketanv.wixsite.com/home/portfolio-2#comp-mn2xicfa',type:'ipl-card',width:2902,height:1420},
  {name:'A study in time',tag:'CINEMATIC PRODUCT FILM',description:'The details make the difference.',image:'/assets/covers/watch.jpg',alt:'Giordano watch campaign film still',url:'https://ketanv.wixsite.com/home/portfolio-2#comp-mt9yx9ea',width:1280,height:720}
 ];
 const work=document.querySelector('#work');
 work.querySelector('.featured').remove();
 work.insertAdjacentHTML('beforeend',`<div class="bento-grid">${projects.map((p,i)=>`<a class="bento-card ${p.type||''}" href="${p.url}" ${i?'target="_blank" rel="noopener noreferrer"':''}><img src="${p.image}" width="${p.width}" height="${p.height}" loading="lazy" decoding="async" alt="${p.alt}"><span class="bento-top"><span>${String(i+1).padStart(2,'0')}</span><span>${i?'Original case study ↗':'View case study ↗'}</span></span><div class="bento-copy"><span class="eyebrow">${p.tag}</span><h3>${p.name}</h3><p>${p.description}</p></div><span class="bento-arrow" aria-hidden="true">↗</span></a>`).join('')}</div>`);
 document.querySelectorAll('.archive-row').forEach(link=>{if(projects.some(p=>p.url===link.href))link.remove();});
 document.querySelector('.archive .section-top>.eyebrow').textContent='FURTHER EXPLORATIONS';
}

document.body.insertAdjacentHTML('beforeend',`<dialog id="image-dialog" aria-label="Campaign image preview"><button class="close-dialog" autofocus aria-label="Close image preview">Close ×</button><img alt=""><p id="image-caption"></p><a class="text-link" id="original-image" target="_blank" rel="noopener">Open original image ↗</a></dialog>`);
if(currentProject)renderProject(currentProject,projectsData,footer);
if(!isCase)connectProjectLinks(projectsData);
const dialog=document.querySelector('#image-dialog');
let opener;
document.querySelectorAll('.zoom-image').forEach(button=>button.addEventListener('click',async()=>{
 opener=button;dialog.querySelector('img').src=button.dataset.image;dialog.querySelector('img').alt=button.querySelector('img').alt;dialog.querySelector('p').textContent=button.dataset.caption;dialog.querySelector('a').href=button.dataset.image;dialog.showModal();document.body.classList.add('dialog-open');
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches){try{const {animate}=await import('animejs/animation');if(dialog.open)animate(dialog.querySelector('img'),{opacity:[0,1],scale:[.98,1],duration:260,ease:'outQuad'});}catch{}}
}));
dialog.querySelector('button').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const b=dialog.getBoundingClientRect();if(event.clientX<b.left||event.clientX>b.right||event.clientY<b.top||event.clientY>b.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');opener?.focus({preventScroll:true});});

gsap.matchMedia().add('(prefers-reduced-motion: no-preference)',()=>{
 gsap.from('h1',{y:24,autoAlpha:0,duration:.75,ease:'power2.out',clearProps:'all'});
 document.querySelectorAll('.chapter-head,.about-grid,.timeline article,.approach-grid article').forEach(el=>gsap.from(el,{y:20,autoAlpha:0,duration:.65,ease:'power2.out',clearProps:'all',scrollTrigger:{trigger:el,start:'top 92%',once:true}}));
 if(!isCase){
  gsap.from('.hero-copy>.eyebrow,.hero-copy>p,.hero-copy>.button,.hero-note',{y:12,opacity:0,duration:.6,stagger:.09,delay:.15,ease:'power2.out',clearProps:'all'});
  ScrollTrigger.batch('.bento-card',{start:'top 96%',once:true,onEnter:cards=>gsap.from(cards,{y:28,opacity:.35,duration:.7,stagger:.09,ease:'power2.out',clearProps:'all'})});
  gsap.from('#contact h2',{y:20,opacity:0,duration:.7,clearProps:'all',scrollTrigger:{trigger:'#contact',start:'top 85%',once:true}});
 }
});
if(isCase){
 const sections=[...document.querySelectorAll('.case-hero,.case-cover,.case-layout main section[id],.case-layout main footer[id]')];const links=[...document.querySelectorAll('.contents nav a')];
 const update=()=>{
  let current=sections[0];for(const section of sections)if(section.getBoundingClientRect().top<=140)current=section;
  if(scrollY+innerHeight>=document.documentElement.scrollHeight-3)current=sections.at(-1);
  links.forEach(link=>{
   const active=link.hash===`#${current.id}`;const changed=active&&!link.classList.contains('active');
   link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');
   if(changed&&matchMedia('(max-width:760px)').matches){const menu=link.parentElement;const left=link.offsetLeft;menu.scrollTo({left:Math.max(0,left-menu.clientWidth/2+link.offsetWidth/2),behavior:'instant'});}
  });
  const progress=Math.min(1,Math.max(0,window.scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)));
  document.querySelector('#progress-bar').style.transform=`scaleX(${progress})`;document.querySelector('#progress-label').textContent=`${Math.round(progress*100)}%`;
 };
 ScrollTrigger.create({start:0,end:'max',onUpdate:update,onRefresh:update});update();
}
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const el=document.getElementById(a.hash.slice(1));if(!el)return;e.preventDefault();history.pushState(null,'',a.hash);el.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});el.setAttribute('tabindex','-1');el.focus({preventScroll:true});}));
window.addEventListener('load',()=>{ScrollTrigger.refresh();if(location.hash)document.getElementById(location.hash.slice(1))?.scrollIntoView();});
document.querySelector('#shape-toggle')?.addEventListener('click',async function(){
 if(this.dataset.loaded){window.dispatchEvent(new Event('turn-shape'));return;}this.disabled=true;this.textContent='Opening…';
 try{const {startShape}=await import('./shape.js');await startShape(document.querySelector('#shape-zone'));this.dataset.loaded='true';this.textContent='Turn the shape ↻';this.setAttribute('aria-pressed','true');}catch{this.textContent='3D unavailable on this device';}finally{this.disabled=false;}
});
