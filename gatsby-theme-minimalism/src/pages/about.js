/* eslint-disable react/no-danger */
import React from 'react';
import { shape } from 'prop-types';
import { graphql } from 'gatsby';

import Content from 'components/Content';
import Heading from 'components/Heading';
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
      <Heading>{post.frontmatter.title}</Heading>
      <Content htmlAst={post.htmlAst} />
      {mapId && (
        <iframe
          src={`//www.google.com/maps/d/u/1/embed?mid=${mapId}&hl=en`}
          style={{
            border: 'none',
            margin: '0 auto',
            width: '100%',
            height: '280px',
          }}
        />
      )}
    </Layout>
  );
};

About.propTypes = {
  data: shape({}).isRequired,
};

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
      htmlAst
      frontmatter {
        title
      }
    }
  }
`;
/* eslint-enable react/no-danger */
