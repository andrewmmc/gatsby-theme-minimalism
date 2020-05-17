import React from 'react';
import { string, node } from 'prop-types';
import styled from 'styled-components';

import Layout from 'components/Layout';
import Seo from 'components/Seo';

const BasePage = ({ thumbnail, title, children }) => (
  <Layout cover={thumbnail}>
    <Seo title={title} />
    <Main>
      <h1>{title}</h1>
      {children}
    </Main>
  </Layout>
);

BasePage.propTypes = {
  thumbnail: node,
  title: string.isRequired,
  children: node.isRequired,
};

BasePage.defaultProps = {
  thumbnail: undefined,
};

const Main = styled.div`
  margin: 2rem 0;
`;

export default BasePage;
