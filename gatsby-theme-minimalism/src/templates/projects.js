import React from 'react';
import { shape } from 'prop-types';
import { graphql, Link as GatsbyLink } from 'gatsby';
import { Icon, Text, Stack, Link, Flex } from '@chakra-ui/core';

import Content from 'components/Content';
import Heading from 'components/Heading';
import Layout from 'components/Layout';
import Seo from 'components/Seo';

const ProjectsTemplate = ({ data, pageContext }) => {
  const { previous, next } = pageContext;
  const post = data.markdownRemark;
  const { title, date } = post.frontmatter;

  return (
    <Layout>
      <Seo
        title={title}
        description={post.excerpt}
        canonical={post.frontmatter.canonical}
      />
      <article>
        <Heading>{title}</Heading>
        <Stack isInline spacing={4} my={4} color="gray.500">
          <Text as="time">{date}</Text>
        </Stack>
        <Content mt={8} htmlAst={post.htmlAst} />
      </article>
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

ProjectsTemplate.propTypes = {
  data: shape({}).isRequired,
  pageContext: shape({}).isRequired,
};

export default ProjectsTemplate;

export const pageQuery = graphql`
  query ProjectBySlug($slug: String!) {
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
      }
      frontmatter {
        title
        date(formatString: "YYYY")
      }
    }
  }
`;
