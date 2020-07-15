/* eslint-disable react/no-danger */
import React from 'react';
import { shape } from 'prop-types';
import { Link as GatsbyLink, graphql } from 'gatsby';
import {
  Box,
  Button,
  Heading,
  Icon,
  List,
  ListItem,
  Link,
  Text,
  SimpleGrid,
  Grid,
  Stack,
  PseudoBox,
} from '@chakra-ui/core';

// import Bio from 'components/Bio';
import Container from 'components/Container';
import { BackgroundImage, FeatureImage } from 'components/Image';
import Layout from 'components/Layout';
import Seo from 'components/Seo';
//                 <FeatureImage
// fluid={
//   firstPost.node.frontmatter.featuredImage.childImageSharp
//     .fluid
// }
// />
const Index = ({ data }) => {
  // const { showIntro } = useThemeConfig();
  const posts = data.allMarkdownRemark.edges;
  return (
    <Layout
      cover={
        <BackgroundImage fluid={data.featuredImage.childImageSharp.fluid} />
      }
      withContainer={false}
    >
      <Seo keywords={data.site.siteMetadata.seoKeywords} />
      <Container tabindex="-1" as="main" maxW="4xl">
        <Box maxW="2xl" m="0 auto" w="100%">
          <Heading as="h3" size="lg" mb={8}>
            Recent blog posts
          </Heading>
        </Box>
        <Grid
          gridTemplateColumns={['1fr', '1fr 1fr 1fr']}
          gridTemplateRows={['1fr 1fr 1fr', '1fr']}
          gap={4}
          mb={8}
        >
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug;
            const { date } = node.frontmatter;
            const { readingTime } = node.fields;
            return (
              <Link
                as={GatsbyLink}
                to={node.fields.slug}
                shadow="sm"
                rounded="lg"
                bg="white"
                _hover={{ shadow: 'md' }}
              >
                <Box overflow="hidden" p={4}>
                  <Stack spacing={1}>
                    <Stack isInline spacing={4} color="gray.500" fontSize="sm">
                      <Text as="time">{date}</Text>
                      <Text as="span">{readingTime.text}</Text>
                    </Stack>
                    <Heading as="h3" size="md">
                      {title}
                    </Heading>
                  </Stack>
                </Box>
              </Link>
            );
          })}
        </Grid>
        <Box maxW="2xl" m="0 auto" w="100%">
          <Button as={GatsbyLink} to="/blog" variant="ghost">
            View More
            <Icon name="chevron-right" ml="1" />
          </Button>
        </Box>
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
      limit: 3
    ) {
      edges {
        node {
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
    site {
      siteMetadata {
        seoKeywords
      }
    }
  }
`;
/* eslint-enable react/no-danger */
