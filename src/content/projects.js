// Projetos na ordem em que aparecem. "gallery" usa as chaves de utils/projectImages.js;
// a primeira imagem é a capa do card.
export const projects = [
  {
    id: '01',
    name: 'Convert Milhas',
    category: 'SaaS multi-tenant · Next.js · Kestra · IA',
    tagline: 'Ofertas de milhas capturadas, precificadas e enviadas sem trabalho manual',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Shadcn/ui', 'Igniter.js', 'Prisma', 'Better Auth', 'Kestra', 'UAZAPI'],
    summary:
      'SaaS multi-tenant para agências de milhas e turismo. Captura ofertas de passagens de forma automatizada, extrai os dados com IA, aplica a margem de cada agência e envia a oferta pronta para os clientes.',
    deepDive:
      'São dois sistemas com responsabilidades separadas. Um orquestrador de workflows no Kestra captura as ofertas e usa IA para extrair rota, milhas, taxas e datas. O SaaS aplica as regras de cada agência, calcula o preço de venda, monta a mensagem e faz o envio, com limite de ritmo e janela de disparo. O modelo de dados é multi-tenant desde o início, com papéis de admin, owner e member.',
    architecture: [
      { step: '01 / Captura', label: 'Workflows no Kestra', detail: 'Ofertas lidas dos grupos-fonte de forma automatizada' },
      { step: '02 / IA', label: 'Extração estruturada', detail: 'Rota, milhas, taxas e datas por tipo de mensagem' },
      { step: '03 / Regras', label: 'Igniter.js + Prisma', detail: 'Filtros, margem e preço de venda por agência' },
      { step: '04 / Envio', label: 'UAZAPI', detail: 'Disparo com limite de ritmo e janela de horário' },
    ],
    links: [{ label: 'Abrir site no ar', url: 'https://convertmilhas.com.br', primary: true }],
    gallery: [
      { src: 'convertmilhas-capa', caption: 'Página inicial do Convert Milhas.' },
      { src: 'convertmilhas-hero', caption: 'Proposta: ofertas personalizadas com a margem da agência.' },
      { src: 'convertmilhas-rota', caption: 'Como funciona: da rota da oferta até o método da agência.' },
      { src: 'convertmilhas-planos', caption: 'Planos e implantação, com os volumes de envio.' },
    ],
  },
  {
    id: '02',
    name: 'videonotes',
    category: 'Automação · Go · IA multimodal',
    tagline: 'WhatsApp → binário Go de 7 MB → Obsidian em ~30 segundos',
    stack: ['Go', 'yt-dlp', 'FFmpeg', 'Whisper', 'Modelo de visão (VLM)', 'Docker', 'Obsidian Markdown'],
    summary:
      'Bot em Go que transforma links de vídeo enviados num grupo do WhatsApp em notas estruturadas no Obsidian, em cerca de 30 segundos.',
    deepDive:
      'O yt-dlp baixa o vídeo e o Whisper transcreve o áudio. Quando o vídeo não tem fala (só demonstração ou código na tela), o FFmpeg extrai quadros e um modelo de visão lê o texto da tela. Tudo roda num único binário de 7 MB, sem framework e sem banco de dados: o vault do Obsidian é o destino e a fonte da verdade.',
    architecture: [
      { step: '01 / Input', label: 'Grupo do WhatsApp', detail: 'Link capturado assim que chega' },
      { step: '02 / Engine', label: 'Binário Go (7 MB)', detail: 'Orquestração sem framework e sem banco' },
      { step: '03 / Process', label: 'Whisper + FFmpeg + VLM', detail: 'Transcrição, ou leitura de quadros se não houver fala' },
      { step: '04 / Output', label: 'Nota no Obsidian', detail: 'Markdown estruturado em ~30s' },
    ],
    links: [{ label: 'Ver perfil no GitHub', url: 'https://github.com/AugusttoDaniel', primary: true }],
    gallery: [{ src: 'videonotes', caption: 'Do link no WhatsApp à nota no Obsidian.' }],
  },
  {
    id: '03',
    name: 'DevRoadmap',
    category: 'SaaS educação · Next.js · Supabase',
    tagline: 'Trilhas de estudo e acompanhamento de cursos pessoais',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Shadcn/ui', 'Supabase', 'React Hook Form', 'Zod'],
    summary:
      'Aplicação web para guiar o aprendizado de quem estuda tecnologia, com roadmaps por função e acompanhamento do progresso em cada etapa e nos cursos feitos por fora.',
    deepDive:
      'Cada trilha mostra as etapas na ordem em que fazem sentido; a pessoa marca o que já estudou, salva as trilhas que acompanha e cadastra os próprios cursos. Formulários com React Hook Form e schemas Zod, interface com Shadcn/ui e Tailwind, conta e dados no Supabase.',
    architecture: [
      { step: '01 / UI', label: 'Next.js + Shadcn/ui', detail: 'Interface responsiva com tema claro e escuro' },
      { step: '02 / Forms', label: 'Hook Form + Zod', detail: 'Validação tipada dos formulários' },
      { step: '03 / Data', label: 'Supabase', detail: 'Conta, trilhas salvas e cursos pessoais' },
      { step: '04 / Track', label: 'Progresso por etapa', detail: 'Quanto da trilha já foi estudado' },
    ],
    links: [
      { label: 'Abrir live demo', url: 'https://teste-road-map.vercel.app/', primary: true },
      { label: 'Repositórios no GitHub', url: 'https://github.com/AugusttoDaniel', primary: false },
    ],
    gallery: [{ src: 'roadmap', caption: 'Página inicial, com os roadmaps interativos.' }],
  },
  {
    id: '04',
    name: 'Site da UltraLike',
    category: 'Site institucional · Next.js · SEO técnico',
    tagline: 'Planos, soluções, cases e blog com dados estruturados',
    stack: ['Next.js', 'React', 'JSON-LD', 'Breadcrumbs'],
    summary:
      'Site institucional da UltraLike, empresa que oferece equipe de desenvolvimento por mensalidade fixa, com páginas de planos, soluções, cases, sobre e contato.',
    deepDive:
      'O blog mostra categoria, tempo de leitura, visualizações, autor e data de cada artigo, com páginas por categoria e tag. A página do artigo tem sumário lateral que acompanha a rolagem, botões de compartilhar, breadcrumbs e dados estruturados BlogPosting e BreadcrumbList.',
    architecture: [
      { step: '01 / Venda', label: 'Planos, soluções, cases', detail: 'Sempre com chamada para pedir proposta' },
      { step: '02 / Blog', label: 'Categorias e tags', detail: 'Tempo de leitura, visualizações e autor' },
      { step: '03 / Leitura', label: 'Sumário lateral', detail: 'Índice que acompanha a rolagem' },
      { step: '04 / SEO', label: 'BlogPosting + Breadcrumbs', detail: 'Dados estruturados em cada artigo' },
    ],
    links: [],
    note: 'Projeto feito na UltraLike · código privado',
    gallery: [
      { src: 'ultralike-capa', caption: 'Home da UltraLike.' },
      { src: 'ultralike-planos', caption: 'Página de planos.' },
      { src: 'ultralike-blog', caption: 'Listagem do blog, com categorias na lateral.' },
      { src: 'ultralike-blog-post', caption: 'Artigo com sumário e botões de compartilhamento.' },
    ],
  },
  {
    id: '05',
    name: 'Portfólio pessoal',
    category: 'Front-end · Vite · Tailwind · Vercel',
    tagline: 'Este site: rápido, legível por buscadores e por agentes de IA',
    stack: ['React 19', 'Vite', 'Tailwind CSS v4', 'Vercel', 'JSON-LD', 'llms.txt'],
    summary:
      'Este site, em React 19 com Vite e Tailwind CSS, com deploy automático na Vercel a cada push na main.',
    deepDive:
      'O HTML já chega com o texto real das seções, então buscadores e LLMs leem o portfólio sem executar JavaScript. A home também responde em Markdown para quem pede text/markdown, e há JSON-LD, sitemap, llms.txt e páginas de apoio em /about, /contact e /privacy. As animações respeitam prefers-reduced-motion.',
    architecture: [
      { step: '01 / Code', label: 'React modular', detail: 'Seções isoladas, conteúdo separado do layout' },
      { step: '02 / Style', label: 'Tailwind CSS v4', detail: 'Tokens próprios de cor, fonte e movimento' },
      { step: '03 / CI-CD', label: 'GitHub → Vercel', detail: 'Deploy automático a cada push na main' },
      { step: '04 / Agentes', label: 'HTML + Markdown + llms.txt', detail: 'Conteúdo legível sem JavaScript' },
    ],
    links: [{ label: 'Ver código no GitHub', url: 'https://github.com/AugusttoDaniel/Portifolio-dev', primary: true }],
    gallery: [{ src: 'portifolio', caption: 'Capa do projeto.' }],
  },
  {
    id: '06',
    name: 'Assistec Informática',
    category: 'Landing page · Web fundamentals · GitLab',
    tagline: 'Site institucional leve, sem framework e sem etapa de build',
    stack: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'GitLab'],
    summary:
      'Landing page da Assistec Informática, empresa que oferece equipe de TI para manter a operação de outras empresas segura e sob controle.',
    deepDive:
      'Sobre, Serviços, Soluções, Benefícios, Parceiros e Contato numa única página com navegação por âncoras, e a chamada para solicitar consultoria sempre a um clique. Feita com HTML, CSS e JavaScript puros: sem framework, sem build e sem dependências para atualizar.',
    architecture: [
      { step: '01 / Markup', label: 'HTML5 semântico', detail: 'Estrutura pensada para buscadores' },
      { step: '02 / Layout', label: 'CSS nativo', detail: 'Responsivo sem bibliotecas' },
      { step: '03 / Script', label: 'JavaScript puro', detail: 'Interações direto no DOM' },
      { step: '04 / Host', label: 'GitLab', detail: 'Versionamento e publicação' },
    ],
    links: [],
    note: 'Trabalho para cliente · código privado',
    gallery: [
      { src: 'assistec', caption: 'Bloco principal, com a chamada para consultoria.' },
      { src: 'assistec-inicio', caption: 'Início da página, com a apresentação da empresa.' },
      { src: 'assistec-caracteristicas', caption: 'Serviços: assistência, loja e softwares de proteção.' },
      { src: 'assistec-beneficios', caption: 'Diferenciais em quatro blocos numerados.' },
      { src: 'assistec-contato', caption: 'Contato com telefone, e-mail, endereço e formulário.' },
    ],
  },
];
