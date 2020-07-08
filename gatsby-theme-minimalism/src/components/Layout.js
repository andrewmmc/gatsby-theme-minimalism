import React from 'react';
import { node } from 'prop-types';

import Header from './Header';
import Footer from './Footer';

const Layout = ({ cover, children, ...props }) => (
  <>
    <Header />
    {cover}
    <main tabindex="-1" {...props}>
      {children}
    </main>
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
