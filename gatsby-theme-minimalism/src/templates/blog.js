/* eslint-disable react/no-danger */
import React from 'react';
import { shape } from 'prop-types';
import { graphql, Link } from 'gatsby';
import LikeCoin from 'react-likecoin';
import styled from 'styled-components';
import media from 'styled-media-query';
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
              <span>{readingTime.text}</span>
              {category &&
                category.map(cat => (
                  <Link to={`/category/${cat}`} key={cat}>
                    {cat}
                  </Link>
                ))}
            </Info>
            <Bio mini />
          </Wrapper>
        </header>
        <Content dangerouslySetInnerHTML={{ __html: post.html }} />
      </Article>
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
  color: ${({ theme }) => theme.primaryColor};
  display: flex;
  margin: 0;

  time,
  span {
    margin-right: 1rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 0.5rem;

  ${Info} {
    margin-bottom: 0.5rem;
  }

  ${media.greaterThan('medium')`
  flex-direction: row;

  ${Info} {
    margin-bottom: 0;
  }
`};
`;

const Nav = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
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
