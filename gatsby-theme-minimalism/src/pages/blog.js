import React from 'react';
import { shape } from 'prop-types';
import { Link as GatsbyLink, graphql } from 'gatsby';
import { Link, List, ListItem, Text, Stack } from '@chakra-ui/core';
import Heading from 'components/Heading';
import Layout from 'components/Layout';
import Seo from 'components/Seo';

const Blog = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;
  return (
    <Layout>
      <Seo title="Blog" />
      <Heading>Blog</Heading>
      <List mb={4}>
        {posts.map(({ node }, idx) => {
          const title = node.frontmatter.title || node.fields.slug;
          const { date } = node.frontmatter;
          const { readingTime } = node.fields;
          return (
            <ListItem mb={6} key={`blog_post_${idx}`}>
              <Stack spacing={1}>
                <Stack isInline spacing={4} color="gray.500" fontSize="sm">
                  <Text as="time">{date}</Text>
                  <Text as="span">{readingTime.text}</Text>
                </Stack>
                <Heading as="h3" size="md">
                  <Link as={GatsbyLink} to={node.fields.slug}>
                    {title}
                  </Link>
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
    allMarkdownRemark(
      filter: { fields: { type: { eq: "blog" } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1000
    ) {
      edges {
        node {
          excerpt(truncate: true)
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`;
