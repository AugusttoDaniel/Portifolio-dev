import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaWhatsapp, FaLinkedin } from 'react-icons/fa';
import ScrollIndicator from '../../components/scrollIndicator';
import AvailabilityButtonComponent from '../../components/availabilityButtonComponent';
import { FaBriefcase } from 'react-icons/fa';
import StarConstellation from '../../components/backgroundStar';
import { m } from "framer-motion";
import TypingText from "../../components/typingText";

const Container = styled.section`
  background-color: ${(props) => props.theme.colors.bgdev};
  color: ${(props) => props.theme.colors.white};
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 1rem; 
  }
`;

const Title = styled(m.h1)`
  color: ${(props) => props.theme.colors.brand1};
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.typography.fontSize["bg-text-u"]};
  font-weight: ${(props) => props.theme.typography.fontWeight.regular};
  line-height: ${(props) => props.theme.typography.lineHeight["bg-text-u"]};
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    font-size: 2.5rem; 
    line-height: 3rem;
    margin-bottom: 2rem; 
  }
`;

const RightSection = styled(m.div)`
  padding: 2rem;

  @media (max-width: 768px) {
    text-align: center;
    padding: 1rem; 
  }
`;

const Codespace = styled.div`
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem; 
  }
`;

const CodeTag = styled.span`
  color: ${(props) => props.theme.colors.brand1};
  font-family: monospace;
  margin-bottom: 0.5rem;
`;

const Greeting = styled(m.h2)`
  font-size: 2.5rem;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem; 
  }
`;

const Name = styled.span`
  color: ${(props) => props.theme.colors.brand1};
  font-size: 2.5rem;

  @media (max-width: 768px) {
    font-size: 1.6rem; 
  }
`;

const Bio = styled.p`
  line-height: 1.6;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.4; 
  }
`;

const IconContainer = styled(m.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const SocialButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  padding: 8px;
  
  &:hover {
    transform: scale(1.2);
  }
  
  svg {
    width: 40px;
    height: 40px;
    color: ${(props) => props.theme.colors.white};

    @media (max-width: 768px) {
      width: 20px;
      height: 20px;
    }
  }
`;

const DeveloperProfile = () => {
  const openSocialLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

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

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <Container id="home">
      <StarConstellation />
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <AvailabilityButtonComponent
          icon={FaBriefcase}
          message="Disponível para vaga de dev!"
          backgroundColor="#12F7D6"
          textColor="#020617"
          hoverColor="#0DBFA6"
          hoverTextColor="#020617"
        />
      </m.div>
      
      <RightSection 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <Title
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <TypingText
            speed={50}
            content={`Developer`}
          />
        </Title>
        
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <m.div variants={fadeInUp}>
            <CodeTag>&lt;h1&gt;</CodeTag>
            <Greeting>
              E ai<br />
              meu nome é <Name>Daniel</Name>,<br />
              sou <Name>Desenvolvedor full stack</Name>
            </Greeting>
            <CodeTag>&lt;/h1&gt;<br /></CodeTag>
          </m.div>
          
          <Codespace></Codespace>
          
          <m.div variants={fadeInUp}>
            <CodeTag>&lt;p&gt;</CodeTag>
            <Bio>
              Sou um desenvolvedor júnior apaixonado por tecnologia. Tenho <br />
              experiência com React, Node.js e estou sempre em busca de <br />
              aprender mais e aprimorar minhas habilidades.
            </Bio>
            <CodeTag>&lt;/p&gt;</CodeTag>
          </m.div>
          
          <IconContainer
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <m.div variants={fadeInUp}>
              <SocialButton
                onClick={() => openSocialLink('https://github.com/AugusttoDaniel')}
                aria-label="GitHub"
              >
                <FaGithub />
              </SocialButton>
            </m.div>
            
            <m.div variants={fadeInUp}>
              <SocialButton
                onClick={() => openSocialLink('https://wa.me/5533988595641')}
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </SocialButton>
            </m.div>
            
            <m.div variants={fadeInUp}>
              <SocialButton
                onClick={() => openSocialLink('https://www.linkedin.com/in/danielaugustto/')}
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </SocialButton>
            </m.div>
          </IconContainer>
        </m.div>
      </RightSection>
      
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <ScrollIndicator />
      </m.div>
    </Container>
  );
}

export default DeveloperProfile;
