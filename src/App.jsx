import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import ScrollProgress from './components/ScrollProgress';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import Marquee from './components/Marquee';
import ProjectsSection from './components/projects/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import StackSection from './components/StackSection';
import ContactFooter from './components/ContactFooter';

function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <a
        href="#conteudo"
        className="sr-only z-[70] bg-ink px-4 py-3 font-mono text-xs font-bold uppercase text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Pular para o conteúdo
      </a>
      <ScrollProgress />
      <NavBar />
      <main id="conteudo">
        <Hero />
        <AboutSection />
        <Marquee />
        <ProjectsSection />
        <ExperienceSection />
        <StackSection />
      </main>
      <ContactFooter />
      <SpeedInsights />
      <Analytics />
    </div>
  );
}

export default App;
