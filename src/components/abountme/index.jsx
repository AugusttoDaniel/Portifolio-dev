import React from 'react';
import styled from 'styled-components';
import { FaLinkedin, FaInstagram, FaGithub, FaDownload } from 'react-icons/fa';
import foto from '../../assets/WhatsApp Image 2024-01-23 at 20.25.57 (1).jpeg';

const PageContainer = styled.section`
  display: flex;
  align-items: center;
  margin: auto;
  background-color: #0a192f;
  color: #fff;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 10px;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: normal;
  color: #8892b0;
  margin-bottom: 60px;
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProfileImageContainer = styled.div`
  flex: 1;
  max-width: 350px;
  margin-bottom: 20px;
`;

const ProfileImage = styled.img`
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const InfoSection = styled.div`
  flex: 2;
`;

const Greeting = styled.h3`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #ccd6f6;
`;

const Bio = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 20px;
  color: #8892b0;
`;

const Emphasis = styled.span`
  font-size: 1rem;
  line-height: 1.7;
  color: #64ffda; // Cor personalizada
  font-weight: bold; // Adiciona destaque visual
`;

const TechLink = styled.a`
  color: #64ffda;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    text-decoration: underline;
    opacity: 0.8;
  }
`;

const StatsSection = styled.div`
  display: flex;
  gap: 30px;
  margin: 40px 0;
`;

const StatBox = styled.div`
  display: flex;
  align-items: baseline;
`;

const StatNumber = styled.span`
  font-size: 3rem;
  font-weight: bold;
  color: #ccd6f6;
`;

const StatLabel = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  
  span {
    color: #8892b0;
    font-size: 0.9rem;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 20px;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
  }
`;

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  background-color: #1e3a5f;
  color: #fff;
  padding: 12px 24px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #2d4a70;
    transform: translateY(-2px);
  }
  
  svg {
    margin-right: 8px;
  }
`;

const SocialLinks = styled.div`
  margin-top: 20px;
  
  a {
    color: #64ffda;
    margin-right: 15px;
    font-weight: 500;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Divider = styled.hr`
  width: 60px;
  height: 4px;
  background-color: #64ffda;
  border: none;
  margin: 0 auto 30px;
`;

const AboutMe = () => {
  return (
    <PageContainer id='about'>
      <ContentContainer>
        <Header>
          <Title>Sobre mim</Title>
          <Divider />
          <Subtitle>Aqui você encontrará mais informações sobre mim</Subtitle>
        </Header>

        <MainSection>
          <ProfileImageContainer>
            <ProfileImage src={foto} alt="Kauã Ortolani Lusvarghi" />
          </ProfileImageContainer>

          <InfoSection>
            <Greeting>Saudações, um pouco sobre mim!</Greeting>

            <Bio>
              Me chamo Daniel Augustto, sou um desenvolvedor em formação, com foco em <Emphasis>Front-end</Emphasis>
              e <Emphasis>Back-end</Emphasis>, buscando oportunidades para aplicar e expandir meus conhecimentos
              em projetos desafiadores. Atualmente, tenho experiência com tecnologias como
              <Emphasis>JavaScript</Emphasis>, <Emphasis>Node.js</Emphasis>,
              <Emphasis>TypeScript</Emphasis>, <Emphasis>React</Emphasis> e
              <Emphasis>MySQL</Emphasis>, e estou sempre em busca de
              aprimoramento profissional para me manter atualizado
              com as melhores práticas do mercado.
            </Bio>

            <Bio>
              Estou em busca de uma vaga como <Emphasis>trainee</Emphasis> ou <Emphasis>júnior</Emphasis>, onde possa
              contribuir com minha dedicação, aprendizado contínuo e habilidades técnicas. Tenho experiência em
              <Emphasis> desenvolvimento back-end</Emphasis>, onde atuei na manutenção e implementação de funcionalidades para
              otimizar sistemas, além de habilidades em manutenção de hardware e suporte técnico, que
              me deram uma base sólida para entender o funcionamento de sistemas como um todo.
            </Bio>

            <StatsSection>
              <StatBox>
                <StatNumber>1+</StatNumber>
                <StatLabel>
                  <span>Anos</span>
                  <span>de experiência</span>
                </StatLabel>
              </StatBox>

              <StatBox>
                <StatNumber>3+</StatNumber>
                <StatLabel>
                  <span>Projetos</span>
                  <span>no GitHub</span>
                </StatLabel>
              </StatBox>
            </StatsSection>

            <ButtonContainer>
              <Button href="/cv.pdf" download>
                <FaDownload /> Baixar CV
              </Button>
            </ButtonContainer>

            {/* <SocialLinks>
              <TechLink href="https://linkedin.com/" target="_blank">LinkedIn</TechLink>
              <TechLink href="https://instagram.com/" target="_blank">Instagram</TechLink>
              <TechLink href="https://github.com/" target="_blank">GitHub</TechLink>
            </SocialLinks> */}
          </InfoSection>
        </MainSection>
      </ContentContainer>
    </PageContainer>
  );
};

export default AboutMe;