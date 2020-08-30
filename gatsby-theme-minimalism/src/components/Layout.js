import React from 'react';
import { node, bool } from 'prop-types';
import { ThemeProvider, CSSReset, Box } from '@chakra-ui/core';

import { customTheme } from '../themes/styles';
import Container from './Container';

// https://github.com/chakra-ui/chakra-ui/blob/%40chakra-ui/core%400.8.0/packages/chakra-ui/src/CSSReset/index.js#L6
const defaultConfig = (theme) => ({
  light: {
    color: theme.colors.gray[800],
    bg: theme.colors.white,
    borderColor: theme.colors.gray[200],
    placeholderColor: theme.colors.gray[400],
  },
  dark: {
    color: theme.colors.whiteAlpha[900],
    bg: theme.colors.gray[800],
    borderColor: theme.colors.whiteAlpha[300],
    placeholderColor: theme.colors.whiteAlpha[400],
  },
});

const Layout = ({ withContainer = true, children, ...props }) =>
  withContainer ? (
    <Container tabindex="-1" as="main" {...props}>
      {children}
    </Container>
  ) : (
    children
  );

export const GlobalStyle = ({ children, ...props }) => {
  return (
    <ThemeProvider theme={customTheme} {...props}>
      <CSSReset config={defaultConfig} />
      <Box minWidth="min-content" minHeight="100vh">
        {children}
      </Box>
    </ThemeProvider>
  );
};

Layout.defaultProps = {
  withContainer: true,
};

Layout.propTypes = {
  withContainer: bool,
  children: node.isRequired,
};

export default Layout;
