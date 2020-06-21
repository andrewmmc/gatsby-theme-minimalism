import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import rgba from 'polished/lib/color/rgba';

import { Container } from 'themes/styles';
import Logo from './Logo';

const Header = props => {
  const data = useStaticQuery(pageQuery);
  const allPages = data.allSitePage.edges.map(edge => edge.node.path);
  const headerItems = [];

  if (allPages.includes('/projects/')) {
    headerItems.unshift({
      path: '/projects',
      label: data.projects.frontmatter.title,
    });
  }

  if (allPages.includes('/about/')) {
    headerItems.unshift({
      path: '/about',
      label: data.about.frontmatter.title,
    });
  }

  return (
    <>
      <SkipToContentLink href="#main-content">
        Skip to main content
      </SkipToContentLink>
      <StyledHeader {...props}>
        <StyledContainer>
          <Link to="/">
            <StyledLogo />
          </Link>
          <Nav>
            {headerItems.map(item => (
              <Link key={item.path} to={item.path}>
                {item.label}
              </Link>
            ))}
          </Nav>
        </StyledContainer>
      </StyledHeader>
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

const StyledHeader = styled.header`
  padding: 1rem 0;
  a,
  a:hover,
  a:focus,
  a:active {
    border-bottom: 0px;
  }
`;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
`;

const StyledLogo = styled(Logo)`
  flex-grow: 1;
`;

const Nav = styled.nav`
  display: flex;
  padding: 0 0 0 1rem;
  overflow-x: auto;
  white-space: nowrap;
  align-self: center;

  a {
    color: ${({ theme }) => theme.primaryTextColor};
    display: inline-block;
    height: 100%;
    margin: 0 1rem;
    border-bottom: 0px;

    &:last-childî {
      margin-right: 0;
    }

    &:hover,
    &:focus,
    &:active {
      background-color: transparent;
      border-bottom: 0px;
    }
  }
`;

export default Header;

const pageQuery = graphql`
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
  }
`;
