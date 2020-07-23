import React from 'react';
import { node, bool } from 'prop-types';
import { Box } from '@chakra-ui/core';

import Header from './Header';
import Container from './Container';
import Footer from './Footer';

const Layout = ({ cover, withContainer = true, children, ...props }) => (
  <Box bg="gray.50" minHeight="100vh">
    <Header />
    {cover}
    {withContainer ? (
      <Container tabindex="-1" as="main" {...props}>
        {children}
      </Container>
    ) : (
      children
    )}
    <Footer />
  </Box>
);

Layout.defaultProps = {
  cover: null,
  withContainer: true,
};

Layout.propTypes = {
  cover: node,
  withContainer: bool,
  children: node.isRequired,
};

export default Layout;
