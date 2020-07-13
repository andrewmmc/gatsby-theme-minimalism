import React from 'react';
import { node } from 'prop-types';
import { Box } from '@chakra-ui/core';

import Header from './Header';
import Container from './Container';
import Footer from './Footer';

const Layout = ({ cover, children, ...props }) => (
  <Box bg="gray.50">
    <Header />
    {cover}
    <Container tabindex="-1" as="main" {...props}>
      {children}
    </Container>
    <Footer />
  </Box>
);

Layout.defaultProps = {
  cover: null,
};

Layout.propTypes = {
  cover: node,
  children: node.isRequired,
};

export default Layout;
