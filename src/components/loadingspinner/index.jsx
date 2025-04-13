import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animações
const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  50% { transform: scale(1.1); }
`;

// Estilos
const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #0a0a2a, #1a1a4a);
`;

const Spinner = styled.div`
  width: 80px;
  height: 80px;
  border: 10px solid transparent;
  border-top: 10px solid #4e73df;
  border-right: 10px solid #4e73df;
  border-radius: 50%;
  animation: ${spin} 1.5s linear infinite, ${pulse} 1.5s ease-in-out infinite;
  box-shadow:
    0 0 20px rgba(78, 115, 223, 0.5),
    inset 0 0 20px rgba(78, 115, 223, 0.3);
`;

const LoadingText = styled.div`
  margin-top: 20px;
  color: white;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  opacity: 0.7;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const LoadingSpinner = () => (
  <SpinnerContainer>
    <Spinner />
    <LoadingText>Carregando...</LoadingText>
  </SpinnerContainer>
);

export default LoadingSpinner;
