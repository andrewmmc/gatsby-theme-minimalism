import React from 'react';
import { shape } from 'prop-types';
import { Link as GatsbyLink, graphql } from 'gatsby';
import { Link, Grid } from '@chakra-ui/core';
import Card from 'components/Card';
import Heading from 'components/Heading';
import Layout from 'components/Layout';
import Seo from 'components/Seo';

const Projects = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;
  return (
    <Layout>
      <Seo title="Projects" />
      <Heading>Projects</Heading>
      <Grid
        gridTemplateColumns={['1fr', '1fr 1fr']}
        gridTemplateRows={['1fr 1fr', '1fr']}
        gap={8}
        mt={8}
      >
        {posts.map(({ node }, idx) => {
          const title = node.frontmatter.title || node.fields.slug;
          const { date, featuredImage } = node.frontmatter;
          return (
            <Link
              as={GatsbyLink}
              to={node.fields.slug}
              rounded="lg"
              shadow="sm"
              _hover={{ shadow: 'md' }}
              key={`projects_post_${idx}`}
            >
              <Card
                date={date}
                title={title}
                {...(!!featuredImage && {
                  featuredImage: featuredImage.childImageSharp,
                })}
              />
            </Link>
          );
        })}
      </Grid>
    </Layout>
  );
};

Projects.propTypes = {
  data: shape({}).isRequired,
};

export default Projects;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { fields: { type: { eq: "projects" } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1000
    ) {
      edges {
        node {
          excerpt(truncate: true)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY")
            title
            featuredImage {
              childImageSharp {
                fluid(quality: 95, maxWidth: 479) {
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
