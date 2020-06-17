import React from 'react';
import { node } from 'prop-types';
import styled from 'styled-components';

import { GlobalStyle, Container } from 'themes/styles';

import Header from './Header';
import Footer from './Footer';

const Layout = ({ cover, children, ...props }) => (
  <>
    <GlobalStyle />
    <Wrapper>
      <Header />
      {cover}
      <Container as="main" id="main-content" tabindex="-1" {...props}>
        {children}
      </Container>
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export default Layout;
