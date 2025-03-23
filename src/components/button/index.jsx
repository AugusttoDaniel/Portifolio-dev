import React from 'react';
import styled from 'styled-components';

// Componente estilizado com props dinâmicas
const StyledButton = styled.button`
  /* Estilos base */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ${(props) => props.fontFamily || 'Inter, sans-serif'}; /* Fonte principal */
  font-size: ${(props) => props.fontSize || '1rem'}; /* Tamanho do texto */
  font-weight: ${(props) => props.fontWeight || 'normal'}; /* Peso da fonte */
  color: ${(props) => props.textColor || '#ffffff'}; /* Cor do texto */
  background-color: ${(props) => props.backgroundColor || '#007bff'}; /* Cor de fundo */
  border: ${(props) => props.border || 'none'}; /* Borda */
  border-radius: ${(props) => props.borderRadius || '8px'}; /* Raio da borda */
  padding: ${(props) => props.padding || '0.5rem 1rem'}; /* Espaçamento interno */
  margin: ${(props) => props.margin || '0'}; /* Margem externa */
  cursor: pointer; /* Cursor de ponteiro ao passar o mouse */
  transition: all 0.3s ease; /* Transição suave */

  /* Efeito hover */
  &:hover {
    background-color: ${(props) => props.hoverBackgroundColor || props.backgroundColor};
    color: ${(props) => props.hoverTextColor || props.textColor};
    transform: ${(props) => props.hoverTransform || 'scale(1.05)'};
    box-shadow: ${(props) => props.hoverShadow || '0 4px 6px rgba(0, 0, 0, 0.1)'};
  }

  /* Efeito ativo (pressionado) */
  &:active {
    transform: ${(props) => props.activeTransform || 'scale(0.95)'};
  }

  /* Ícone (se fornecido) */
  svg {
    margin-right: ${(props) => (props.icon ? '0.5rem' : '0')}; /* Espaçamento entre ícone e texto */
    width: ${(props) => props.iconSize || '20px'};
    height: ${(props) => props.iconSize || '20px'};
    fill: ${(props) => props.iconColor || props.textColor};
  }
`;

// Componente Principal
// Componente Principal
const Button = ({
  children,
  icon: Icon,
  backgroundColor,
  textColor,
  hoverBackgroundColor,
  hoverTextColor,
  fontSize,
  fontWeight,
  fontFamily,
  padding,
  margin,
  borderRadius,
  border,
  hoverTransform,
  activeTransform,
  hoverShadow,
  iconSize,
  iconColor,
  onClick, // Adicione a prop onClick aqui
  ...restProps // Para capturar qualquer outra prop não listada
}) => {
  return (
      <StyledButton
          backgroundColor={backgroundColor}
          textColor={textColor}
          hoverBackgroundColor={hoverBackgroundColor}
          hoverTextColor={hoverTextColor}
          fontSize={fontSize}
          fontWeight={fontWeight}
          fontFamily={fontFamily}
          padding={padding}
          margin={margin}
          borderRadius={borderRadius}
          border={border}
          hoverTransform={hoverTransform}
          activeTransform={activeTransform}
          hoverShadow={hoverShadow}
          iconSize={iconSize}
          iconColor={iconColor}
          onClick={onClick} // Passe a prop onClick aqui
          {...restProps} // Espalhe quaisquer outras props
      >
          {/* Renderiza o ícone se for fornecido */}
          {Icon && <Icon />}
          {children}
      </StyledButton>
  );
};

export default Button;