import './gallery-modal-accordion.css';

// Adapt the supplied accordion/modal interaction to the site's existing image markup.
export function mountGalleryModalAccordion(host) {
  const buttons = [...host.querySelectorAll('.zoom-image')];
  if (!buttons.length) return () => {};
  host.classList.add('gallery-accordion');
  host.setAttribute('aria-label', 'MyMuse selected visuals');
  const controller = new AbortController();
  const { signal } = controller;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let selected = 0;
  let opener;
  let animation;
  const modal = document.createElement('dialog');
  modal.className = 'accordion-modal';
  modal.setAttribute('aria-label', 'MyMuse artwork preview');
  modal.innerHTML = `<div class="accordion-modal-card"><button type="button" class="accordion-close" autofocus aria-label="Close artwork preview">Close ×</button><img alt=""><div class="accordion-modal-caption"><div><span class="eyebrow">MYMUSE / SELECTED VISUALS</span><p aria-live="polite"></p></div><div class="accordion-modal-controls"><button type="button" aria-label="Previous artwork">←</button><button type="button" aria-label="Next artwork">→</button></div></div></div>`;
  document.body.append(modal);
  const card = modal.querySelector('.accordion-modal-card');
  const picture = modal.querySelector('img');
  const caption = modal.querySelector('p');
  const select = index => {
    selected = (index + buttons.length) % buttons.length;
    buttons.forEach((button, i) => {
      button.parentElement.classList.toggle('is-active', i === selected);
    });
  };
  const display = () => {
    const button = buttons[selected];
    picture.src = button.dataset.image;
    picture.alt = button.querySelector('img').alt;
    caption.textContent = `Project artwork ${button.dataset.artwork} · ${selected + 1} / ${buttons.length}`;
  };
  const step = delta => { select(selected + delta); display(); };
  buttons.forEach((button, index) => {
    // This component owns its modal; exclude it from the site's standard lightbox.
    button.classList.replace('zoom-image', 'accordion-panel');
    button.type = 'button';
    button.dataset.artwork = button.dataset.caption.split(' ').at(-1);
    button.setAttribute('aria-haspopup', 'dialog');
    button.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'touch') select(index);
    }, { signal });
    button.addEventListener('focus', () => select(index), { signal });
    button.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
      if (event.key === 'ArrowLeft') next = (index + buttons.length - 1) % buttons.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = buttons.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      buttons[next].focus({ preventScroll: true });
    }, { signal });
    button.addEventListener('click', () => {
      select(index);
      opener = button;
      display();
      const from = button.getBoundingClientRect();
      modal.showModal();
      document.body.classList.add('dialog-open');
      if (!reduced.matches) {
        const to = card.getBoundingClientRect();
        animation?.cancel();
        animation = card.animate([
          { transform: `translate(${from.x - to.x}px, ${from.y - to.y}px) scale(${from.width / to.width}, ${from.height / to.height})`, opacity: 0.4 },
          { transform: 'none', opacity: 1 },
        ], { duration: 300, easing: 'cubic-bezier(.22,1,.36,1)' });
      }
    }, { signal });
  });
  modal.querySelector('.accordion-close').addEventListener('click', () => modal.close(), { signal });
  const controls = modal.querySelectorAll('.accordion-modal-controls button');
  controls[0].addEventListener('click', () => step(-1), { signal });
  controls[1].addEventListener('click', () => step(1), { signal });
  modal.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      step(event.key === 'ArrowLeft' ? -1 : 1);
    }
  }, { signal });
  modal.addEventListener('click', event => { if (event.target === modal) modal.close(); }, { signal });
  modal.addEventListener('close', () => {
    animation?.cancel();
    document.body.classList.remove('dialog-open');
    opener?.focus({ preventScroll: true });
  }, { signal });
  select(0);
  return () => {
    if (modal.open) modal.close();
    controller.abort();
    animation?.cancel();
    modal.remove();
    document.body.classList.remove('dialog-open');
  };
}
