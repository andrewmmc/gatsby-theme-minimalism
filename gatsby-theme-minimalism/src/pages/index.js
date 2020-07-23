import React from 'react';
import { shape } from 'prop-types';
import { Link as GatsbyLink, graphql } from 'gatsby';
import { Icon, Link } from '@chakra-ui/core';

import Bio from 'components/Bio';
import Heading from 'components/Heading';
import Layout from 'components/Layout';
import Seo from 'components/Seo';
import PostList from 'templates/postList';

const Index = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;
  return (
    <Layout>
      <Seo keywords={data.site.siteMetadata.seoKeywords} />
      <Bio mb={12} />
      <Heading as="h2" size="lg" mb={6}>
        Latest blog posts
      </Heading>
      <PostList
        posts={posts}
        showSearchFilter={false}
        showCategoryFilter={false}
      />
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
