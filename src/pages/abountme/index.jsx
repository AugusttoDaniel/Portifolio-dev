import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaDownload } from 'react-icons/fa';
import foto from '../../assets/Foto.webp';
import { motion } from "framer-motion";

const PageContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  margin: auto;
  background-color: #0F172A;
  color: #fff;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
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


const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled(motion.header)`
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

const MainSection = styled(motion.div)`
  display: flex;
  flex-direction: row;
  gap: 40px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProfileImageContainer = styled(motion.div)`
  flex: 1;
  max-width: 350px;
  margin-bottom: 20px;
`;

const ProfileImage = styled(motion.img)`
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const InfoSection = styled(motion.div)`
  flex: 2;
`;

const Greeting = styled(motion.h3)`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #ccd6f6;
`;

const Bio = styled(motion.p)`
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

const TechLink = styled(motion.a)`
  color: #64ffda;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    text-decoration: underline;
    opacity: 0.8;
  }
`;

const StatsSection = styled(motion.div)`
  display: flex;
  gap: 30px;
  margin: 40px 0;
`;

const StatBox = styled(motion.div)`
  display: flex;
  align-items: baseline;
`;

const StatNumber = styled(motion.span)`
  font-size: 3rem;
  font-weight: bold;
  color: #ccd6f6;
`;

const StatLabel = styled(motion.div)`
  display: flex;
  flex-direction: column;
  margin-left: 10px;

  span {
    color: #8892b0;
    font-size: 0.9rem;
  }
`;

const ButtonContainer = styled(motion.div)`
  margin-top: 20px;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
  }
`;

const Button = styled(motion.a)`
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

const SocialLinks = styled(motion.div)`
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

const Divider = styled(motion.hr)`
  width: 60px;
  height: 4px;
  background-color: #64ffda;
  border: none;
  margin: 0 auto 30px;
`;
const AnimatedNumber = ({ targetValue, duration = 2 }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = targetValue;
    const totalFrames = Math.ceil(duration * 60);
    const increment = (end - start) / totalFrames;

    const interval = setInterval(() => {
      start += increment;
      setValue(Math.min(start, end));

      if (start >= end) {
        clearInterval(interval);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [targetValue, duration]);

  return <span>{Math.floor(value)}</span>;
};

const AboutMe = () => {
  // Configurações de animação
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <PageContainer id='about'>
      <ContentContainer>
        <Header 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <Title>
            Sobre mim
          </Title>
          <Divider />
          <Subtitle>
            Aqui você encontrará mais informações sobre mim
          </Subtitle>
        </Header>

        <MainSection>
          <ProfileImageContainer 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInLeft}
          >
            <ProfileImage src={foto} alt="Kauã Ortolani Lusvarghi" />
          </ProfileImageContainer>

          <InfoSection 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInRight}
          >
            <Greeting 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
              Saudações, um pouco sobre mim!
            </Greeting>

            <Bio 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
              Me chamo Daniel Augustto, sou um desenvolvedor em formação, com foco em <Emphasis>Front-end</Emphasis> e <Emphasis>Back-end</Emphasis>, buscando oportunidades para aplicar e expandir meus conhecimentos em projetos desafiadores. Atualmente, tenho experiência com tecnologias como <Emphasis>JavaScript</Emphasis>, <Emphasis>Node.js</Emphasis>, <Emphasis>TypeScript</Emphasis>, <Emphasis>React</Emphasis> e <Emphasis>MySQL</Emphasis>, e estou sempre em busca de aprimoramento profissional para me manter atualizado com as melhores práticas do mercado.
            </Bio>

            <Bio 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
              Estou em busca de uma vaga como <Emphasis>trainee</Emphasis> ou <Emphasis>júnior</Emphasis>, onde possa contribuir com minha dedicação, aprendizado contínuo e habilidades técnicas. Tenho experiência em <Emphasis>desenvolvimento back-end</Emphasis>, onde atuei na manutenção e implementação de funcionalidades para otimizar sistemas, além de habilidades em manutenção de hardware e suporte técnico, que me deram uma base sólida para entender o funcionamento de sistemas como um todo.
            </Bio>

            <StatsSection
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
              <StatBox>
                <StatNumber>
                  <AnimatedNumber targetValue={1} duration={2} />+
                </StatNumber>
                <StatLabel>
                  <span>Anos</span>
                  <span>de experiência</span>
                </StatLabel>
              </StatBox>

              <StatBox>
                <StatNumber>
                  <AnimatedNumber targetValue={3} duration={2} />+
                </StatNumber>
                <StatLabel>
                  <span>Projetos</span>
                  <span>no GitHub</span>
                </StatLabel>
              </StatBox>
            </StatsSection>
            <ButtonContainer 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
              <Button
                href="https://drive.google.com/uc?export=download&id=1IA3T5Ks_PnpFMjxy-W0H58_g3QC28N9w"
                download
                aria-label="Baixar CV"
              >
                <FaDownload /> Baixar CV
              </Button>
            </ButtonContainer>
          </InfoSection>
        </MainSection>
      </ContentContainer>
    </PageContainer>
  );
};

export default AboutMe;