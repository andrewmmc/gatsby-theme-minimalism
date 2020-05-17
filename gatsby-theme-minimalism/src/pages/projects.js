/* eslint-disable react/no-danger */
import React from 'react';
import { shape } from 'prop-types';
import { graphql } from 'gatsby';

import Layout from 'components/Layout';
import Seo from 'components/Seo';
import Thumbnail from 'components/Thumbnail';
import { Main } from 'themes/styles';

const Projects = ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout
      cover={<Thumbnail fluid={data.featuredImage.childImageSharp.fluid} />}
    >
      <Seo title={post.frontmatter.title} description={post.excerpt} />
      <Main>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </Main>
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
        fluid(quality: 90, maxWidth: 1440) {
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
