const MARKDOWN = `# Daniel Augusto Silva | Desenvolvedor Full Stack Júnior

Sou desenvolvedor full stack júnior, com foco no back-end em Node.js, Nest.js e TypeScript, e no front-end com React. Já levei projetos do zero à produção e estou aberto a vagas de desenvolvedor back-end ou full stack.

## Sobre

Antes de virar desenvolvedor, trabalhei com manutenção de hardware e suporte técnico. Essa etapa mostrou como um sistema funciona de ponta a ponta, do hardware ao código. Sou formado em Sistemas de Informação pelo Instituto Federal de Minas Gerais. Em 2020 ganhei a medalha de prata na II Maratona de Programação Intercampi do IFMG.

## Stack

- Node.js
- Nest.js
- TypeScript
- React
- JavaScript
- PostgreSQL
- MySQL
- Tailwind CSS
- Git
- GitHub

## Projetos

- **videonotes**: bot em Go que transforma links de vídeo enviados num grupo do WhatsApp em notas estruturadas no Obsidian, transcrevendo com Whisper e lendo texto na tela com um modelo de visão quando o vídeo não tem fala
- **Portfólio pessoal**: React, Styled Components, Framer Motion
- **Assistec Informática**: landing page institucional em HTML, CSS e JavaScript
- **DevRoadmap**: roadmaps de estudo em Next.js, React, TypeScript e Supabase

## Contato

- GitHub: https://github.com/AugusttoDaniel
- LinkedIn: https://www.linkedin.com/in/danielaugustto/
- Currículo: https://danielaugusto.vercel.app/curriculo-daniel-augusto.pdf

## Mais informações

- [llms.txt](https://danielaugusto.vercel.app/llms.txt)
- [sitemap.xml](https://danielaugusto.vercel.app/sitemap.xml)
`;

export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
  res.setHeader('Vary', 'Accept, Accept-Encoding');
  res.status(200).send(MARKDOWN);
}
