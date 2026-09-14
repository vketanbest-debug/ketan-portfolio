const escape = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const paragraphs = items => items.map(text => text.startsWith('•') ? `<h3>${escape(text.slice(1).trim())}</h3>` : `<p>${escape(text)}</p>`).join('');
export function renderProject(p, projects, footer) {
 const image=(im,priority=false)=>`<img src="${im.src}" width="${im.width}" height="${im.height}" alt="${escape(p.client)} — ${priority?'project cover':'project artwork '+im.number}" ${priority?'fetchpriority="high"':'loading="lazy" decoding="async"'}>`;
 const chapters=[['overview','Overview'],['cover','Project cover'],['challenge','The challenge'],['process',p.number===4?'Creative process':'My contribution'],['gallery',p.number===9?'Event gallery':'Visual exploration'],...(p.videos.length?[['films',p.number===7?'Video library':'Films & motion']]:[]),['outcome','The outcome']];
 document.querySelector('.case-hero').outerHTML=`<section class="case-hero project-${p.slug}" id="overview"><a class="case-back" href="/#work">← All work</a><div class="case-index">Nº ${String(p.number).padStart(2,'0')} <span></span> Case study</div><div class="case-intro-grid"><div><div class="case-tags">${p.tags.map(t=>`<span>${escape(t)}</span>`).join('')}</div><h1>${escape(p.title)}</h1><p class="hero-deck">${escape(p.deck)}</p></div><dl class="case-facts"><div><dt>CLIENT</dt><dd>${escape(p.client)}</dd></div><div><dt>MY ROLE</dt><dd>${escape(p.role)}</dd></div><div><dt>FOCUS</dt><dd>${escape(p.tags.join(' · '))}</dd></div></dl></div><figure class="hero-figure case-cover" id="cover">${image(p.cover,true)}<figcaption><span>${escape(p.client.toUpperCase())}</span><span>${escape(p.tags[0].toUpperCase())} / ${String(p.number).padStart(2,'0')}</span></figcaption></figure></section>`;
 document.querySelector('.contents nav').innerHTML=chapters.map(([id,label],i)=>`<a href="#${id}"><span>${String(i+1).padStart(2,'0')}</span>${label}</a>`).join('')+'<a href="#contact"><span>↗</span>Let’s talk</a>';
 const section=(id,kicker,title,body)=>`<section id="${id}" class="chapter"><div class="chapter-head"><span class="eyebrow">${kicker}</span><h2>${escape(title)}</h2></div>${body}</section>`;
 const gallery=p.images.filter(im=>im.src!==p.cover.src);
 const next=projects[(projects.indexOf(p)+1)%projects.length];
 document.querySelector('.case-layout main').innerHTML=`<div id="case-body"><div class="summary-strip">${p.metrics.map(([value,label])=>`<div><strong>${escape(value)}</strong><span>${escape(label)}</span></div>`).join('')}</div>
 ${section('challenge','THE CHALLENGE',p.challengeTitle,`<div class="project-story">${paragraphs(p.challenge)}</div>`)}
 ${section('process',p.number===4?'CREATIVE PROCESS':'MY CONTRIBUTION',p.roleTitle,`<div class="project-process">${paragraphs(p.process)}</div>`)}
 ${section('gallery','SELECTED VISUALS',p.gallery,`<div class="project-gallery gallery-${p.slug}">${gallery.map(im=>`<figure class="media ${im.width>im.height*1.5?'landscape':'portrait-art'}"><button class="zoom-image" data-image="${im.src}" data-caption="${escape(p.client)} / Project artwork ${im.number}" aria-label="Enlarge ${escape(p.client)} artwork ${im.number}">${image(im)}<span class="zoom-hint" aria-hidden="true">↗</span></button></figure>`).join('')}</div>`)}
 ${p.videos.length?section('films',p.number===7?'VIDEO LIBRARY':'FILMS & MOTION',p.number===7?'Watch the explanations come to life.':'See the work in motion.',`<div class="project-films">${p.videos.map((video,i)=>`<article class="film-card"><div class="film-player" data-video="${escape(video.video_id)}"><button class="film-play" aria-label="Play ${escape(p.client)} film ${i+1}"><img class="film-thumbnail" src="${escape(video.thumbnail||`https://i.ytimg.com/vi/${video.video_id}/hqdefault.jpg`)}" width="480" height="360" alt="" loading="lazy" decoding="async"><span class="film-play-icon" aria-hidden="true">▶</span><span class="film-label">${escape(p.client)}<strong>${p.number===7?'Episode':'Film'} ${String(i+1).padStart(2,'0')}</strong><small>${escape(video.title||'Play film')}</small></span></button></div><a class="text-link" href="${escape(video.url)}" target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a></article>`).join('')}</div>`):''}
 ${section('outcome','THE OUTCOME',p.outcomeTitle,`<div class="project-story">${paragraphs(p.outcome)}</div><p class="archive-note">Project results are reported in the original portfolio documentation.</p><div class="skill-tags">${p.skills.map(t=>`<span>${escape(t)}</span>`).join('')}</div>`)}
 <a class="next-project" href="/work/${next.slug}/"><span class="eyebrow">NEXT CASE STUDY</span><h2>${escape(next.title)} <span>↗</span></h2></a></div>${footer}`;
 document.querySelector('.skip').href='#overview';
 document.querySelector('.footer-bottom a[href="#main"]').href='#overview';
 document.querySelectorAll('.film-play').forEach(button=>button.addEventListener('click',()=>{
  const player=button.parentElement;const frame=document.createElement('iframe');
  frame.src=`https://www.youtube-nocookie.com/embed/${encodeURIComponent(player.dataset.video)}?autoplay=1`;
  frame.title=button.getAttribute('aria-label');frame.allow='autoplay; encrypted-media; picture-in-picture';frame.allowFullscreen=true;player.replaceChildren(frame);
 }));
}
export function connectProjectLinks(projects){
 document.querySelectorAll('a[href*="ketanv.wixsite.com"]').forEach(link=>{
  const project=projects.find(p=>link.hash===`#${p.sourceId}`);if(!project)return;
  link.href=`/work/${project.slug}/`;link.removeAttribute('target');link.removeAttribute('rel');
  const badge=link.querySelector('.bento-top>span:last-child');if(badge)badge.textContent='View case study ↗';
 });
 const archiveNote=document.querySelector('.archive .section-top>span');if(archiveNote)archiveNote.textContent='More stories in strategy, craft and creative leadership.';
}
