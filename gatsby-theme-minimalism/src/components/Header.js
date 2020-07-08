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

const SkipToContentLink = styled.a``;

const StyledHeader = styled.header``;

const StyledContainer = styled(Container)``;

const StyledLogo = styled(Logo)``;

const Nav = styled.nav``;

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
