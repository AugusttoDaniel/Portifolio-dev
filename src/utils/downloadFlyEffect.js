const FILE_ICON_SVG = `
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" fill="#1BA3E8" stroke="#0B84C4" stroke-width="1"/>
  <path d="M14 2v6h6" fill="none" stroke="#0B84C4" stroke-width="1"/>
  <path d="M12 11v6m0 0-2.5-2.5M12 17l2.5-2.5" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

export function triggerDownloadFly(originElement, onComplete) {
  const finish = () => { if (onComplete) onComplete(); };

  if (!originElement) return finish();

  const target = document.getElementById('header-download-target');
  if (!target || !target.offsetParent) return finish();

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return finish();

  const originRect = originElement.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  const startX = originRect.left + originRect.width / 2;
  const startY = originRect.top + originRect.height / 2;
  const endX = targetRect.left + targetRect.width / 2;
  const endY = targetRect.top + targetRect.height / 2;

  const dx = endX - startX;
  const dy = endY - startY;

  const flyer = document.createElement('div');
  flyer.innerHTML = FILE_ICON_SVG;
  flyer.style.position = 'fixed';
  flyer.style.left = `${startX}px`;
  flyer.style.top = `${startY}px`;
  flyer.style.width = '20px';
  flyer.style.height = '20px';
  flyer.style.marginLeft = '-10px';
  flyer.style.marginTop = '-10px';
  flyer.style.pointerEvents = 'none';
  flyer.style.zIndex = '2000';
  flyer.style.filter = 'drop-shadow(0 4px 10px rgba(15, 23, 42, 0.35))';

  document.body.appendChild(flyer);

  const animation = flyer.animate(
    [
      { transform: 'translate(0, 0) scale(2.6)', opacity: 1, offset: 0 },
      { transform: `translate(${dx * 0.12}px, ${dy * 0.8}px) scale(1.1)`, opacity: 1, offset: 0.55 },
      { transform: `translate(${dx}px, ${dy}px) scale(0.25)`, opacity: 0, offset: 1 },
    ],
    {
      duration: 750,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      fill: 'forwards',
    }
  );

  animation.onfinish = () => { flyer.remove(); finish(); };
  animation.oncancel = () => { flyer.remove(); finish(); };
}
