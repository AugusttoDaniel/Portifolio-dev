// src/styles/globalStyles.js
import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${theme.typography.fontFamily};
  }


  body {
    font-family: ${theme.typography.fontFamily};
    font-size: ${theme.typography.fontSize.paragraph};
    line-height: ${theme.typography.lineHeight.paragraph};
    color: #333; /* Cor do texto padrão */
    background-color: #f9f9f9; 
  }


  h1 {
    font-size: ${theme.typography.fontSize.h1};
    font-weight: ${theme.typography.fontWeight.regular};
    line-height: ${theme.typography.lineHeight.h1};
  }

  h2 {
    font-size: ${theme.typography.fontSize.h2};
    font-weight: ${theme.typography.fontWeight.regular};
    line-height: ${theme.typography.lineHeight.h2};
  }

  /* Botões */
  button {
    font-size: ${theme.typography.fontSize.button};
    font-weight: ${theme.typography.fontWeight.regular};
    line-height: ${theme.typography.lineHeight.button};
  }

  .article {
    font-size: ${theme.typography.fontSize.article};
    font-weight: ${theme.typography.fontWeight.light};
    line-height: ${theme.typography.lineHeight.article};
  }

  /* Parágrafos */
  p {
    font-size: ${theme.typography.fontSize.paragraph};
    font-weight: ${theme.typography.fontWeight.light};
    line-height: ${theme.typography.lineHeight.paragraph};
  }

  /* Labels */
  .label-medium {
    font-size: ${theme.typography.fontSize.labelMedium};
    font-weight: ${theme.typography.fontWeight.medium};
    line-height: ${theme.typography.lineHeight.labelMedium};
  }

  .label-light {
    font-size: ${theme.typography.fontSize.labelLight};
    font-weight: ${theme.typography.fontWeight.light};
    line-height: ${theme.typography.lineHeight.labelLight};
  }
`;