/* eslint-disable react/no-danger */
import React from 'react';
import { shape } from 'prop-types';
import { graphql, Link } from 'gatsby';
import LikeCoin from 'react-likecoin';
import styled from 'styled-components';
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
      <Article>
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
      </Nav>
    </Layout>
  );
};

BlogTemplate.propTypes = {
  data: shape({}).isRequired,
  pageContext: shape({}).isRequired,
  location: shape({}).isRequired,
};

const Info = styled.p`
  color: ${({ theme }) => rgba(theme.primaryTextColor, 0.7)};
  display: flex;
  margin-bottom: 0.5rem;

  a {
    margin-left: 1rem;
  }
`;

const SubInfo = styled.p`
  color: ${({ theme }) => rgba(theme.primaryTextColor, 0.7)};
  display: flex;
  margin-bottom: 0.5rem;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Nav = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;

  li {
    display: inline-flex;
  }
`;

const Article = styled.article`
  margin: 2rem 0;
`;

const Content = styled.div`
  margin: 1rem 0;

  span.gatsby-resp-image-wrapper {
    margin: 1rem auto;
    box-shadow: 0 0.8em 2em ${({ theme }) => rgba(theme.primaryTextColor, 0.15)};
  }
`;

const Comment = styled.div`
  display: flex;
  margin: 1rem 0;

  > a {
    margin-left: 1rem;
  }
`;

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
