/* eslint-disable react/no-danger */
import React from 'react';
import { shape } from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import Layout from 'components/Layout';
import Seo from 'components/Seo';
import Thumbnail from 'components/Thumbnail';
import useThemeConfig from 'hooks/useThemeConfig';
import { Main } from 'themes/styles';

const About = ({ data }) => {
  const post = data.markdownRemark;
  const { mapId } = useThemeConfig();
  return (
    <Layout
      cover={<Thumbnail fluid={data.featuredImage.childImageSharp.fluid} />}
    >
      <Seo title={post.frontmatter.title} description={post.excerpt} />
      <Main>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        {mapId && (
          <StyledIframe
            src={`//www.google.com/maps/d/u/1/embed?mid=${mapId}&hl=en`}
          />
        )}
      </Main>
    </Layout>
  );
};

About.propTypes = {
  data: shape({}).isRequired,
};

const StyledIframe = styled.iframe`
  border: none;
  margin: 0 auto;
  width: 100%;
  height: 280px;
`;

export default About;

export const pageQuery = graphql`
  query {
    featuredImage: file(
      sourceInstanceName: { eq: "assets" }
      relativePath: { eq: "about.jpg" }
    ) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1440) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    markdownRemark(fields: { slug: { eq: "/about/" } }) {
      id
      excerpt(truncate: true)
      html
      frontmatter {
        title
      }
    }
  }
`;
/* eslint-enable react/no-danger */
