import React from 'react';
import { node, bool } from 'prop-types';
import { ThemeProvider, CSSReset, Box } from '@chakra-ui/core';

import { customTheme } from '../themes/styles';
import Container from './Container';

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
      <CSSReset />
      <Box bg="gray.50" minHeight="100vh">
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
