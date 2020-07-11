/* eslint-disable react/no-danger */
import React from 'react';
import { shape } from 'prop-types';
import { graphql } from 'gatsby';
import { Heading } from '@chakra-ui/core';

import { BackgroundImage } from 'components/Image';
import Layout from 'components/Layout';
import Seo from 'components/Seo';

const Projects = ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout
      cover={
        <BackgroundImage fluid={data.featuredImage.childImageSharp.fluid} />
      }
    >
      <Seo title={post.frontmatter.title} description={post.excerpt} />
      <Heading as="h1">{post.frontmatter.title}</Heading>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </Layout>
  );
};

Projects.propTypes = {
  data: shape({}).isRequired,
};

export default Projects;

export const pageQuery = graphql`
  query {
    featuredImage: file(
      sourceInstanceName: { eq: "assets" }
      relativePath: { eq: "projects.jpg" }
    ) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    markdownRemark(fields: { slug: { eq: "/projects/" } }) {
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
