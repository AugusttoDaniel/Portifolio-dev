import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { fetchProjectsData } from '../../mocks/apiMock';
import LoadingSpinner from '../../components/loadingspinner';
import { m, useScroll, useTransform } from "framer-motion";
import RevealText from '../../components/revealText';
import TiltCard from '../../components/tiltCard';
import MagneticButton from '../../components/magneticButton';
import ProjectModal from '../../components/projectModal';
import { getProjectImage } from '../../utils/projectImages';
import { FaArrowRight, FaExpand } from 'react-icons/fa';

const ProjectsSection = styled.div`
  background-color: ${(props) => props.theme.colors.bg};
  color: ${(props) => props.theme.colors.text};
  padding: 60px 20px 80px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 1px;
    width: 100%;
    background: linear-gradient(to right, transparent, ${(props) => props.theme.colors.brand1}, transparent);
    opacity: 0.5;
    z-index: 0;
  }
`;

const Blob = styled(m.div)`
  position: absolute;
  top: -180px;
  right: -160px;
  width: 600px;
  height: 600px;
  border-radius: 44% 56% 62% 38% / 41% 44% 56% 59%;
  background: radial-gradient(circle at 35% 30%, #1BA3E8 0%, #085C87 55%, transparent 75%);
  filter: blur(100px);
  opacity: 0.16;
  z-index: 0;
  pointer-events: none;
`;

const Watermark = styled.div`
  position: absolute;
  top: 50px;
  left: -10px;
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-weight: 700;
  font-size: 240px;
  line-height: 1;
  letter-spacing: -6px;
  color: rgba(15, 23, 42, 0.035);
  z-index: 0;
  user-select: none;
  white-space: nowrap;

  @media (max-width: 900px) {
    display: none;
  }
`;

const Container = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled(m.div)`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled.h2`
  font-size: ${(props) => props.theme.typography.fontSize.xxl};
  font-weight: 700;
  margin-bottom: 10px;
  color: ${(props) => props.theme.colors.text};
`;

const Subtitle = styled.p`
  font-size: ${(props) => props.theme.typography.fontSize.sm};
  color: ${(props) => props.theme.colors.textMuted};
`;

const ProjectsList = styled(m.div)`
  display: flex;
  flex-direction: column;
  gap: 80px;

  @media (max-width: 768px) {
    gap: 56px;
  }
`;

const ProjectCard = styled.div`
  display: flex;
  /* stretch para a imagem acompanhar a altura do bloco de texto ao lado. */
  align-items: stretch;
  gap: 40px;
  flex-direction: ${(props) => (props.$reverse ? 'row-reverse' : 'row')};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
  }
`;

const ProjectImage = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 0;
  padding: 0;
  border: none;
  font: inherit;
  cursor: pointer;
  position: relative;
  /* Os mocks têm fundo transparente ou quase branco, então o painel entra como
     moldura no mesmo tom claro e a emenda não aparece. */
  background-color: ${(props) => props.theme.colors.bgAlt};
  border-radius: ${(props) => props.theme.radius.md};
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(15, 23, 42, 0.05), 0 24px 48px rgba(15, 23, 42, 0.14);

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    transition: transform 0.3s;
  }

  &:hover img,
  &:focus-visible img {
    transform: scale(1.05);
  }

  &:hover span,
  &:focus-visible span {
    opacity: 1;
  }

  &:focus-visible {
    outline: 2px solid ${(props) => props.theme.colors.brand1};
    outline-offset: 3px;
  }
`;

const ImageOverlay = styled.span`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.white};
  background: linear-gradient(to top, rgba(11, 18, 32, 0.75), rgba(11, 18, 32, 0.25));
  opacity: 0;
  transition: opacity 0.3s ease;

  svg {
    width: 14px;
    height: 14px;
  }
`;

const ProjectContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.text};
  margin: 0;

  button {
    padding: 0;
    border: none;
    background: none;
    font: inherit;
    color: inherit;
    text-align: left;
    cursor: pointer;
    transition: color 0.25s ease;

    &:hover {
      color: ${(props) => props.theme.colors.accentHover};
    }

    &:focus-visible {
      outline: 2px solid ${(props) => props.theme.colors.brand1};
      outline-offset: 4px;
      border-radius: ${(props) => props.theme.radius.sm};
    }
  }
`;

const ProjectDescription = styled.p`
  color: ${(props) => props.theme.colors.textMuted};
  line-height: 1.6;
  margin: 0;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 5px;
`;

const TechItem = styled.span`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.accentHover};
  background-color: ${(props) => props.theme.colors.surfaceTint};
  padding: 4px 10px;
  border-radius: ${(props) => props.theme.radius.sm};
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
`;

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  line-height: 1.2;
  white-space: nowrap;
  padding: 8px 16px;
  background-color: ${(props) => props.theme.colors.surface};
  color: ${(props) => props.theme.colors.accentHover};
  border: 1px solid ${(props) => props.theme.colors.brand1};
  border-radius: ${(props) => props.theme.radius.sm};
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.surfaceTint};
  }
`;

