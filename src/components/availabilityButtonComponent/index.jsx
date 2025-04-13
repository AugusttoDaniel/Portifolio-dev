import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animação separada para melhor organização e reuso
const slideRight = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

const AvailabilityButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: ${(props) => props.$backgroundColor};  /* Alterado para $ */
  color: ${(props) => props.$textColor};  /* Alterado para $ */
  border: none;
  border-radius: 999px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;

  &:hover {
    background-color: ${({ $hoverColor, $backgroundColor = '#1a1a1a' }) => $hoverColor || $backgroundColor};
    color: ${({ $hoverTextColor, $textColor = '#ffffff' }) => $hoverTextColor || $textColor};
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
    width: 100%;
    max-width: 200px;
    margin-top: 1rem;
  }
`;


const AnimatedText = styled.span`
  display: inline-flex;
  white-space: nowrap;
  animation: ${slideRight} 10s linear infinite;
  align-items: center;
`;

const AvailabilityButtonComponent = ({
  icon: Icon,
  message,
  backgroundColor,
  textColor,
  hoverColor,
  hoverTextColor
}) => (
  <AvailabilityButton
    $backgroundColor={backgroundColor}  // Alterado para $
    $textColor={textColor}  // Alterado para $
    $hoverColor={hoverColor}  // Alterado para $
    $hoverTextColor={hoverTextColor}  // Alterado para $
  >
    <AnimatedText>
      {Icon && <Icon size={20} style={{ marginRight: '0.5rem' }} />}
      {message}
    </AnimatedText>
  </AvailabilityButton>
);


export default AvailabilityButtonComponent;
