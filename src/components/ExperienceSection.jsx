import { experiences } from '../content/career';
import RevealBlock from './RevealBlock';
import { joinWithDots } from '../utils/joinWithDots';

// A cortina preta do hover é só CSS (group-hover), então passar o mouse não re-renderiza a lista.
// Dentro de cada linha as colunas se separam por espaço; as linhas entre experiências ficam.
export default function ExperienceSection() {
  return (
    <section id="experiencia" aria-labelledby="experiencia-title" className="mx-auto max-w-[1440px] border-x-2 border-b-2 border-ink">
      <div className="border-b-2 border-ink px-6 pt-20 pb-12 sm:px-10 sm:pt-28 sm:pb-16 lg:px-14">
        <span className="eyebrow mb-3 text-signal-deep">// 03. Histórico profissional</span>
        <h2 id="experiencia-title" className="section-title">
          Experiência em produção
        </h2>
      </div>

      <ol className="divide-y-2 divide-ink">
        {experiences.map((exp, index) => (
          <li key={exp.company + exp.period}>
            <RevealBlock delay={Math.min(index, 3) * 50}>
              <article className="group relative overflow-hidden bg-paper">
                <div
                  className="pointer-events-none absolute inset-0 translate-y-full bg-ink transition-transform duration-300 ease-snap group-hover:translate-y-0"
                  aria-hidden="true"
                />

                <div className="relative z-10 grid gap-5 px-6 py-10 sm:px-10 sm:py-12 xl:grid-cols-12 xl:gap-10 lg:px-14">
                  <div className="xl:col-span-4">
                    <span className="block font-mono text-xs font-bold uppercase text-ink/70 transition-colors duration-300 group-hover:text-signal">
                      {exp.period}
                    </span>
                    <h3 className="mt-2 font-display text-[min(1.5rem,calc((100vw-56px)/18))] font-extrabold uppercase transition-all duration-300 group-hover:translate-x-2 group-hover:text-paper sm:text-3xl xl:text-lg 2xl:text-xl">
                      {exp.company}
                    </h3>
                    <p className="mt-3 font-mono text-xs font-bold uppercase text-signal-deep transition-colors duration-300 group-hover:text-signal">
                      {exp.highlight}
                    </p>
                  </div>

                  <div className="xl:col-span-5">
                    <p className="mb-3 font-mono text-sm font-bold uppercase transition-colors duration-300 group-hover:text-signal">
                      {exp.role}
                    </p>
                    <p className="max-w-[68ch] text-sm leading-relaxed text-ink/85 transition-colors duration-300 group-hover:text-paper-2 sm:text-base">
                      {exp.desc}
                    </p>
                  </div>

                  <p className="font-mono text-xs leading-relaxed text-ink/70 transition-colors duration-300 group-hover:text-paper/75 xl:col-span-3 xl:pt-7">
                    <span className="sr-only">Stack utilizada: </span>
                    {joinWithDots(exp.stack)}
                  </p>
                </div>
              </article>
            </RevealBlock>
          </li>
        ))}
      </ol>
    </section>
  );
}
