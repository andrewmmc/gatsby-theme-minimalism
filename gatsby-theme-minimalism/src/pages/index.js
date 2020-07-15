import React from 'react';
import { shape } from 'prop-types';
import { Link as GatsbyLink, graphql } from 'gatsby';
import { Heading, Icon, Link, Grid } from '@chakra-ui/core';
import Bio from 'components/Bio';
import Container from 'components/Container';
import Card from 'components/Card';
import Layout from 'components/Layout';
import Seo from 'components/Seo';

const Index = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;
  return (
    <Layout withContainer={false}>
      <Seo keywords={data.site.siteMetadata.seoKeywords} />
      <Container>
        <Bio />
      </Container>
      <Container maxW="4xl" textAlign="center">
        <Heading as="h3" size="lg" mb={8}>
          From the blog
        </Heading>
        <Grid
          gridTemplateColumns={['1fr', '1fr 1fr 1fr']}
          gridTemplateRows={['1fr 1fr 1fr', '1fr']}
          gap={4}
          mb={8}
        >
          {posts.map(({ node }, idx) => {
            const title = node.frontmatter.title || node.fields.slug;
            const { date, featuredImage } = node.frontmatter;
            const { readingTime } = node.fields;
            return (
              <Link
                as={GatsbyLink}
                to={node.fields.slug}
                rounded="lg"
                shadow="sm"
                _hover={{ shadow: 'md' }}
                key={`blog_post_${idx}`}
              >
                <Card
                  date={date}
                  readingTime={readingTime.text}
                  title={title}
                  {...(!!featuredImage && {
                    featuredImage: featuredImage.childImageSharp,
                  })}
                />
              </Link>
            );
          })}
        </Grid>
        <Link as={GatsbyLink} to="/blog" color="primary.500">
          View More
          <Icon name="chevron-right" ml="1" />
        </Link>
      </Container>
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
      limit: 3
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
    site {
      siteMetadata {
        seoKeywords
      }
    }
  }
`;
