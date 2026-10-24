import { useId, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import PipelineDiagram from './PipelineDiagram';

// Cada bloco do painel entra um pouco depois do anterior quando a linha abre.
function Stagger({ open, index, className = '', children }) {
  return (
    <div
      style={{ transitionDelay: open ? `${120 + index * 60}ms` : '0ms' }}
      className={`transition-[opacity,translate] duration-450 ease-snap ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} ${className}`}
    >
      {children}
    </div>
  );
}

// Linha do acordeão: fechada mostra só número, nome e categoria; aberta revela o dossiê completo.
export default function ProjectRow({ project, images, onOpenGallery }) {
  const [open, setOpen] = useState(false);
  // A capa só entra no DOM quando há intenção de abrir (hover, toque ou foco): não baixa imagem
  // que ninguém pediu, e já está montada fechada quando o clique chega, então a cortina anima.
  const [opened, setOpened] = useState(false);
  const prepare = () => setOpened(true);
  const headerRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const id = useId();
  const cover = images[0];

  const toggle = () => {
    const opening = !open;
    setOpen(opening);
    setOpened(true);
    if (!opening) return;

    // Se a linha estava no pé da tela, sobe até ela para o painel abrir à vista.
    requestAnimationFrame(() => {
      const top = headerRef.current?.getBoundingClientRect().top ?? 0;
      if (top > window.innerHeight * 0.45) {
        window.scrollTo({ top: window.scrollY + top - 80, behavior: reducedMotion ? 'auto' : 'smooth' });
      }
    });
  };

  return (
    <article className="bg-paper">
      <h3 ref={headerRef}>
        <button
          type="button"
          onClick={toggle}
          onPointerEnter={prepare}
          onPointerDown={prepare}
          onFocus={prepare}
          aria-label={`${project.name}, ${project.category}`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          className={`group/row relative grid w-full grid-cols-[1fr_auto] items-center gap-4 overflow-hidden px-6 py-5 text-left transition-colors duration-300 sm:grid-cols-[auto_1fr_auto] sm:gap-8 sm:px-10 sm:py-8 ${
            open ? 'bg-ink text-paper' : 'bg-paper text-ink'
          }`}
        >
          {/* Cortina vermelha que varre a linha da esquerda para a direita no hover */}
          <span
            aria-hidden="true"
            className={`absolute inset-0 origin-left scale-x-0 bg-signal transition-transform duration-350 ease-snap ${
              open ? '' : 'group-hover/row:scale-x-100'
            }`}
          />

          <span
            aria-hidden="true"
            className={`relative hidden font-display text-5xl font-extrabold leading-none transition-colors duration-300 sm:block lg:text-7xl ${
              open
                ? 'text-signal [-webkit-text-stroke:2px_var(--color-signal)]'
                : 'text-transparent [-webkit-text-stroke:2px_var(--color-ink)] group-hover/row:text-ink'
            }`}
          >
            {project.id}
          </span>

          <span className="relative min-w-0">
            <span
              className={`mb-1.5 block font-mono text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 sm:text-xs ${
                open ? 'text-signal' : 'text-signal-deep group-hover/row:text-ink'
              }`}
            >
              <span className="sm:hidden">{project.id} / </span>
              {project.category}
            </span>
            <span className="block font-display text-[min(1.75rem,calc((100vw-110px)/13))] font-extrabold uppercase leading-[0.95] tracking-tight transition-transform duration-350 ease-snap group-hover/row:translate-x-2 sm:text-[min(3.25rem,calc((100vw-370px)/13))]">
              {project.name}
            </span>
          </span>

          <span
            aria-hidden="true"
            className={`relative flex h-11 w-11 shrink-0 items-center justify-center border-2 transition-all duration-350 ease-snap sm:h-14 sm:w-14 ${
              open ? 'rotate-45 border-signal bg-signal text-ink' : 'border-ink group-hover/row:rotate-90 group-hover/row:bg-ink group-hover/row:text-paper'
            }`}
          >
            <span className="absolute h-0.5 w-4 bg-current sm:w-5" />
            <span className="absolute h-4 w-0.5 bg-current sm:h-5" />
          </span>
        </button>
      </h3>

      <div
        id={`${id}-panel`}
        role="region"
        aria-label={project.name}
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-450 ease-snap ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          {/* As duas colunas se separam pelo fundo, não por linha */}
          <div className="grid grid-cols-1 border-t-2 border-ink lg:grid-cols-12">
            <div className="flex flex-col gap-6 bg-paper-2 p-6 sm:p-10 lg:col-span-5 xl:col-span-4">
              <Stagger open={open} index={0}>
                <p className="font-mono text-xs font-bold uppercase text-ink/80">{project.tagline}</p>
              </Stagger>

              {cover && opened && (
                <button
                  type="button"
                  onClick={() => onOpenGallery(0)}
                  aria-label={`Ver ${images.length > 1 ? `as ${images.length} imagens` : 'a imagem'} do projeto ${project.name}`}
                  className="group/cover relative block w-full overflow-hidden border-2 border-ink bg-ink"
                >
                  {/* A captura se revela como uma cortina abrindo da esquerda */}
                  <img
                    src={cover.url}
                    alt=""
                    decoding="async"
                    style={{ transitionDelay: open ? '150ms' : '0ms' }}
                    className={`aspect-[16/10] w-full object-cover object-top transition-[clip-path,scale,filter] duration-600 ease-snap group-hover/cover:scale-[1.04] group-hover/cover:grayscale-0 ${
                      open ? 'scale-100 grayscale-[40%] [clip-path:inset(0_0_0_0)]' : 'scale-110 grayscale [clip-path:inset(0_100%_0_0)]'
                    }`}
                  />
                  <span className="absolute bottom-0 left-0 border-t-2 border-r-2 border-ink bg-signal px-2.5 py-1 font-mono text-[11px] font-bold uppercase text-ink">
                    {images.length > 1 ? `[ + ${images.length} imagens ]` : '[ Ampliar ]'}
                  </span>
                </button>
              )}

              <Stagger open={open} index={2} className="mt-auto flex flex-col gap-2.5 md:flex-row lg:flex-col">
                {project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex w-full flex-1 items-center justify-center gap-2 border-2 border-ink px-4 py-3.5 text-center font-mono text-xs font-bold uppercase transition-all ${
                      link.primary
                        ? 'bg-signal text-ink shadow-[4px_4px_0_var(--color-ink)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_var(--color-ink)]'
                        : 'bg-ink text-paper hover:bg-paper hover:text-ink'
                    }`}
                  >
                    {link.label} ↗
                  </a>
                ))}
                {project.note && (
                  <p className="flex-1 border-2 border-dashed border-ink/50 px-4 py-3 text-center font-mono text-[11px] font-bold uppercase text-ink/70">
                    {project.note}
                  </p>
                )}
              </Stagger>
            </div>

            <div className="flex flex-col gap-10 p-6 sm:p-10 lg:col-span-7 xl:col-span-8">
              <Stagger open={open} index={1} className="space-y-4">
                <p className="max-w-[60ch] text-base font-semibold leading-relaxed sm:text-lg">{project.summary}</p>
                <p className="max-w-[72ch] text-sm leading-relaxed text-ink/80 sm:text-base">{project.deepDive}</p>
              </Stagger>

              <Stagger open={open} index={2}>
                <p className="mb-3 font-mono text-xs font-bold uppercase text-ink/75">Como funciona</p>
                <PipelineDiagram steps={project.architecture} open={open} />
              </Stagger>

              <Stagger open={open} index={3}>
                <p className="mb-3 font-mono text-xs font-bold uppercase text-ink/75">Tecnologias</p>
                <ul className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <li key={tech} className="border border-ink/25 px-2.5 py-1 font-mono text-xs transition-colors hover:border-ink hover:bg-ink hover:text-paper">
                      {tech}
                    </li>
                  ))}
                </ul>
              </Stagger>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
