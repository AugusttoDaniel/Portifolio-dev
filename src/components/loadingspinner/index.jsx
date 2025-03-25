import React from 'react';
import styled, { keyframes } from 'styled-components';

// Spinning animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Pulse animation
const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
`;

const SpinnerContainer = styled.div`
  display: flex;
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
  animation: 
    ${spin} 1.5s linear infinite,
    ${pulse} 1.5s ease-in-out infinite;
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

const LoadingSpinner = () => {
  return (
    <SpinnerContainer>
      <div style={{ textAlign: 'center' }}>
        <Spinner />
        <LoadingText>Carregando...</LoadingText>
      </div>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;