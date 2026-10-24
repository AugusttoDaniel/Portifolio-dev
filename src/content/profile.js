// Links e dados que aparecem em várias seções. Caminhos relativos para o
// currículo e as páginas de apoio, para funcionarem em qualquer domínio.
export const links = {
  github: 'https://github.com/AugusttoDaniel',
  linkedin: 'https://www.linkedin.com/in/danielaugustto/',
  repo: 'https://github.com/AugusttoDaniel/Portifolio-dev',
  resume: '/curriculo-daniel-augusto.pdf',
  about: '/about',
  contact: '/contact',
  privacy: '/privacy',
};

export const navItems = [
  { href: '#sobre', label: '01. Sobre' },
  { href: '#projetos', label: '02. Projetos' },
  { href: '#experiencia', label: '03. Experiência' },
  // "short" é o rótulo da barra do desktop, onde o espaço é contado; o menu do celular usa o completo.
  { href: '#stack', label: '04. Stack & formação', short: '04. Stack' },
  { href: '#contato', label: '05. Contato' },
];

export const heroMetrics = [
  { value: '06', label: 'Empresas clientes na UltraLike', accent: true },
  { value: '-8h/dia', label: 'De trabalho manual cortadas com agentes SDR em n8n' },
  { value: '7 MB', label: 'Binário Go sem banco, vídeo vira nota em ~30s' },
  { value: '2017→26', label: 'Base contínua em TI e software' },
];

export const marqueeItems = [
  'Node.js · Nest.js · Express · FastAPI',
  'Golang · FFmpeg · Whisper · Vision LLM',
  'Filas BullMQ · Redis · AWS S3 · Rate limit',
  'React · Next.js · Tailwind · Shadcn/ui · Zod',
  'RAG · Tool calling · Agentes n8n',
];
