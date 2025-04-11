import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './styles/globalStyles';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import Header from './components/header';
import Button from './components/button';
import Footer from './components/footer';
import AboutMe from './pages/abountme';
import Stack from './pages/mystacks';
import Certification from './pages/certification';
import Projects from './pages/projects';
import DeveloperProfile from './pages/developerprofile';
import { FaArrowUp } from 'react-icons/fa';



const BackToTopContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '100px'});
  transition: all 0.3s ease;
  pointer-events: ${props => props.isVisible ? 'auto' : 'none'};
  cursor: pointer;
`;

function App() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    const duration = 1000; // Duração total da animação em ms
    const start = window.pageYOffset || document.documentElement.scrollTop;
    const startTime = performance.now();

    // Função de easing: começa lento e acelera (easeOutQuad)
    const easeOutQuad = (t) => 1 - Math.pow(1 - t, 4);

    // Função de animação
    const animateScroll = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const eased = easeOutQuad(progress);

      window.scrollTo(0, start * (1 - eased));

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);

    // Initial check in case page loads already scrolled
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <DeveloperProfile />
      <AboutMe />
      <Stack />
      <Certification />
      <Projects />
      <Footer />
      <BackToTopContainer isVisible={isVisible}>
        <Button
          icon={FaArrowUp}
          backgroundColor="#007bff"
          textColor="#ffffff"
          hoverBackgroundColor="#0056b3"
          padding="0.75rem"
          borderRadius="50%"
          onClick={scrollToTop}
          aria-label="Voltar ao topo"
        />
      </BackToTopContainer>
    </ThemeProvider>
  );
}

export default App;