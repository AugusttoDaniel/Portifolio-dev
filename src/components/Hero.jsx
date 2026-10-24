import { useEffect, useState } from 'react';
import { heroMetrics, links } from '../content/profile';

const headline = [
  { text: 'Do hardware', delay: 0 },
  { text: 'ao', accent: 'código', delay: 120 },
  { text: 'em produção.', delay: 240 },
];

// O topo responde só três perguntas: quem é, o que faz e o que fazer agora.
// Trajetória e formação ficam nas seções seguintes.
export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const fadeIn = loaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0';

  return (
    <section id="inicio" aria-labelledby="hero-title" className="mx-auto max-w-[1440px] border-x-2 border-b-2 border-ink">
      <div className="px-6 pt-12 pb-14 sm:px-10 sm:pt-16 sm:pb-20 lg:px-14 lg:pt-20">
        <p
          className={`mb-8 inline-flex items-center gap-2 border-2 border-ink bg-signal px-3 py-1 font-mono text-xs font-bold uppercase text-ink transition-all duration-600 ${
            loaded ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <span className="h-2 w-2 animate-pulse bg-ink" aria-hidden="true" />
          Aberto a vagas back-end ou full stack
        </p>

        {/* A linha mais larga ("em produção.") mede ~12.8em em Syne 800, então a fonte
            acompanha a largura útil da página em vez de um tamanho fixo que corta o texto. */}
        <h1
          id="hero-title"
          className="font-display text-[calc((100vw-56px)/13)] font-extrabold uppercase leading-[0.88] tracking-tighter sm:text-[calc((100vw-88px)/13)] lg:text-[min(7rem,calc((min(100vw,1440px)-120px)/13))]"
        >
          {headline.map((line) => (
            <span key={line.text} className="block overflow-hidden pb-1">
              <span
                style={{ transitionDelay: `${line.delay}ms` }}
                className={`block transition-transform duration-600 ease-snap ${loaded ? 'translate-y-0' : 'translate-y-full'}`}
              >
                {line.text}
                {line.accent && (
                  <>
                    {' '}
                    <span className="inline-block text-signal transition-transform hover:-skew-x-6">{line.accent}</span>
                  </>
                )}
              </span>
            </span>
          ))}
        </h1>

        <div
          style={{ transitionDelay: '380ms' }}
          className={`mt-12 grid gap-8 transition-all duration-600 sm:mt-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16 ${fadeIn}`}
        >
          <p className="max-w-[46ch] text-lg leading-[1.45] text-ink/85 sm:text-xl">
            Desenvolvedor full stack com foco em back-end:{' '}
            <strong className="font-semibold text-ink">Node.js, Nest.js e TypeScript</strong> na API,{' '}
            <strong className="font-semibold text-ink">React e Next.js</strong> na interface. Já levei projetos do zero à
            produção.
          </p>

          <div className="flex flex-wrap gap-3">
            <a href={links.resume} target="_blank" rel="noopener" className="btn-hard group/cta bg-signal text-ink">
              Baixar currículo em PDF
              <span className="transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" aria-hidden="true">
                ↗
              </span>
            </a>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="btn-hard bg-paper text-ink hover:bg-ink hover:text-paper">
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-y-8 border-t-2 border-ink px-6 py-10 font-mono sm:px-10 md:grid-cols-4 lg:px-14">
        {heroMetrics.map((metric) => (
          <div key={metric.value} className="flex flex-col-reverse justify-end pr-4">
            <dt className="mt-2 max-w-[22ch] text-xs font-bold uppercase text-ink/75">{metric.label}</dt>
            <dd
              className={`text-2xl font-bold min-[400px]:text-3xl lg:text-4xl xl:text-5xl ${
                metric.accent ? 'text-signal-deep' : ''
              }`}
            >
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
