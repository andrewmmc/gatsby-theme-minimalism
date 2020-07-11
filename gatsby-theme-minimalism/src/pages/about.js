/* eslint-disable react/no-danger */
import React from 'react';
import { shape } from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import { Heading } from '@chakra-ui/core';

import { BackgroundImage } from 'components/Image';
import Layout from 'components/Layout';
import Seo from 'components/Seo';
import useThemeConfig from 'hooks/useThemeConfig';

const About = ({ data }) => {
  const post = data.markdownRemark;
  const { mapId } = useThemeConfig();
  return (
    <Layout
      cover={
        <BackgroundImage fluid={data.featuredImage.childImageSharp.fluid} />
      }
    >
      <Seo title={post.frontmatter.title} description={post.excerpt} />
      <Heading as="h1">{post.frontmatter.title}</Heading>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      {mapId && (
        <StyledIframe
          src={`//www.google.com/maps/d/u/1/embed?mid=${mapId}&hl=en`}
        />
      )}
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
        fluid(quality: 90, maxWidth: 1920) {
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
