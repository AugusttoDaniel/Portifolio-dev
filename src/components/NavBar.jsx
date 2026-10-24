import { useEffect, useState } from 'react';
import { links, navItems } from '../content/profile';
import { projects } from '../content/projects';
import { experiences } from '../content/career';

const counts = {
  '#projetos': projects.length,
  '#experiencia': experiences.length,
};

const labelFor = (item) => (counts[item.href] ? `${item.label} (${counts[item.href]})` : item.label);

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header className="sticky top-1.5 z-50 border-b-2 border-ink bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto grid max-w-[1440px] grid-cols-[1fr_auto] divide-x-2 divide-ink font-mono text-xs uppercase tracking-wider xl:grid-cols-12">
        <a href="#inicio" className="group flex items-center justify-between gap-3 p-3.5 px-4 sm:px-5 xl:col-span-3">
          <span className="whitespace-nowrap font-bold tracking-tight transition-transform group-hover:translate-x-1">
            Daniel Augusto<span className="hidden sm:inline"> Silva</span>
          </span>
          <span className="relative flex h-3 w-3" title="Aberto a vagas">
            {/* Estático: o status já pulsa no selo do hero, e um ping eterno na barra fixa distrai a leitura */}
            <span className="relative inline-flex h-3 w-3 border border-ink bg-signal" />
            <span className="sr-only">Aberto a vagas</span>
          </span>
        </a>

        {/* Sem as contagens aqui: com elas os 4 links não cabem na coluna e encostam uns nos outros */}
        <nav aria-label="Seções" className="hidden items-center justify-center gap-7 p-3.5 px-5 font-bold xl:col-span-5 xl:flex">
          {navItems.slice(0, 4).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative whitespace-nowrap py-0.5 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-signal after:transition-transform after:duration-300 hover:text-signal-deep hover:after:scale-x-100"
            >
              {item.short ?? item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3 bg-ink p-3.5 px-4 text-paper sm:gap-4 sm:px-5 xl:col-span-4">
          <a href={links.github} target="_blank" rel="noopener noreferrer" className="hidden font-bold transition-all hover:-translate-y-0.5 hover:text-signal sm:inline">
            [GitHub]
          </a>
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="hidden font-bold transition-all hover:-translate-y-0.5 hover:text-signal sm:inline">
            [LinkedIn]
          </a>
          <a
            href={links.resume}
            target="_blank"
            rel="noopener"
            className="-my-1 whitespace-nowrap bg-signal px-3 py-2 font-bold text-ink transition-all hover:bg-paper active:scale-95 sm:my-0 sm:px-2.5 sm:py-1"
          >
            <span className="sm:hidden">CV</span>
            <span className="hidden sm:inline">Baixar currículo</span> ↗
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            className="-mx-2 -my-3 whitespace-nowrap px-2 py-3 font-bold transition-colors hover:text-signal xl:hidden"
          >
            {menuOpen ? '[ × ]' : '[ Menu ]'}
          </button>
        </div>
      </div>

      <nav
        id="menu-mobile"
        aria-label="Seções"
        hidden={!menuOpen}
        className="border-t-2 border-ink bg-paper font-mono text-sm font-bold uppercase xl:hidden"
      >
        <ul className="mx-auto max-w-[1440px] divide-y-2 divide-ink">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-ink hover:text-paper"
              >
                {labelFor(item)}
                <span aria-hidden="true">→</span>
              </a>
            </li>
          ))}
          <li className="grid grid-cols-2 divide-x-2 divide-ink sm:hidden">
            <a href={links.github} target="_blank" rel="noopener noreferrer" className="px-5 py-4 hover:bg-ink hover:text-paper">
              GitHub ↗
            </a>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="px-5 py-4 hover:bg-ink hover:text-paper">
              LinkedIn ↗
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
