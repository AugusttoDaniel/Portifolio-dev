import { useState } from 'react';
import { projects } from '../../content/projects';
import { getProjectImage } from '../../utils/projectImages';
import RevealBlock from '../RevealBlock';
import ProjectRow from './ProjectRow';
import Lightbox from './Lightbox';

const imagesOf = (project) =>
  project.gallery.map((item) => ({ ...item, url: getProjectImage(item.src) })).filter((item) => item.url);

export default function ProjectsSection() {
  const [gallery, setGallery] = useState({ project: null, index: 0 });
  const galleryImages = gallery.project ? imagesOf(gallery.project) : [];

  return (
    <section id="projetos" aria-labelledby="projetos-title" className="mx-auto max-w-[1440px] border-x-2 border-b-2 border-ink">
      <div className="grid grid-cols-1 gap-6 border-b-2 border-ink bg-ink px-6 pt-20 pb-12 text-paper sm:px-10 sm:pt-28 sm:pb-16 lg:px-14 xl:grid-cols-12 xl:items-end">
        <div className="xl:col-span-8">
          <span className="eyebrow mb-3 text-signal">// 02. Portfólio de engenharia ({projects.length} projetos)</span>
          <h2 id="projetos-title" className="section-title">
            Projetos & arquiteturas
          </h2>
        </div>
        <p className="font-mono text-xs uppercase text-paper/80 xl:col-span-4 xl:text-right">Clique em um projeto para abrir ↓</p>
      </div>

      <div className="divide-y-2 divide-ink">
        {projects.map((project, index) => (
          <RevealBlock key={project.id} delay={Math.min(index, 5) * 50}>
            <ProjectRow
              project={project}
              images={imagesOf(project)}
              onOpenGallery={(start) => setGallery({ project, index: start })}
            />
          </RevealBlock>
        ))}
      </div>

      <Lightbox
        title={gallery.project?.name ?? ''}
        images={galleryImages}
        index={gallery.index}
        onChange={(index) => setGallery((current) => ({ ...current, index }))}
        onClose={() => setGallery({ project: null, index: 0 })}
      />
    </section>
  );
}