const DetailsButton = styled.button`
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  line-height: 1.2;
  white-space: nowrap;
  gap: 8px;
  padding: 8px 16px;
  color: ${(props) => props.theme.colors.white};
  background: linear-gradient(135deg, ${(props) => props.theme.colors.brand1}, ${(props) => props.theme.colors.accentHover});
  border: 1px solid transparent;
  border-radius: ${(props) => props.theme.radius.sm};
  font-size: 0.9rem;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.3s;

  svg {
    width: 12px;
    height: 12px;
    transition: transform 0.25s ease;
  }

  &:hover svg {
    transform: translateX(3px);
  }

  &:hover {
    box-shadow: 0 10px 20px ${(props) => props.theme.colors.brand1}3D;
  }

  &:focus-visible {
    outline: 2px solid ${(props) => props.theme.colors.brand1};
    outline-offset: 2px;
  }
`;

const ViewMoreButton = styled.button`
  display: block;
  margin: 60px auto 0;
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.accentHover};
  text-decoration: none;
  font-size: 1.1rem;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    text-decoration: underline;
  }

  &:disabled {
    color: ${(props) => props.theme.colors.textMuted};
    cursor: not-allowed;
    text-decoration: none;
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: ${(props) => props.theme.colors.textMuted};
  font-size: 1.2rem;
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: #ff4d4d;
  font-size: 1.2rem;
`;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleProjects, setVisibleProjects] = useState(3);
  const [selectedProject, setSelectedProject] = useState(null);

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'], layoutEffect: false });
  const yBlob = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProjectsData();
        setProjects(data);
        console.log(data)
        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar os projetos. Por favor, tente novamente mais tarde." + err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const loadMoreProjects = () => {
    setVisibleProjects(prevVisible => prevVisible + 3);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <ProjectsSection>
        <Container>
          <ErrorMessage>{error}</ErrorMessage>
        </Container>
      </ProjectsSection>
    );
  }

  return (
    <ProjectsSection id="projetos" ref={sectionRef}>
      <Blob style={{ y: yBlob }} />
      <Watermark>PROJETOS</Watermark>
      <Container>
        <Header
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <Title><RevealText text="Projetos" /></Title>
          <Subtitle>Projetos feitos do zero até a produção. Clique em um para ver os detalhes.</Subtitle>
        </Header>

        <ProjectsList>
          {projects.slice(0, visibleProjects).map((project, index) => (
            <m.div
              key={project.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
            >
              <ProjectCard $reverse={index % 2 === 1}>
                <TiltCard maxTilt={6} scale={1.015} style={{ flex: 1, display: 'flex' }}>
                  <ProjectImage
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    aria-label={`Abrir detalhes do projeto ${project.title}`}
                  >
                    <img
                      src={getProjectImage(project.imagem)}
                      alt={project.title}
                    />
                    <ImageOverlay aria-hidden="true">
                      <FaExpand /> Ver detalhes
                    </ImageOverlay>
                  </ProjectImage>
                </TiltCard>
                <ProjectContent>
                  <ProjectTitle>
                    <button type="button" onClick={() => setSelectedProject(project)}>
                      {project.title}
                    </button>
                  </ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <TechStack>
                    {project.tech.map((tech, index) => (
                      <TechItem key={index}>{tech}</TechItem>
                    ))}
                  </TechStack>
                  <ButtonsContainer>
                    <MagneticButton>
                      <DetailsButton type="button" onClick={() => setSelectedProject(project)}>
                        Ver detalhes <FaArrowRight />
                      </DetailsButton>
                    </MagneticButton>
                    {project.demoLink && (
                      <MagneticButton>
                        <Button href={project.demoLink} target="_blank" rel="noopener noreferrer">
                          Ver Demo
                        </Button>
                      </MagneticButton>
                    )}
                    {project.codeLink && (
                      <MagneticButton>
                        <Button href={project.codeLink} target="_blank" rel="noopener noreferrer">
                          Ver Código
                        </Button>
                      </MagneticButton>
                    )}
                  </ButtonsContainer>
                </ProjectContent>
              </ProjectCard>
            </m.div>
          ))}
        </ProjectsList>

        {projects.length > visibleProjects ? (
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <ViewMoreButton onClick={loadMoreProjects} aria-label="Carregar mais projetos">
              Ver mais projetos →
            </ViewMoreButton>
          </m.div>
        ) : (
          <ViewMoreButton disabled aria-label="Não há mais projetos para carregar">
          </ViewMoreButton>
        )}
      </Container>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </ProjectsSection>
  );
};

export default Projects;