import React from 'react';
import styled from 'styled-components';

// Styled button con props transitorias (prefijo $)
const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${({ $backgroundColor = '#1a1a1a' }) => $backgroundColor};
  color: ${({ $textColor = '#ffffff' }) => $textColor};
  font-size: ${({ $fontSize = '1rem' }) => $fontSize};
  font-weight: ${({ $fontWeight = '500' }) => $fontWeight};
  font-family: ${({ $fontFamily = 'inherit' }) => $fontFamily};
  padding: ${({ $padding = '0.5rem 1rem' }) => $padding};
  margin: ${({ $margin = '0' }) => $margin};
  border-radius: ${({ $borderRadius = '8px' }) => $borderRadius};
  border: ${({ $border = 'none' }) => $border};

  &:hover {
    background-color: ${({ $hoverBackgroundColor, $backgroundColor }) => 
      $hoverBackgroundColor || $backgroundColor};
    color: ${({ $hoverTextColor, $textColor }) => $hoverTextColor || $textColor};
    transform: ${({ $hoverTransform = 'scale(1.05)' }) => $hoverTransform};
    box-shadow: ${({ $hoverShadow = '0 4px 6px rgba(0, 0, 0, 0.1)' }) => $hoverShadow};
  }

  &:active {
    transform: ${({ $activeTransform = 'scale(0.95)' }) => $activeTransform};
  }

  svg {
    width: ${({ $iconSize = '20px' }) => $iconSize};
    height: ${({ $iconSize = '20px' }) => $iconSize};
    fill: ${({ $iconColor, $textColor = '#ffffff' }) => $iconColor || $textColor};
  }
`;

const Button = ({
  children,
  icon,
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
  onClick,
  ...restProps
}) => {
  const Icon = icon; 
  
  return (
    <StyledButton
      $backgroundColor={backgroundColor}
      $textColor={textColor}
      $hoverBackgroundColor={hoverBackgroundColor}
      $hoverTextColor={hoverTextColor}
      $fontSize={fontSize}
      $fontWeight={fontWeight}
      $fontFamily={fontFamily}
      $padding={padding}
      $margin={margin}
      $borderRadius={borderRadius}
      $border={border}
      $hoverTransform={hoverTransform}
      $activeTransform={activeTransform}
      $hoverShadow={hoverShadow}
      $iconSize={iconSize}
      $iconColor={iconColor}
      onClick={onClick}
      {...restProps}
    >
      {Icon && <Icon />}
      {children}
    </StyledButton>
  );
};

export default Button;