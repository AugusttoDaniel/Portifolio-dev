import React from 'react';
import styled from 'styled-components';

const AvailabilityButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem; /* Espaçamento interno */
  font-family: 'Inter', sans-serif; /* Fonte principal */
  font-size: 1rem; /* Tamanho do texto */
  color: ${(props) => props.textColor || '#ffffff'}; /* Cor do texto (default branco) */
  background-color: ${(props) => props.backgroundColor || '#1a1a1a'}; /* Cor de fundo (default escuro) */
  border: none; /* Sem borda */
  border-radius: 999px; /* Borda arredondada */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Sombra leve */
  cursor: pointer; /* Cursor de ponteiro ao passar o mouse */
  transition: all 0.3s ease; /* Transição suave */
  overflow: hidden; /* Oculta o texto que sai dos limites */
  position: relative;

  &:hover {
    background-color: ${(props) => props.hoverColor || props.backgroundColor}; /* Altera o fundo ao passar o mouse */
    color: ${(props) => props.hoverTextColor || props.textColor}; /* Altera o texto ao passar o mouse */
  }

  @media (max-width: 768px) {
    font-size: 0.8rem; /* Tamanho do texto reduzido em telas menores */
    padding: 0.4rem 0.8rem; /* Espaçamento interno reduzido em telas menores */
    width: 100%; /* Largura total em telas menores */
    max-width: 200px; /* Largura máxima */
    border-radius: 999px; /* Borda arredondada */
    margin-top: 1rem; /* Espaçamento superior */
}
`;

const AnimatedText = styled.span`

  display: inline-flex;
  white-space: nowrap;
  animation: slideRight 10s linear infinite;
    align-items: center; /* Centraliza verticalmente */


  @keyframes slideRight {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;

const AvailabilityButtonComponent = ({ icon: Icon, message, backgroundColor, textColor, hoverColor, hoverTextColor }) => {
  return (
    <AvailabilityButton
      backgroundColor={backgroundColor}
      textColor={textColor}
      hoverColor={hoverColor}
      hoverTextColor={hoverTextColor}
    >
      <AnimatedText>
        {Icon && typeof Icon === 'function' && (
          <Icon size={20} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
        )}
        {message}
      </AnimatedText>
    </AvailabilityButton>
  );
};

export default AvailabilityButtonComponent;