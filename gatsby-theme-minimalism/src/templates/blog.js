import React from 'react';
import { shape } from 'prop-types';
import { graphql, Link as GatsbyLink } from 'gatsby';
import { Icon, Text, Stack, Divider, Link, Flex } from '@chakra-ui/core';

import Content from 'components/Content';
import Heading from 'components/Heading';
import { BackgroundImage } from 'components/Image';
import Layout from 'components/Layout';
import Seo from 'components/Seo';
import Signup from 'components/Signup';
import useThemeConfig from 'hooks/useThemeConfig';

const BlogTemplate = ({ data, pageContext }) => {
  const { convertKitFormId } = useThemeConfig();
  const { siteUrl } = data.site.siteMetadata;
  const { previous, next } = pageContext;
  const post = data.markdownRemark;
  const { title, date, featuredImage } = post.frontmatter;
  const { readingTime } = post.fields;

  return (
    <Layout
      {...(!!featuredImage && {
        cover: <BackgroundImage {...featuredImage.childImageSharp} />,
      })}
    >
      <Seo
        title={title}
        description={post.excerpt}
        canonical={post.frontmatter.canonical}
      />
      <article>
        <Heading>{title}</Heading>
        <Stack isInline spacing={4} my={4} color="gray.500">
          <Text as="time">{date}</Text>
          <Text as="span">{readingTime.text}</Text>
        </Stack>
        <Content mt={8} htmlAst={post.htmlAst} />
      </article>
      <Divider borderColor="gray.400" mt={8} mb={6} />
      <Stack isInline spacing={4}>
        <Link
          color="primary.500"
          fontSize="sm"
          href={`https://twitter.com/search?q=${encodeURI(
            siteUrl + post.fields.slug
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Discuss on Twitter
        </Link>
        <Link
          color="primary.500"
          fontSize="sm"
          href={`https://github.com/andrewmmc/andrewmmc.com/edit/master/content${post.fields.slug}index.md`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Edit on GitHub
        </Link>
      </Stack>
      {convertKitFormId && <Signup my={6} />}
      <Flex justifyContent="space-between" direction={['column', 'row']} mt={8}>
        {previous && (
          <Link
            as={GatsbyLink}
            to={previous.fields.slug}
            color="gray.600"
            rel="prev"
            textAlign="left"
            mb={2}
          >
            <Flex alignItems="center">
              <Icon name="chevron-left" mx={2} />
              {previous.frontmatter.title}
            </Flex>
          </Link>
        )}
        {next && (
          <Link
            as={GatsbyLink}
            to={next.fields.slug}
            color="gray.600"
            rel="next"
            textAlign="right"
            mb={2}
          >
            <Flex alignItems="center">
              {next.frontmatter.title}
              <Icon name="chevron-right" mx={2} />
            </Flex>
          </Link>
        )}
      </Flex>
    </Layout>
  );
};

BlogTemplate.propTypes = {
  data: shape({}).isRequired,
  pageContext: shape({}).isRequired,
};

export default BlogTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(truncate: true)
      htmlAst
      fields {
        slug
        readingTime {
          text
        }
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        featuredImage {
          childImageSharp {
            fluid(quality: 95, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;
