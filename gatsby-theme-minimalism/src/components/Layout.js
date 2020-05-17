import React from 'react';
import { node } from 'prop-types';
import styled from 'styled-components';

import { GlobalStyle } from 'themes/styles';
import useThemeConfig from 'hooks/useThemeConfig';

import Header from './Header';
import HeaderCompact from './HeaderCompact';
import Footer from './Footer';

import { Container } from 'themes/styles';

const Layout = ({ cover, children, ...props }) => {
  const { compactMode } = useThemeConfig();
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        {compactMode ? <HeaderCompact /> : <Header />}
        {cover}
        <Container as="main" {...props}>
          {children}
        </Container>
        <Footer />
      </Wrapper>
    </>
  );
};

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
