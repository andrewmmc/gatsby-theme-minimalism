import React from 'react';
import { node } from 'prop-types';

import Header from './Header';
import Container from './Container';
import Footer from './Footer';

const Layout = ({ cover, children, ...props }) => (
  <>
    <Header />
    {cover}
    <Container tabindex="-1" as="main" {...props}>
      {children}
    </Container>
    <Footer />
  </>
);

Layout.defaultProps = {
  cover: null,
};

Layout.propTypes = {
  cover: node,
  children: node.isRequired,
};

export default Layout;
