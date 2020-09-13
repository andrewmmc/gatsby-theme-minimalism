import React from 'react';
import { shape, string, node, arrayOf } from 'prop-types';
import { graphql } from 'gatsby';
import { Text, Stack, Divider, Tag } from '@chakra-ui/core';

import Content from 'components/Content';
import Feedback from 'components/Feedback';
import Heading from 'components/Heading';
import Layout from 'components/Layout';
import PostNav from 'components/PostNav';
import Seo from 'components/Seo';

export const PostTemplate = ({
  title,
  date,
  readingTime,
  category = [],
  content,
  feedback,
  previous,
  next,
  isHTMLContent = true,
}) => {
  const previousUrl = previous && previous.fields && previous.fields.slug;
  const previousTitle =
    previous && previous.frontmatter && previous.frontmatter.title;
  const nextUrl = next && next.fields && next.fields.slug;
  const nextTitle = next && next.frontmatter && next.frontmatter.title;

  return (
    <>
      <article>
        <Heading>{title}</Heading>
        <Stack isInline spacing={4} my={4} color="gray.600">
          {date && <Text as="time">{date}</Text>}
          {readingTime && <Text as="span">{readingTime}</Text>}
        </Stack>
        {category.length > 0 && (
          <Stack isInline spacing={4} my={4}>
            {category.map((item, idx) => {
              return (
                <Tag size="sm" key={`tag_${idx}`}>
                  {item}
                </Tag>
              );
            })}
          </Stack>
        )}
        <Content mt={8} content={content} isHTMLContent={isHTMLContent} />
      </article>
      <Divider borderColor="gray.300" mt={8} mb={6} />
      {feedback || null}
      <PostNav
        previousUrl={previousUrl}
        previousTitle={previousTitle}
        nextUrl={nextUrl}
        nextTitle={nextTitle}
      />
    </>
  );
};

const Post = ({ data, pageContext }) => {
  const { siteUrl } = data.site.siteMetadata;
  const { previous, next, isShowFeedback, isShowReadingTime } = pageContext;
  const post = data.markdownRemark;
  const { title, date } = post.frontmatter;
  const postCategory = post.frontmatter.category || [];
  const { readingTime, slug } = post.fields;

  return (
    <Layout>
      <Seo
        title={title}
        description={post.excerpt}
        canonical={post.frontmatter.canonical}
      />
      <PostTemplate
        title={title}
        date={date}
        readingTime={isShowReadingTime ? readingTime.text : null}
        category={postCategory}
        content={post.htmlAst}
        feedback={
          isShowFeedback ? <Feedback siteUrl={siteUrl} slug={slug} /> : null
        }
        previous={previous}
        next={next}
      />
    </Layout>
  );
};

PostTemplate.propTypes = {
  title: string.isRequired,
  date: string.isRequired,
  readingTime: string,
  category: arrayOf(string).isRequired,
  content: shape({}).isRequired,
  feedback: node,
  previous: shape({}),
  next: shape({}),
};

PostTemplate.defaultProps = {
  readingTime: undefined,
  feedback: undefined,
  previous: undefined,
  next: undefined,
};

Post.propTypes = {
  data: shape({}).isRequired,
  pageContext: shape({}).isRequired,
};

export default Post;

export const pageQuery = graphql`
  query PostBySlug($slug: String!, $dateFormat: String!) {
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
        date(formatString: $dateFormat)
        category
      }
    }
  }
`;
