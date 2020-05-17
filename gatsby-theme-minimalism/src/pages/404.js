import React from 'react';
import { shape } from 'prop-types';
import { graphql, Link } from 'gatsby';

import BasePage from 'templates/basePage';
import Thumbnail from 'components/Thumbnail';

const NotFound = ({ data }) => (
  <BasePage
    title="404 找不到網頁"
    thumbnail={<Thumbnail fluid={data.featuredImage.childImageSharp.fluid} />}
  >
    <>
      <p>抱歉，所指定的頁面無法在伺服器上找到...</p>
      <Link to="/">返回主頁</Link>
    </>
  </BasePage>
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
        fluid(quality: 90, maxWidth: 1440) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
