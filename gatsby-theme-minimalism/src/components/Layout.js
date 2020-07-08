import React from 'react';
import { node } from 'prop-types';
import styled from 'styled-components';

import Header from './Header';
import Footer from './Footer';

const Layout = ({ cover, children, ...props }) => (
  <>
    <Wrapper>
      <Header />
      {cover}
      <div id="main-content" tabindex="-1" {...props}>
        {children}
      </div>
      <Footer />
    </Wrapper>
  </>
);

Layout.defaultProps = {
  cover: null,
};

Layout.propTypes = {
  cover: node,
  children: node.isRequired,
};

const Wrapper = styled.div``;

export default Layout;
