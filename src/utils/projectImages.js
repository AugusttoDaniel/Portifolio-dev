// Registro central das imagens dos projetos.
// A chave é o que fica no mocks/projects.json (campo "imagem" e "details.gallery[].src"),
// para que os dados não precisem conhecer o caminho real do arquivo.
import portifolio from '../assets/Portifolio.webp';
import assistec from '../assets/Assistec.webp';
import assistecInicio from '../../docs/screenshots/assistec-inicio.png';
import assistecCaracteristicas from '../../docs/screenshots/assistec-caracteristicas.png';
import assistecBeneficios from '../../docs/screenshots/assistec-beneficios.png';
import assistecContato from '../../docs/screenshots/assistec-contato.png';
import roadmap from '../assets/Roadmap.webp';
import videonotes from '../assets/Videonotes.webp';
import portifolioHero from '../../docs/screenshots/hero.png';
import portifolioStack from '../../docs/screenshots/stack.png';
import portifolioCertificados from '../../docs/screenshots/certificados.png';
import portifolioProjetos from '../../docs/screenshots/projetos.png';
import portifolioMobile from '../../docs/screenshots/mobile-hero.png';
import convertmilhasCapa from '../../docs/screenshots/convertmilhas-capa.webp';
import convertmilhasHero from '../../docs/screenshots/convertmilhas-hero.png';
import convertmilhasRota from '../../docs/screenshots/convertmilhas-rota.png';
import convertmilhasPlanos from '../../docs/screenshots/convertmilhas-planos.png';
import ultralikeCapa from '../../docs/screenshots/ultralike-capa.webp';
import ultralikePlanos from '../../docs/screenshots/ultralike-planos.png';
import ultralikeBlog from '../../docs/screenshots/ultralike-blog.png';
import ultralikeBlogPost from '../../docs/screenshots/ultralike-blog-post.png';

export const projectImages = {
  portifolio,
  assistec,
  'assistec-inicio': assistecInicio,
  'assistec-caracteristicas': assistecCaracteristicas,
  'assistec-beneficios': assistecBeneficios,
  'assistec-contato': assistecContato,
  roadmap,
  videonotes,
  'portifolio-hero': portifolioHero,
  'portifolio-stack': portifolioStack,
  'portifolio-certificados': portifolioCertificados,
  'portifolio-projetos': portifolioProjetos,
  'portifolio-mobile': portifolioMobile,
  'convertmilhas-capa': convertmilhasCapa,
  'convertmilhas-hero': convertmilhasHero,
  'convertmilhas-rota': convertmilhasRota,
  'convertmilhas-planos': convertmilhasPlanos,
  'ultralike-capa': ultralikeCapa,
  'ultralike-planos': ultralikePlanos,
  'ultralike-blog': ultralikeBlog,
  'ultralike-blog-post': ultralikeBlogPost,
};

export const getProjectImage = (key) => {
  if (!key) return '';
  // Compatibilidade com entradas antigas que guardavam um caminho em vez da chave.
  if (key.includes('assets/')) return assistec;
  return projectImages[key] || '';
};

// Capa + demais imagens do projeto, sem repetir a capa caso ela já esteja na galeria.
export const getProjectGallery = (project) => {
  const gallery = project?.details?.gallery ?? [];
  const items = gallery.length > 0
    ? gallery
    : [{ src: project?.imagem, caption: '' }];

  return items
    .map((item) => ({ ...item, url: getProjectImage(item.src) }))
    .filter((item) => item.url);
};
