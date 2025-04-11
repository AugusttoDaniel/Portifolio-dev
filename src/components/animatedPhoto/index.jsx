import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";


const rotate = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(5deg); }
  50% { transform: rotate(0deg); }
  75% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
  50% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0.1); }
  100% { box-shadow: 0 0 0 20px rgba(16, 185, 129, 0); }
`;

// Container principal com posicionamento relativo
const PhotoContainer = styled.div`
  position: relative;
  aspect-ratio: 1/1;
  max-width: 400px;
  margin: 0 auto;
`;

// Efeito de gradiente desfocado
const BlurGradient = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 1rem;
  background: linear-gradient(to right, rgb(16, 185, 129), rgb(20, 184, 166));
  opacity: 0.2;
  filter: blur(16px);
`;

// Borda do container
const BorderContainer = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 1rem;
  border: 1px solid rgba(16, 185, 129, 0.2);
`;

// Container da imagem com animação de rotação
const ImageContainer = styled.div`
  position: relative;
  z-index: 10;
  animation: ${rotate} 10s infinite ease-in-out;
  transition: opacity 0.5s ease-in-out;
`;

// Efeito de pulso ao redor da imagem
const PulseEffect = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 1rem;
  z-index: 0;
  animation: ${pulse} 2s infinite;
`;

// Componente principal
export const AnimatedPhoto = ({
  src = "",
  alt = "Profile Photo",
  width = 400,
  height = 400,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Função para verificar se o elemento está visível na viewport
    const checkVisibility = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom >= 0;

      if (isInView) {
        setIsVisible(true);
      }
    };

    // Verificar visibilidade inicial
    checkVisibility();

    // Adicionar event listener para scroll
    window.addEventListener("scroll", checkVisibility);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", checkVisibility);
    };
  }, []);

  return (
    <PhotoContainer ref={containerRef}>
      <BlurGradient />
      <BorderContainer />
      <ImageContainer isVisible={isVisible}>
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          style={{
            borderRadius: "0.5rem",
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />
      </ImageContainer>
      <PulseEffect />
    </PhotoContainer>
  );
};

export default AnimatedPhoto;