const MARKDOWN = `# Daniel Augusto Silva | Desenvolvedor Full Stack Júnior

Desenvolvedor Full Stack Júnior atuando profissionalmente com React, Node.js e Nest.js. Já levei projetos do zero à produção e estou disponível para projetos freelance, de sites institucionais a aplicações web completas.

## Sobre

Antes de virar desenvolvedor, trabalhei com manutenção de hardware e suporte técnico, o que me deu uma base sólida para entender como um sistema funciona de ponta a ponta, do hardware ao código. Sou formado em Sistemas de Informação pelo Instituto Federal de Minas Gerais.

## Stack

- React
- Node.js
- Nest.js
- TypeScript
- JavaScript
- MySQL
- PostgreSQL
- Tailwind CSS
- Git
- GitHub

## Projetos

- **Portfólio pessoal**: React, TypeScript, Styled Components
- **Assistec Informática**: landing page institucional em HTML, CSS e JavaScript
- **DevRoadmap**: roadmaps de estudo em Next.js, React, TypeScript e Supabase

## Contato

- GitHub: https://github.com/AugusttoDaniel
- LinkedIn: https://www.linkedin.com/in/danielaugustto/
- Currículo: https://drive.google.com/uc?export=download&id=1IA3T5Ks_PnpFMjxy-W0H58_g3QC28N9w

## Mais informações

- [llms.txt](https://portifolio-dev-two-plum.vercel.app/llms.txt)
- [sitemap.xml](https://portifolio-dev-two-plum.vercel.app/sitemap.xml)
`;

export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
  res.setHeader('Vary', 'Accept, Accept-Encoding');
  res.status(200).send(MARKDOWN);
}
