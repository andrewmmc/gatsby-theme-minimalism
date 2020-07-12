/* eslint-disable react/no-danger */
import React from 'react';
import { shape } from 'prop-types';
import { graphql, Link } from 'gatsby';
import LikeCoin from 'react-likecoin';
import styled from 'styled-components';
import { Heading, List, ListItem, Text, Stack } from '@chakra-ui/core';
import rgba from 'polished/lib/color/rgba';

import Bio from 'components/Bio';
import Layout from 'components/Layout';
import Seo from 'components/Seo';
import Signup from 'components/Signup';
import useThemeConfig from 'hooks/useThemeConfig';

const BlogTemplate = ({ data, pageContext }) => {
  const { likeCoinId, convertKitFormId } = useThemeConfig();
  const { siteUrl } = data.site.siteMetadata;
  const { previous, next } = pageContext;
  const post = data.markdownRemark;
  const { title, date, category } = post.frontmatter;
  const { readingTime } = post.fields;

  return (
    <Layout>
      <Seo
        title={title}
        description={post.excerpt}
        canonical={post.frontmatter.canonical}
      />
      <article>
        <Heading as="h1" size="2xl" mb={8}>
          {title}
        </Heading>
      </article>
      {/* <Article>
        <header>
          <h1>{title}</h1>
          <Wrapper>
            <Info>
              <time>{date}</time>
              {category &&
                category.map(cat => (
                  <Link to={`/category/${cat}`} key={cat}>
                    {cat}
                  </Link>
                ))}
            </Info>
            <SubInfo>
              <span>{readingTime.text}</span>
            </SubInfo>
          </Wrapper>
        </header>
        <Content dangerouslySetInnerHTML={{ __html: post.html }} />
      </Article>
      <Comment>
        <Bio mini />
        <a
          href={`https://twitter.com/search?q=${encodeURI(
            siteUrl + post.fields.slug
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Discuss on Twitter
        </a>
      </Comment>
      {likeCoinId && (
        <LikeCoin
          userId={likeCoinId}
          referrer={`${siteUrl}${post.fields.slug}`}
        />
      )}
      {convertKitFormId && <Signup />}
      <Nav>
        <li>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </li>
      </Nav> */}
    </Layout>
  );
};

BlogTemplate.propTypes = {
  data: shape({}).isRequired,
  pageContext: shape({}).isRequired,
  location: shape({}).isRequired,
};

const Info = styled.p``;

const SubInfo = styled.p``;

const Wrapper = styled.div``;

const Nav = styled.ul``;

const Article = styled.article``;

const Content = styled.div``;

const Comment = styled.div``;

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
      html
      fields {
        slug
        readingTime {
          text
        }
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        category
      }
    }
  }
`;
/* eslint-enable react/no-danger */
