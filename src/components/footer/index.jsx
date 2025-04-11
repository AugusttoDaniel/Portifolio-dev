import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'; // Importação dos ícones

// Cores do tema
// eslint-disable-next-line no-unused-vars
const theme = {
  background: '#020617', // Fundo escuro
  text: '#ffffff', // Texto branco
  primary: '#7de2d1', // Cor primária (verde)
};

// Componentes estilizados
const FooterContainer = styled.footer`
  position: relative; /* Necessário pro ::before funcionar */
  background-color: #020617;
  color: #ffffff;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 1px;
    width: 100%;
    background: linear-gradient(to right, transparent, #22d3ee, transparent); /* brilho no centro */
    opacity: 0.5;
    z-index: 0; 
  }

  @media (min-width: 768px) {
    flex-direction: row; 
    justify-content: space-between;
    padding: 3rem;
  }
`;

const FooterSection = styled.div`
  text-align: center;
 


  @media (min-width: 768px) {
    text-align: left; 
  }
`;

const FooterTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #7de2d1; 
`;

const FooterList = styled.ul`
  list-style-type: none;
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
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #7de2d1; 
  }
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const SocialIcon = styled.a`
  color: ${(props) => props.theme.text};
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.primary};
  }
`;

// Componente Principal
const Footer = () => {
  return (
    <FooterContainer>
      {/* Seção de Navegação */}
      <FooterSection>
        <FooterTitle>Navegação</FooterTitle>
        <FooterList>
          <li>
            <FooterLink href="#home">Home</FooterLink>
          </li>
          <li>
            <FooterLink href="#about">Sobre</FooterLink>
          </li>
          <li>
            <FooterLink href="#stack">Stack</FooterLink>
          </li>
          <li>
            <FooterLink href="#certificados">Certificados</FooterLink>
          </li>
          <li>
            <FooterLink href="#projetos">Projetos</FooterLink>
          </li>
           
        </FooterList>
      </FooterSection>

      <FooterSection>
        <FooterTitle>Redes Sociais</FooterTitle>
        <SocialIcons>
          <SocialIcon href="https://github.com/AugusttoDaniel" target="_blank" rel="noopener noreferrer">
            <FaGithub size={20} color='white' />
          </SocialIcon>
          <SocialIcon href="https://www.linkedin.com/in/danielaugustto/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={20} color='white' />
          </SocialIcon>
          <SocialIcon href="mailto:danielsje7133@gmail.com" target="_blank" rel="noopener noreferrer">
            <FaEnvelope size={20} color='white' />
          </SocialIcon>
        </SocialIcons>
      </FooterSection>

      <FooterSection>
        <p>&copy; {new Date().getFullYear()} Daniel Augusto Silva. Todos os direitos reservados.</p>
      </FooterSection>
    </FooterContainer>
  );
};

export default Footer;