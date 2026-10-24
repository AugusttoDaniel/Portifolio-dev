import { useEffect, useRef } from 'react';

// Barra de leitura no topo. Atualiza o transform direto no DOM, uma vez por frame,
// para o scroll não re-renderizar a página inteira.
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? Math.min(window.scrollY / total, 1) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-1.5 bg-ink" aria-hidden="true">
      <div ref={barRef} className="h-full origin-left bg-signal" style={{ transform: 'scaleX(0)' }} />
    </div>
  );
}
