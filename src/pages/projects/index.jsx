import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchProjectsData } from '../../mocks/apiMock';
import LoadingSpinner from '../../components/loadingspinner';
import { motion } from "framer-motion";
// Importar imagens
import portfolioImage from '../../assets/portifolio.webp';
import assistecImage from '../../assets/assistec.webp';
import roadmapImage from '../../assets/roadmap.webp';

const ProjectsSection = styled.div`
  background-color: #020617;
  color: #fff;
  padding: 60px 20px 80px;
      position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 1px;
    width: 100%;
    background: linear-gradient(to right, transparent, #22d3ee, transparent);
    opacity: 0.5;
    z-index: 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #ccd6f6;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #8892b0;
`;

const ProjectsList = styled(motion.div)`
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
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.7);

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
  color: #ccd6f6;
  margin: 0;
`;

const ProjectDescription = styled.p`
  color: #8892b0;
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
  color: #64ffda;
  background-color: rgba(100, 255, 218, 0.1);
  padding: 4px 10px;
  border-radius: 4px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;
`;

const Button = styled.a`
  display: inline-block;
  padding: 8px 16px;
  background-color: #172a45;
  color: #64ffda;
  border: 1px solid #64ffda;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background-color: rgba(100, 255, 218, 0.1);
  }
`;

const ViewMoreButton = styled.button`
  display: block;
  margin: 60px auto 0;
  background: none;
  border: none;
  color: #64ffda;
  text-decoration: none;
  font-size: 1.1rem;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    text-decoration: underline;
  }

  &:disabled {
    color: #8892b0;
    cursor: not-allowed;
    text-decoration: none;
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: #8892b0;
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
            <motion.div
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
            </motion.div>
          ))}
        </ProjectsList>

        {projects.length > visibleProjects ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <ViewMoreButton onClick={loadMoreProjects} aria-label="Carregar mais projetos">
              Ver mais projetos →
            </ViewMoreButton>
          </motion.div>
        ) : (
          <ViewMoreButton disabled aria-label="Não há mais projetos para carregar">
          </ViewMoreButton>
        )}
      </Container>
    </ProjectsSection>
  );
};

export default Projects;