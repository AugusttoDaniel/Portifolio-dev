import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import MagneticButton from '../magneticButton';
import { useLenis } from 'lenis/react';
import { scrollToId } from '../../utils/scrollToId';

const FooterContainer = styled.footer`
  position: relative;
  background-color: ${(props) => props.theme.colors.navy};
  color: ${(props) => props.theme.colors.white};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
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

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 3rem;
  }
`;

const Blob = styled.div`
  position: absolute;
  bottom: -160px;
  left: -120px;
  width: 480px;
  height: 480px;
  border-radius: 42% 58% 65% 35% / 41% 44% 56% 59%;
  background: radial-gradient(circle at 40% 40%, #1BA3E8 0%, transparent 70%);
  filter: blur(110px);
  opacity: 0.18;
  z-index: 0;
  pointer-events: none;
`;

const FooterSection = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const FooterTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.colors.brand2};
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 1rem;
  }
`;

const FooterLink = styled.a`
  color: ${(props) => props.theme.colors.white};
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.colors.brand2};
  }
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const SocialIcon = styled.a`
  color: ${(props) => props.theme.colors.white};
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.colors.brand2};
  }
`;

const Footer = () => {
  const lenis = useLenis();

  const handleNavClick = (e, id) => {
    e.preventDefault();
    scrollToId(lenis, id);
  };

  return (
  <FooterContainer>
    <Blob />
    <FooterSection>
      <FooterTitle>Navegação</FooterTitle>
      <FooterList>
        <li><FooterLink href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</FooterLink></li>
        <li><FooterLink href="#about" onClick={(e) => handleNavClick(e, 'about')}>Sobre</FooterLink></li>
        <li><FooterLink href="#stack" onClick={(e) => handleNavClick(e, 'stack')}>Stack</FooterLink></li>
        <li><FooterLink href="#certificados" onClick={(e) => handleNavClick(e, 'certificados')}>Certificados</FooterLink></li>
        <li><FooterLink href="#projetos" onClick={(e) => handleNavClick(e, 'projetos')}>Projetos</FooterLink></li>
      </FooterList>
    </FooterSection>

    <FooterSection>
      <FooterTitle>Redes Sociais</FooterTitle>
      <SocialIcons>
        <MagneticButton strength={0.5}>
          <SocialIcon
            href="https://github.com/AugusttoDaniel"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </SocialIcon>
        </MagneticButton>
        <MagneticButton strength={0.5}>
          <SocialIcon
            href="https://www.linkedin.com/in/danielaugustto/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </SocialIcon>
        </MagneticButton>
        <MagneticButton strength={0.5}>
          <SocialIcon
            href="mailto:danielsje7133@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="E-mail"
          >
            <FaEnvelope size={20} />
          </SocialIcon>
        </MagneticButton>
      </SocialIcons>
    </FooterSection>

    <FooterSection>
      <p>&copy; {new Date().getFullYear()} Daniel Augusto Silva. Todos os direitos reservados.</p>
    </FooterSection>
  </FooterContainer>
  );
};

export default Footer;
