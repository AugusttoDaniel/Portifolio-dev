import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { LazyMotion, domAnimation, frame, cancelFrame } from 'framer-motion';
import { ReactLenis, useLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
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
import { SpeedInsights } from '@vercel/speed-insights/react';


const BackToTopContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  opacity: ${props => props.$isVisible ? 1 : 0};
  transform: translateY(${props => props.$isVisible ? '0' : '100px'});
  transition: all 0.3s ease;
  pointer-events: ${props => props.$isVisible ? 'auto' : 'none'};
  cursor: pointer;
`;


function App() {
  const [isVisible, setIsVisible] = useState(false);
  const lenisRef = useRef(null);
  const lenis = useLenis();

  const scrollToTop = () => {
    lenis?.scrollTo(0);
  };

  useEffect(() => {
    function update(data) {
      lenisRef.current?.lenis?.raf(data.timestamp);
    }
    frame.update(update, true);
    return () => cancelFrame(update);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 300);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ReactLenis root options={{ autoRaf: false, anchors: true }} ref={lenisRef}>
        <LazyMotion features={domAnimation} strict>
          <GlobalStyle />
           <Header />
           <DeveloperProfile />
          <AboutMe />
           <Stack />
          <Certification />
          <Projects />
          <Footer />
          <BackToTopContainer $isVisible={isVisible}>
            <Button
              icon={FaArrowUp}
              backgroundColor="#1BA3E8"
              textColor="#FFFFFF"
              hoverBackgroundColor="#0B84C4"
              padding="0.75rem"
              borderRadius="50%"
              onClick={scrollToTop}
              aria-label="Voltar ao topo"
            />
          </BackToTopContainer>
          <SpeedInsights />
        </LazyMotion>
      </ReactLenis>
    </ThemeProvider>
  );
}

export default App;