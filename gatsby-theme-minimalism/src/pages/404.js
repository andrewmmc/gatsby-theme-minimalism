import React from 'react';
import { shape } from 'prop-types';
import { graphql, Link } from 'gatsby';

import { BackgroundImage } from 'components/Image';
import Layout from 'components/Layout';

const NotFound = ({ data }) => (
  <Layout
    cover={<BackgroundImage fluid={data.featuredImage.childImageSharp.fluid} />}
  >
    <Heading as="h1">404 找不到網頁</Heading>
    <p>抱歉，所指定的頁面無法在伺服器上找到...</p>
    <Link to="/">返回主頁</Link>
  </Layout>
);

NotFound.propTypes = {
  data: shape({}).isRequired,
};

export default NotFound;

export const pageQuery = graphql`
  query {
    featuredImage: file(
      sourceInstanceName: { eq: "assets" }
      relativePath: { eq: "404.jpg" }
    ) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
