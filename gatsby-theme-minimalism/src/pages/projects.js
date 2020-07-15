import React from 'react';
import { shape } from 'prop-types';
import { Link as GatsbyLink, graphql } from 'gatsby';
import { Box, Link, Grid } from '@chakra-ui/core';
import Container from 'components/Container';
import Card from 'components/Card';
import Heading from 'components/Heading';
import Layout from 'components/Layout';
import Seo from 'components/Seo';

const Projects = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;
  return (
    <Layout withContainer={false}>
      <Seo title="Projects" />
      <Container maxW="4xl">
        <Box maxW="2xl" m="0 auto" px={[, 4]}>
          <Heading>Projects</Heading>
        </Box>
        <Grid
          gridTemplateColumns={['1fr', '1fr 1fr 1fr']}
          gridTemplateRows={['1fr 1fr 1fr', '1fr']}
          gap={4}
          mb={8}
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
      </Container>
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
