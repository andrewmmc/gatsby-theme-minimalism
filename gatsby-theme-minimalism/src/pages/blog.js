import React from 'react';
import { shape } from 'prop-types';
import { graphql } from 'gatsby';

import Heading from 'components/Heading';
import Layout from 'components/Layout';
import Seo from 'components/Seo';
import PostList from 'templates/postList';

const Blog = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;
  const categories = data.allMarkdownRemark.group || [];

  return (
    <Layout>
      <Seo title="Blog" />
      <Heading>Blog</Heading>
      <PostList
        posts={posts}
        postCategories={categories}
        searchPlaceholder="Search articles"
        notFoundText="No posts found."
      />
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
            category
          }
        }
      }
      group(field: frontmatter___category) {
        fieldValue
      }
    }
  }
`;
