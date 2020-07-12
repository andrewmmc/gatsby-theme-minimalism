/* eslint-disable react/no-danger */
import React from 'react';
import { shape } from 'prop-types';
import { Link, graphql } from 'gatsby';
import { Heading, List, ListItem, Text, Stack } from '@chakra-ui/core';

import { BackgroundImage } from 'components/Image';
import Layout from 'components/Layout';
import Seo from 'components/Seo';

const Blog = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;
  return (
    <Layout
      cover={
        <BackgroundImage fluid={data.featuredImage.childImageSharp.fluid} />
      }
    >
      <Seo title="Blog" />
      <Heading as="h1" size="2xl" mb={8}>
        Blog
      </Heading>
      <List mb={4}>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          const { date } = node.frontmatter;
          return (
            <ListItem mb={6}>
              <Stack spacing={1}>
                <Text as="time" color="gray.500" fontSize="sm">
                  {date}
                </Text>
                <Heading as="h3" size="md">
                  <Link to={node.fields.slug}>{title}</Link>
                </Heading>
              </Stack>
            </ListItem>
          );
        })}
      </List>
    </Layout>
  );
};

Blog.propTypes = {
  data: shape({}).isRequired,
};

export default Blog;

export const pageQuery = graphql`
  query {
    featuredImage: file(
      sourceInstanceName: { eq: "assets" }
      relativePath: { eq: "home.jpg" }
    ) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    allMarkdownRemark(
      filter: { fields: { type: { eq: "blog" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt(truncate: true)
          fields {
            slug
            type
            readingTime {
              text
            }
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            category
            featuredImage {
              childImageSharp {
                fluid(quality: 90, maxWidth: 680) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;
/* eslint-enable react/no-danger */