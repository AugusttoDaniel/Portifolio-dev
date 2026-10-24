import { education, stackGroups } from '../content/career';
import RevealBlock from './RevealBlock';
import { joinWithDots } from '../utils/joinWithDots';

// Grupos separados por espaço, sem caixa em volta. Na formação, só um fio à esquerda
// marca a linha do tempo, vermelho nos itens em destaque.
export default function StackSection() {
  return (
    <section id="stack" aria-label="Stack e formação" className="mx-auto grid max-w-[1440px] grid-cols-1 border-x-2 border-b-2 border-ink lg:grid-cols-2">
      <div className="border-b-2 border-ink px-6 py-20 sm:px-10 sm:py-28 lg:border-r-2 lg:border-b-0 lg:px-14">
        <span className="eyebrow mb-3 text-signal-deep">// 04. Tecnologias que uso no dia a dia</span>
        <h2 className="section-title-half mb-12">Stack tecnológica</h2>

        <div className="space-y-10">
          {stackGroups.map((group, index) => (
            <RevealBlock key={group.code} delay={index * 50}>
              <h3 className="mb-2 font-mono text-xs font-bold uppercase text-signal-deep">{group.code}</h3>
              <p className="max-w-[48ch] text-base font-semibold leading-relaxed sm:text-lg">{joinWithDots(group.items)}</p>
            </RevealBlock>
          ))}
        </div>
      </div>

      <div className="bg-ink px-6 py-20 text-paper sm:px-10 sm:py-28 lg:px-14">
        <span className="eyebrow mb-3 text-signal">// 05. Formação, premiações & cursos</span>
        <h2 className="section-title-half mb-12">Formação e cursos</h2>

        <ol className="space-y-10">
          {education.map((item, index) => (
            <li key={item.title}>
              <RevealBlock delay={index * 50}>
                <div className={`border-l-2 pl-5 transition-colors duration-300 ${item.featured ? 'border-signal' : 'border-white/20 hover:border-paper'}`}>
                  <p className="mb-2 font-mono text-xs uppercase text-paper/70">
                    <span className="font-bold text-signal">{item.type}</span> · {item.period}
                  </p>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="mt-1 font-mono text-xs text-paper/70">{item.institution}</p>
                  <p className="mt-2 max-w-[56ch] text-sm leading-relaxed text-paper/85">{item.detail}</p>
                </div>
              </RevealBlock>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
