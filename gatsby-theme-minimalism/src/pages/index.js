/* eslint-disable react/no-danger */
import React from 'react';
import { shape } from 'prop-types';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import Image from 'gatsby-image';
import rgba from 'polished/lib/color/rgba';

import Bio from 'components/Bio';
import Layout from 'components/Layout';
import Seo from 'components/Seo';
import Thumbnail from 'components/Thumbnail';
import useThemeConfig from 'hooks/useThemeConfig';
import { Main } from 'themes/styles';

const BlogIndex = ({ data }) => {
  const { showIntro } = useThemeConfig();
  const posts = data.allMarkdownRemark.edges;
  return (
    <Layout
      cover={<Thumbnail fluid={data.featuredImage.childImageSharp.fluid} />}
    >
      <Seo keywords={data.site.siteMetadata.seoKeywords} />
      <Main>
        {showIntro && <Bio />}
        <List>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug;
            const { date } = node.frontmatter;
            return (
              <Item key={node.fields.slug}>
                {node.frontmatter.featuredImage && (
                  <Link to={node.fields.slug} aria-label={title}>
                    <FeaturedImage
                      fluid={
                        node.frontmatter.featuredImage.childImageSharp.fluid
                      }
                    />
                  </Link>
                )}
                <Info>
                  <time>{date}</time>
                  <span>{node.fields.readingTime.text}</span>
                  {node.frontmatter.category &&
                    node.frontmatter.category.map(cat => (
                      <Link to={`/category/${cat}`} key={cat}>
                        {cat}
                      </Link>
                    ))}
                </Info>
                <H3>
                  <Link to={node.fields.slug}>{title}</Link>
                </H3>
                {node.excerpt && <Excerpt>{node.excerpt}</Excerpt>}
              </Item>
            );
          })}
        </List>
      </Main>
    </Layout>
  );
};

BlogIndex.propTypes = {
  data: shape({}).isRequired,
};

const List = styled.ul`
  list-style: none;
  margin: 0;
`;

const Item = styled.li`
  padding: 1.5rem 0;
  margin: 0;
  border-bottom: 1px solid ${({ theme }) => theme.lightGrayColor};

  &:last-of-type {
    border-bottom: 0;
  }
`;

const H3 = styled.h3`
  margin: 0.5rem 0;
  font-weight: 600;
`;

const Info = styled.small`
  display: block;
  margin: 0 0 0.5rem 0;
  color: ${({ theme }) => rgba(theme.primaryTextColor, 0.7)};

  time,
  span {
    margin-right: 1rem;
  }
`;

const FeaturedImage = styled(Image).attrs(({ theme }) => ({
  backgroundColor: theme.lightGrayColor,
}))`
  width: 100%;
  height: 180px;
  background-position: center;
  box-shadow: 0 0.8em 2em ${({ theme }) => rgba(theme.primaryTextColor, 0.1)};
  margin: 0 0 1rem 0 !important;

  & > img {
    object-fit: cover !important;
    object-position: 50% 50% !important;
  }
`;

const Excerpt = styled.p`
  font-size: 0.95rem;
`;

export default BlogIndex;

export const pageQuery = graphql`
  query {
    featuredImage: file(
      sourceInstanceName: { eq: "assets" }
      relativePath: { eq: "home.jpg" }
    ) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1440) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    allMarkdownRemark(
      filter: { fields: { type: { eq: "blog" } } }
      sort: { fields: [frontmatter___date], order: DESC }
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
