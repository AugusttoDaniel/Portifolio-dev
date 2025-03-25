import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchProjectsData } from '../../mocks/apiMock';
import imagem from '../../assets/Macbook-Air-localhost.png';

// Componentes estilizados
const ProjectsSection = styled.div`
  background-color: #0a192f;
  color: #fff;
  padding: 60px 20px 80px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
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

const ProjectsList = styled.div`
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
  
  if (loading) {
    return (
      <ProjectsSection>
        <Container>
          <LoadingMessage>Carregando projetos...</LoadingMessage>
        </Container>
      </ProjectsSection>
    );
  }

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
        <Header>
          <Title>Projetos</Title>
          <Subtitle>Aqui você encontrará alguns dos meus projetos pessoais mais recentes</Subtitle>
        </Header>

        <ProjectsList>
          {projects.slice(0, visibleProjects).map((project) => (
            <ProjectCard key={project.id}>
              <ProjectImage>
                <img src={imagem} alt={project.title} />
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
                  <Button href={project.codeLink} target="_blank" rel="noopener noreferrer">
                    Ver Código
                  </Button>
                </ButtonsContainer>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsList>

        {projects.length > visibleProjects ? (
          <ViewMoreButton onClick={loadMoreProjects}>
            Ver mais projetos →
          </ViewMoreButton>
        ) : (
          <ViewMoreButton disabled>
            
          </ViewMoreButton>
        )}
      </Container>
    </ProjectsSection>
  );
};

export default Projects;