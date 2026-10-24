import RevealBlock from './RevealBlock';

// Trajetória com espaço para respirar: título curto à esquerda, texto em largura de leitura à direita.
// A medalha da Maratona fica só em Formação, para não se repetir pela página.
export default function AboutSection() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="mx-auto max-w-[1440px] border-x-2 border-b-2 border-ink">
      <div className="grid gap-8 px-6 py-20 sm:px-10 sm:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16 lg:px-14">
        <div>
          <span className="eyebrow mb-3 text-signal-deep">// 01. Sobre mim</span>
          <h2 id="sobre-title" className="section-title-half">
            De ponta a ponta
          </h2>
        </div>

        <RevealBlock className="max-w-[62ch] space-y-6 text-lg leading-relaxed text-ink/85 sm:text-xl">
          <p>
            Antes de virar desenvolvedor, trabalhei com <strong className="font-semibold text-ink">manutenção de hardware e suporte técnico</strong>.
            Essa etapa mostrou como um sistema funciona de ponta a ponta, do hardware ao código.
          </p>
          <p>
            Sou formado em <strong className="font-semibold text-ink">Sistemas de Informação pelo Instituto Federal de Minas Gerais (IFMG)</strong>,
            Campus São João Evangelista, onde também concluí o Técnico em Informática com foco em manutenção e suporte.
          </p>
        </RevealBlock>
      </div>
    </section>
  );
}
