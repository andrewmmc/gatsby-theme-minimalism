import React from 'react';
import { shape } from 'prop-types';
import { graphql } from 'gatsby';

import Heading from 'components/Heading';
import Layout from 'components/Layout';
import Seo from 'components/Seo';
import PostList from 'templates/postList';

const Notes = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;
  const categories = data.allMarkdownRemark.group || [];

  return (
    <Layout>
      <Seo title="Notes" />
      <Heading>Notes</Heading>
      <PostList
        posts={posts}
        postCategories={categories}
        searchPlaceholder="Search notes"
        notFoundText="No notes found."
      />
    </Layout>
  );
};

Notes.propTypes = {
  data: shape({}).isRequired,
};

export default Notes;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { fields: { type: { eq: "notes" } } }
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
