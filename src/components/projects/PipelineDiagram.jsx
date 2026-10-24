import { useEffect, useState } from 'react';
import { useInView } from '../../hooks/useInView';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

// Fluxo do projeto em 4 etapas. O pulso só anda enquanto o diagrama está aberto e
// visível, e fica parado para quem pede menos movimento.
export default function PipelineDiagram({ steps, open }) {
  const [ref, inView] = useInView({ threshold: 0.3, once: false });
  const reducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const running = open && inView && !reducedMotion;

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => setActive((step) => (step + 1) % steps.length), 1800);
    return () => clearInterval(interval);
  }, [running, steps.length]);

  return (
    <ol ref={ref} className="relative grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {steps.map((node, index) => {
        const isActive = !reducedMotion && active === index;
        return (
          <li
            key={node.step}
            aria-current={isActive ? 'step' : undefined}
            className={`relative flex flex-col justify-between overflow-hidden border-2 border-ink p-3.5 transition-all duration-300 ${
              isActive ? '-translate-y-1 bg-ink text-paper shadow-[4px_4px_0_var(--color-signal)]' : 'bg-paper text-ink'
            }`}
          >
            <div className="mb-2 flex items-center justify-between">
              <span
                className={`px-2 py-0.5 font-mono text-[11px] font-bold uppercase ${
                  isActive ? 'bg-signal text-ink' : 'bg-ink text-paper'
                }`}
              >
                {node.step}
              </span>
              <span className={`font-mono text-xs font-bold ${isActive ? 'text-signal' : 'text-signal-deep'}`} aria-hidden="true">
                {index < steps.length - 1 ? '→' : '✓'}
              </span>
            </div>
            <div>
              <div className="text-sm font-bold">{node.label}</div>
              <div className={`mt-1 font-mono text-xs leading-snug ${isActive ? 'text-paper/80' : 'text-ink/75'}`}>
                {node.detail}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
