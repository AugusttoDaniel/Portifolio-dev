import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme'; // Importando o tema
import { FaGithub, FaWhatsapp, FaLinkedin } from 'react-icons/fa';
import ScrollIndicator from '../../components/scrollIndicator';
import AvailabilityButtonComponent from '../../components/availabilityButtonComponent';
import { FaBriefcase } from 'react-icons/fa';
import StarConstellation from '../../components/backgroundStar';
import { motion } from "framer-motion";
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

const Title = styled(motion.h1)`
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

const RightSection = styled(motion.div)`
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
  color: ${theme.primary};
  font-family: monospace;
  margin-bottom: 0.5rem;
`;

const Greeting = styled(motion.h2)`
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

const IconContainer = styled.div`
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
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <AvailabilityButtonComponent
          icon={FaBriefcase}
          message="Disponível para vaga de dev!"
          backgroundColor="#007bff"
          textColor="#ffffff"
          hoverColor="#0056b3"
          hoverTextColor="#ffffff"
        />
      </motion.div>
      
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
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <CodeTag>&lt;h1&gt;</CodeTag>
            <Greeting>
              E ai<br />
              meu nome é <Name>Daniel</Name>,<br />
              sou <Name>Desenvolvedor full stack</Name>
            </Greeting>
            <CodeTag>&lt;/h1&gt;<br /></CodeTag>
          </motion.div>
          
          <Codespace></Codespace>
          
          <motion.div variants={fadeInUp}>
            <CodeTag>&lt;p&gt;</CodeTag>
            <Bio>
              Sou um desenvolvedor júnior apaixonado por tecnologia. Tenho <br />
              experiência com React, Node.js e estou sempre em busca de <br />
              aprender mais e aprimorar minhas habilidades.
            </Bio>
            <CodeTag>&lt;/p&gt;</CodeTag>
          </motion.div>
          
          <IconContainer
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <SocialButton
                onClick={() => openSocialLink('https://github.com/AugusttoDaniel')}
                aria-label="GitHub"
              >
                <FaGithub />
              </SocialButton>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <SocialButton
                onClick={() => openSocialLink('https://wa.me/5533988595641')}
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </SocialButton>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <SocialButton
                onClick={() => openSocialLink('https://www.linkedin.com/in/danielaugustto/')}
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </SocialButton>
            </motion.div>
          </IconContainer>
        </motion.div>
      </RightSection>
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <ScrollIndicator />
      </motion.div>
    </Container>
  );
}

export default DeveloperProfile;
