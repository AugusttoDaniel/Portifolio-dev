import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled Components
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${(props) => props.theme.colors.bg1};
  position: relative; /* Para posicionar o menu mobile */
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    flex-grow: 1; /* Ocupa mais espaço no mobile */
  }
`;

const LogoText = styled.span`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.typography.fontSize.h2};
  font-weight: ${(props) => props.theme.typography.fontWeight.regular};
  color: ${(props) => props.theme.colors.white};
`;

const MenuContainer = styled.nav`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none; /* Oculta o menu desktop no mobile */
  }
`;

// MenuItem modificado com efeito de desfocar outros itens
const MenuItem = styled.a`
  font-size: 1rem;
  font-weight: normal;
  color: white;
  text-decoration: none;
  opacity: ${(props) => (props.isActive ? '1' : '0.7')};
  cursor: pointer;
  position: relative;
  transition: opacity 0.3s ease, filter 0.3s ease;
  
  /* Desfocar outros itens quando este item estiver com hover */
  ${({ isHovered, id }) =>
    isHovered && id !== isHovered ?
      'filter: blur(1px); opacity: 0.5;' :
      'filter: blur(0);'
  }
  
  &:hover {
    opacity: 1;
    filter: blur(0);
  }
  
 @media (min-width: 769px) {

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: white;
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 2s ease;
    }
    
    &:hover::after {
      transform: scaleX(1);
      transform-origin: left;
    }
    
    &:not(:hover)::after {
      transform-origin: right;
      transition: transform 2s ease;
    }
}
}`;

const DownloadButton = styled.button`
  background-color: ${(props) => props.theme.colors.css};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.typography.fontSize.paragraph};
  font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
    transition: background-color 0.3s ease;
    scale: 1.05;
  }

`;

const HamburgerButton = styled.button`
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 24px;
  height: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1000;

  @media (max-width: 768px) {
    display: flex; 
  }

  div {
    width: 100%;
    height: 2px;
    background-color: ${(props) => (props.isOpen ? props.theme.colors.html : props.theme.colors.white)};
    transition: all 0.3s ease;

    &:nth-child(1) {
      transform: ${(props) => (props.isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none')};
    }

    &:nth-child(2) {
      opacity: ${(props) => (props.isOpen ? '0' : '1')};
    }

    &:nth-child(3) {
      transform: ${(props) => (props.isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none')};
    }
  }
`;

const MobileMenuContainer = styled.div`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${(props) => props.theme.colors.bg1};
  padding: 1rem;
  gap: 1rem;
  z-index: 999;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from {
      transform: translateY(-10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

`;

// Array de itens de menu
const menuItems = [
  { id: 'home', label: 'Home' },
  { id: 'abount', label: 'Sobre' },
  { id: 'stack', label: 'Stack' }, 
  { id: 'certificados', label: 'Certificados' },
  { id: 'projetos', label: 'Projetos' },
];

function Header() {
  const [activeItem, setActiveItem] = useState(null); // Estado para controlar o item ativo
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado para controlar o menu mobile
  const [hoveredItem, setHoveredItem] = useState(null); // Estado para controlar o item com hover


  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map((item) => document.getElementById(item.id));
      const currentSection = sections.find((section) => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top >= 0 && rect.top < window.innerHeight * 0.5;
      });
      if (currentSection) {
        setActiveItem(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HeaderContainer>
      {/* Logo */}
      <Logo>
        <LogoText>Daniel A.S.</LogoText>
      </Logo>

      {/* Menu Desktop */}
      <MenuContainer as="nav">
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            href={`#${item.id}`}
            onClick={() => setActiveItem(item.id)}
            isActive={activeItem === item.id}
            aria-current={activeItem === item.id ? 'page' : undefined}
            id={item.id}
            isHovered={hoveredItem}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {item.label}
          </MenuItem>
        ))}
        <DownloadButton>Baixar CV</DownloadButton>
      </MenuContainer>

      {/* Botão Hambúrguer */}
      <HamburgerButton
        isOpen={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <div />
        <div />
        <div />
      </HamburgerButton>

      {/* Menu Mobile */}
      <MobileMenuContainer isOpen={isMobileMenuOpen}>
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            href={`#${item.id}`}
            onClick={() => {
              setActiveItem(item.id);
              setIsMobileMenuOpen(false); // Fecha o menu após clicar em um item
            }}
            isActive={activeItem === item.id}
            aria-current={activeItem === item.id ? 'page' : undefined}
            id={item.id}
            isHovered={hoveredItem}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {item.label}
          </MenuItem>
        ))}
        <DownloadButton>Baixar CV</DownloadButton>
      </MobileMenuContainer>
    </HeaderContainer>
  );
}

export default Header;