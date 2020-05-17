import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import rgba from 'polished/lib/color/rgba';

import Logo from './Logo';
import { Container } from 'themes/styles';

const Header = props => {
  const data = useStaticQuery(pageQuery);
  const allPages = data.allSitePage.edges.map(edge => edge.node.path);

  const categoryList = data.allMarkdownRemark.group
    .map(category => ({
      path: `/category/${category.fieldValue}`,
      label: category.fieldValue,
      count: category.totalCount,
    }))
    .sort((a, b) => b.count - a.count);

  const headerItems = [...categoryList];

  if (allPages.includes('/projects/')) {
    headerItems.push({
      path: '/projects',
      label: data.projects.frontmatter.title,
    });
  }

  if (allPages.includes('/about/')) {
    headerItems.push({ path: '/about', label: data.about.frontmatter.title });
  }

  return (
    <StyledHeader {...props}>
      <TitleBar>
        <Container>
          <Link to="/">
            <Logo />
          </Link>
        </Container>
      </TitleBar>
      <NavBar>
        <Nav as="nav">
          {headerItems.map(item => (
            <Link key={item.path} to={item.path}>
              {item.label}
            </Link>
          ))}
        </Nav>
      </NavBar>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;

  a {
    color: ${({ theme }) => theme.primaryTextColor};
    border-bottom: 0;

    &:hover,
    &:focus,
    &:active {
      color: ${({ theme }) => rgba(theme.primaryTextColor, 0.9)};
      background: none;
      border-bottom: none;
    }
  }

  ${({ isCompactMode }) =>
    isCompactMode &&
    `
  flex-direction: row;
`}
`;

const TitleBar = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const NavBar = styled.div`
  overflow-x: auto;
  white-space: nowrap;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  background-color: ${({ theme }) => theme.primaryColor};
`;

const Nav = styled(Container)`
  display: flex;
  font-size: 0.9rem;

  a {
    display: inline-block;
    height: 100%;
    padding: 0 2rem 0 0;
    color: ${({ theme }) => rgba(theme.whiteColor, 0.8)};

    &:hover,
    &:focus,
    &:active {
      color: ${({ theme }) => rgba(theme.whiteColor, 0.9)};
      background-color: transparent;
    }
  }
`;

export default Header;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allSitePage {
      edges {
        node {
          path
        }
      }
    }
    projects: markdownRemark(fields: { slug: { eq: "/projects/" } }) {
      frontmatter {
        title
      }
    }
    about: markdownRemark(fields: { slug: { eq: "/about/" } }) {
      frontmatter {
        title
      }
    }
    allMarkdownRemark(
      filter: { fields: { type: { eq: "blog" } } }
      limit: 1000
    ) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`;
