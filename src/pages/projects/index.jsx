import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchProjectsData } from '../../mocks/apiMock';
import LoadingSpinner from '../../components/loadingspinner';
import { m } from "framer-motion";
// Importar imagens
import portfolioImage from '../../assets/Portifolio.webp';
import assistecImage from '../../assets/Assistec.webp';
import roadmapImage from '../../assets/Roadmap.webp';

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

const Blob = styled.div`
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
`;

const ProjectCard = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;

  &:nth-child(even) {
    flex-direction: row-reverse;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    &:nth-child(even) {
      flex-direction: column;
    }
  }
`;

const ProjectImage = styled.div`
  flex: 1;
  position: relative;
  border-radius: ${(props) => props.theme.radius.md};
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(15, 23, 42, 0.05), 0 24px 48px rgba(15, 23, 42, 0.14);

  img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.3s;
  }

  &:hover img {
    transform: scale(1.05);
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
  gap: 15px;
  margin-top: 10px;
`;

const Button = styled.a`
  display: inline-block;
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

  // Mapeamento de imagens
  const imageMap = {
    'portifolio': portfolioImage,
    'roadmap': roadmapImage,
    'assistec': assistecImage,
  };

  const getImagePath = (imagePath) => {
    // Se for um caminho completo que inclui assets
    if (imagePath.includes('assets/')) {
      return assistecImage;
    }
    // Se for apenas o nome da imagem
    return imageMap[imagePath] || '';
  };

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
    <ProjectsSection id="projetos">
      <Blob />
      <Watermark>PROJETOS</Watermark>
      <Container>
        <Header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Title>Projetos</Title>
          <Subtitle>Aqui você encontrará alguns dos meus projetos pessoais mais recentes</Subtitle>
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
              <ProjectCard>
                <ProjectImage>
                  <img
                    src={getImagePath(project.imagem)}
                    alt={project.title}
                  />
                </ProjectImage>
                <ProjectContent>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <TechStack>
                    {project.tech.map((tech, index) => (
                      <TechItem key={index}>{tech}</TechItem>
                    ))}
                  </TechStack>
                  <ButtonsContainer>
                    <Button href={project.demoLink} target="_blank" rel="noopener noreferrer">
                      Ver Demo
                    </Button>
                    {project.codeLink && (
                      <Button href={project.codeLink} target="_blank" rel="noopener noreferrer">
                        Ver Código
                      </Button>
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
    </ProjectsSection>
  );
};

export default Projects;