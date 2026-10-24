import { marqueeItems } from '../content/profile';

// Faixa decorativa: a stack já aparece por extenso na seção 04, então leitores de tela pulam esta.
export default function Marquee() {
  return (
    <div className="overflow-hidden border-b-2 border-ink bg-signal py-3 text-ink" aria-hidden="true">
      <div className="flex w-max animate-marquee font-mono text-xs font-bold uppercase tracking-widest hover:[animation-play-state:paused] sm:text-sm">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {marqueeItems.map((item) => (
              <span key={item} className="flex items-center">
                <span className="mx-6">{item}</span>
                <span>✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
