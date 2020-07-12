/* eslint-disable react/no-danger */
import React from 'react';
import { shape } from 'prop-types';
import { Link, graphql } from 'gatsby';
import {
  Box,
  Button,
  Heading,
  Icon,
  List,
  ListItem,
  Text,
  SimpleGrid,
  Stack,
} from '@chakra-ui/core';

// import Bio from 'components/Bio';
import { BackgroundImage, FeatureImage } from 'components/Image';
import Layout from 'components/Layout';
import Seo from 'components/Seo';

const Index = ({ data }) => {
  // const { showIntro } = useThemeConfig();
  const posts = data.allMarkdownRemark.edges;
  const [firstPost, ...remainPosts] = posts;
  return (
    <Layout
      cover={
        <BackgroundImage fluid={data.featuredImage.childImageSharp.fluid} />
      }
    >
      <Seo keywords={data.site.siteMetadata.seoKeywords} />
      {/* {showIntro && <Bio />} */}
      <Stack spacing={12}>
        <SimpleGrid columns={[1, 2]} spacing={8}>
          {firstPost.node.frontmatter.featuredImage && (
            <Box>
              <Link
                to={firstPost.node.fields.slug}
                aria-label={firstPost.node.frontmatter.title}
              >
                <FeatureImage
                  fluid={
                    firstPost.node.frontmatter.featuredImage.childImageSharp
                      .fluid
                  }
                />
              </Link>
            </Box>
          )}
          <Box d="flex" justifyContent="center" flexDir="column">
            <Stack isInline spacing={4} color="gray.500" fontSize="sm">
              <Text as="time">{firstPost.node.frontmatter.date}</Text>
              <Text as="span">{firstPost.node.fields.readingTime.text}</Text>
            </Stack>
            <Heading as="h2" size="xl" mt={1} isTruncated>
              <Link to={firstPost.node.fields.slug}>
                {firstPost.node.frontmatter.title}
              </Link>
            </Heading>
            {firstPost.node.excerpt && (
              <Text mt={2}>{firstPost.node.excerpt}</Text>
            )}
          </Box>
        </SimpleGrid>
        <SimpleGrid columns={[1, 2]} spacing={8}>
          <Box>
            <Heading as="h3" size="lg">
              Recent blog posts
            </Heading>
            <List my={4}>
              {remainPosts.map(({ node }) => {
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
            <Button as={Link} to="/blog" variant="ghost">
              View More
              <Icon name="chevron-right" ml="1" />
            </Button>
          </Box>
          <Box>
            <Heading as="h3" size="lg">
              Recent notes
            </Heading>
          </Box>
        </SimpleGrid>
      </Stack>
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
      limit: 4
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
    site {
      siteMetadata {
        seoKeywords
      }
    }
  }
`;
/* eslint-enable react/no-danger */
