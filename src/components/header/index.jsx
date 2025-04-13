import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${(props) => props.theme.colors.bgheader};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(255, 255, 255, 0.1);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    flex-grow: 1;
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
    display: none;
  }
`;

const MenuItem = styled.a`
  font-size: 1rem;
  color: white;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  opacity: ${(props) => (props.$isActive ? '1' : '0.7')};
  transition: opacity 0.3s ease, filter 0.3s ease;

  ${({ $isHovered, id }) =>
    $isHovered && id !== $isHovered
      ? 'filter: blur(1px); opacity: 0.5;'
      : 'filter: blur(0);'}

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
      transform: scaleX(${(props) => (props.$isActive ? '1' : '0')});
      transform-origin: ${(props) => (props.$isActive ? 'left' : 'right')};
      transition: transform 2s ease;
    }

    &:hover::after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
`;

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
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
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
    background-color: ${(props) =>
      props.$isOpen ? props.theme.colors.html : props.theme.colors.white};
    transition: all 0.3s ease;

    &:nth-child(1) {
      transform: ${(props) =>
        props.$isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'};
    }

    &:nth-child(2) {
      opacity: ${(props) => (props.$isOpen ? '0' : '1')};
    }

    &:nth-child(3) {
      transform: ${(props) =>
        props.$isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'};
    }
  }
`;

const MobileMenuContainer = styled.div`
  display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.colors.bg1};
  padding: 1rem;
  gap: 1rem;
  z-index: 999;
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
  { id: 'about', label: 'Sobre' },
  { id: 'stack', label: 'Stack' },
  { id: 'certificados', label: 'Certificados' },
  { id: 'projetos', label: 'Projetos' },
];

function Header() {
  const [activeItem, setActiveItem] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  // Função para navegar suavemente até o elemento
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveItem(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = document.querySelector('header').offsetHeight;
      const buffer = 5;
      let found = false;
      for (let i = menuItems.length - 1; i >= 0; i--) {
        const section = document.getElementById(menuItems[i].id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= headerHeight + buffer && rect.bottom > headerHeight) {
            setActiveItem(menuItems[i].id);
            found = true;
            break;
          }
        }
      }
      if (!found && window.scrollY < 100) {
        setActiveItem('home');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownload = () => {
    window.open("https://drive.google.com/uc?export=download&id=1IA3T5Ks_PnpFMjxy-W0H58_g3QC28N9w", "_blank");
  };

  return (
    <HeaderContainer>
      <Logo>
        <LogoText>Daniel A.S.</LogoText>
      </Logo>

      <MenuContainer as="nav">
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault(); 
              scrollToSection(item.id);
              setIsMobileMenuOpen(false);
            }}
            $isActive={activeItem === item.id}
            aria-current={activeItem === item.id ? 'page' : undefined}
            id={`nav-${item.id}`}
            $isHovered={hoveredItem}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {item.label}
          </MenuItem>
        ))}
        <DownloadButton onClick={handleDownload}>Baixar CV</DownloadButton>
      </MenuContainer>

      <HamburgerButton
        $isOpen={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <div />
        <div />
        <div />
      </HamburgerButton>

      <MobileMenuContainer $isOpen={isMobileMenuOpen}>
        {menuItems.map((item) => (
          <MenuItem
            key={`mobile-${item.id}`}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(item.id);
              setIsMobileMenuOpen(false);
            }}
            $isActive={activeItem === item.id}
            aria-current={activeItem === item.id ? 'page' : undefined}
            id={`mobile-nav-${item.id}`}
            $isHovered={hoveredItem}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {item.label}
          </MenuItem>
        ))}
        <DownloadButton onClick={handleDownload}>Baixar CV</DownloadButton>
      </MobileMenuContainer>
    </HeaderContainer>
  );
}

export default Header;