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

const PageInfo = styled.p``;

const List = styled.ul``;

const Item = styled.li``;

const H3 = styled.h3``;

const Info = styled.small``;

const FeaturedImage = styled(Image)``;

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
