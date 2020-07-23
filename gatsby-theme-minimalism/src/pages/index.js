import React from 'react';
import { shape } from 'prop-types';
import { Link as GatsbyLink, graphql } from 'gatsby';
import { Icon, Link, List, ListItem, Stack, Text } from '@chakra-ui/core';
import Bio from 'components/Bio';
import Heading from 'components/Heading';
import Layout from 'components/Layout';
import Seo from 'components/Seo';

const Index = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;
  return (
    <Layout>
      <Seo keywords={data.site.siteMetadata.seoKeywords} />
      <Bio mb={12} />
      <Heading as="h2" size="lg" mb={6}>
        Latest blog posts
      </Heading>
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
      <Link as={GatsbyLink} to="/blog" color="primary.500">
        Other Posts
        <Icon name="chevron-right" ml="1" />
      </Link>
    </Layout>
  );
};

Index.propTypes = {
  data: shape({}).isRequired,
};

export default Index;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { fields: { type: { eq: "blog" } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 5
    ) {
      edges {
        node {
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
    site {
      siteMetadata {
        seoKeywords
      }
    }
  }
`;
