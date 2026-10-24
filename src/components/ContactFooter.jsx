import { links } from '../content/profile';

const bottomLinks = [
  { href: links.about, label: 'Página /sobre' },
  { href: links.contact, label: 'Página /contato' },
  { href: links.privacy, label: 'Página /privacidade' },
];

export default function ContactFooter() {
  return (
    <footer id="contato" className="mx-auto max-w-[1440px] border-x-2 border-b-2 border-ink bg-signal text-ink">
      <div className="grid grid-cols-1 items-end gap-12 px-6 py-20 sm:px-10 sm:py-28 lg:grid-cols-12 lg:px-14">
        <div className="lg:col-span-7">
          <span className="mb-4 inline-block bg-ink px-3 py-1 font-mono text-xs font-bold uppercase text-paper">
            // 06. Contato & contratação
          </span>
          <h2 className="font-display text-4xl font-extrabold uppercase leading-[0.9] tracking-tighter sm:text-6xl xl:text-7xl">
            Aberto a vagas
            <br />
            back-end ou
            <br />
            full stack.
          </h2>
          <p className="mt-4 max-w-xl text-base font-medium sm:text-lg">
            Fale comigo pelo LinkedIn ou GitHub, ou baixe o currículo em PDF com todos os detalhes técnicos.
          </p>
        </div>

        <div className="flex flex-col gap-3 lg:col-span-5">
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hard bg-ink text-paper [--btn-shadow:var(--color-paper)] sm:text-sm"
          >
            Falar no LinkedIn (/in/danielaugustto) ↗
          </a>
          <a href={links.github} target="_blank" rel="noopener noreferrer" className="btn-hard bg-paper text-ink sm:text-sm">
            Acessar GitHub (@AugusttoDaniel) ↗
          </a>
          <a
            href={links.resume}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center justify-center border-2 border-ink bg-paper-2 px-6 py-4 font-mono text-xs font-bold uppercase transition-colors hover:bg-ink hover:text-paper sm:text-sm"
          >
            Baixar currículo em PDF ↗
          </a>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 border-t-2 border-ink bg-ink px-6 py-4 font-mono text-xs uppercase text-paper sm:flex-row">
        <p>© {new Date().getFullYear()} Daniel Augusto Silva · Desenvolvedor Full Stack</p>
        <nav aria-label="Páginas de apoio" className="flex flex-wrap items-center justify-center gap-x-6">
          {bottomLinks.map((link) => (
            <a key={link.href} href={link.href} className="inline-block py-3 transition-colors hover:text-signal sm:py-1">
              {link.label}
            </a>
          ))}
          <a href={links.repo} target="_blank" rel="noopener noreferrer" className="inline-block py-3 font-bold text-signal sm:py-1">
            Código-fonte ↗
          </a>
        </nav>
      </div>
    </footer>
  );
}
