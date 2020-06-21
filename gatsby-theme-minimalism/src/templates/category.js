/* eslint-disable react/no-danger */
import React from 'react';
import { shape } from 'prop-types';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import Image from 'gatsby-image';
import rgba from 'polished/lib/color/rgba';

import Layout from 'components/Layout';
import Seo from 'components/Seo';

import { Main } from 'themes/styles';

const Category = ({ data, pageContext }) => {
  const { category, count } = pageContext;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <Seo keywords={data.site.siteMetadata.seoKeywords} />
      <Main>
        <h1>{category}</h1>
        <PageInfo>
          {count} posts posted in{' '}
          <Link to={`/category/${category}`}>{category}</Link>.
        </PageInfo>
        <List>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug;
            const { date } = node.frontmatter;
            return (
              <Item key={node.fields.slug}>
                {node.frontmatter.featuredImage && (
                  <Link to={node.fields.slug}>
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
                </Info>
                <H3>
                  <Link to={node.fields.slug}>{title}</Link>
                </H3>
                <p>{node.excerpt}</p>
              </Item>
            );
          })}
        </List>
      </Main>
    </Layout>
  );
};

Category.propTypes = {
  data: shape({}).isRequired,
};

const PageInfo = styled.p`
  color: ${({ theme }) => rgba(theme.primaryTextColor, 0.7)};
`;

const List = styled.ul`
  list-style: none;
  margin: -1.5rem 0 0 0;
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
  margin: 0.5rem 0 1rem 0;
  font-weight: 600;
`;

const Info = styled.small`
  display: block;
  margin: 0 0 0.5rem 0;
  color: ${({ theme }) => rgba(theme.primaryTextColor, 0.7)};

  time {
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

export default Category;

export const pageQuery = graphql`
  query query($category: String) {
    allMarkdownRemark(
      filter: {
        fields: { type: { eq: "blog" } }
        frontmatter: { category: { in: [$category] } }
      }
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
