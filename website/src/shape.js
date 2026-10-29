const viewerModule = 'https://cdn.spline.design/@splinetool/viewer@2.0.111/build/spline-viewer.js';
const sceneUrl = 'https://prod.spline.design/H4BXuPQo-uwthcRm/scene.splinecode';

export function mountShape(host) {
 if (!host) return;
 const status = host.querySelector('[role="status"]');
 let observer;

 async function load() {
  observer?.disconnect();
  const viewer = document.createElement('spline-viewer');
  viewer.setAttribute('url', sceneUrl);
  viewer.setAttribute('aria-label', 'Interactive Spline study in form');
  viewer.setAttribute('loading', 'eager');
  viewer.setAttribute('background', 'rgba(0,0,0,0)');
  viewer.setAttribute('events-target', 'local');
  let timeout;
  let cancelled = false;
  let resizeObserver;
  const fitCamera = () => {
   // The pinned viewer exposes its runtime here; setZoom is the runtime's
   // camera API. Fit the authored room to the smaller available dimension.
   const { width, height } = host.getBoundingClientRect();
   const zoom = Math.max(0.01, Math.min(width / 720, height / 400) * 0.12);
   viewer._spline?.setZoom(zoom);
  };
  try {
   host.setAttribute('aria-busy', 'true');
   await new Promise((resolve, reject) => {
    timeout = setTimeout(() => reject(new Error('Spline loading timed out')), 45000);
    viewer.addEventListener('load-complete', resolve, { once: true });
    import(/* @vite-ignore */ viewerModule).then(() => {
     if (!cancelled) host.append(viewer);
    }, reject);
   });
   fitCamera();
   resizeObserver = new ResizeObserver(fitCamera);
   resizeObserver.observe(host);
   // Let the camera render at the fitted zoom before revealing the canvas.
   await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
   host.dataset.ready = 'true';
   status.textContent = '';
   window.addEventListener('pagehide', () => resizeObserver.disconnect(), { once: true });
  } catch {
   cancelled = true;
   resizeObserver?.disconnect();
   viewer.remove();
   status.textContent = 'The interactive study is temporarily unavailable.';
  } finally {
   clearTimeout(timeout);
   host.setAttribute('aria-busy', 'false');
  }
 }

 if ('IntersectionObserver' in window) {
  observer = new IntersectionObserver(entries => {
   if (entries.some(entry => entry.isIntersecting)) load();
  }, { rootMargin: '200px' });
  observer.observe(host);
 } else {
  load();
 }
}
