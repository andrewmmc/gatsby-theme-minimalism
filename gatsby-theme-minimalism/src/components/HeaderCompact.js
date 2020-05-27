import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import rgba from 'polished/lib/color/rgba';

import { Container } from 'themes/styles';
import Logo from './Logo';

const HeaderCompact = props => {
  const data = useStaticQuery(pageQuery);
  const allPages = data.allSitePage.edges.map(edge => edge.node.path);

  const headerItems = [];

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
    <>
      <SkipToContentLink href="#main-content">
        Skip to main content
      </SkipToContentLink>
      <Header {...props}>
        <StyledContainer>
          <Link to="/">
            <Logo />
          </Link>
          <Nav>
            {headerItems.map(item => (
              <Link key={item.path} to={item.path}>
                {item.label}
              </Link>
            ))}
          </Nav>
        </StyledContainer>
      </Header>
    </>
  );
};

const SkipToContentLink = styled.a`
  position: absolute;
  top: -999px;
  z-index: -999;

  &:focus,
  &:active {
    color: ${({ theme }) => rgba(theme.whiteColor, 0.9)};
    background-color: ${({ theme }) => theme.primaryColor};
    border: 0;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    margin: 0 auto;
    padding: 0.4rem 1rem;
    border-radius: 0 0 4px 4px;
    text-align: center;
    z-index: 999;
  }
`;

const Header = styled.header`
  width: 100%;
  padding: 1rem 0;
  margin: 0 auto;

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
`;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Nav = styled.nav`
  display: flex;
  position: initial;
  width: auto;
  justify-content: flex-end;

  a {
    display: inline-block;
    height: 100%;
    padding: 0 1rem;

    &:hover,
    &:focus,
    &:active {
      background-color: transparent;
    }
  }
`;

export default HeaderCompact;

const pageQuery = graphql`
  query {
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
  }
`;
