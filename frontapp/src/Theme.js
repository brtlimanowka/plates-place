import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    background: '#222',
    backgroundLighter: '#333',
    font: '#ddd',
    spinner: '#f17104',
    icon: '#66d9ff',
    buttonFont: '#242527',
    buttonPrimaryBackground: '#66d9ff',
    buttonSecondaryBackground: '#b3ecff',
    errorBackground: '#df4e00',
    disabled: '#bbb',
  },
  font: 'Be Vietnam Pro',
};

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 10px;
  }
  body {
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.color};
    font-family: ${(props) => props.fontFamily};
  }
`;

const Theme = (props) => {
  return (
    <ThemeProvider theme={theme}>
      {props.children}
      <GlobalStyle
        backgroundColor={theme.colors.background}
        color={theme.colors.font}
        fontFamily={theme.font}
      />
    </ThemeProvider>
  );
};

export default Theme;
