import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { Box, Heading, Flex, Text, Button } from '@chakra-ui/core';
import styled from 'styled-components';
import rgba from 'polished/lib/color/rgba';

// import { Container } from 'themes/styles';
// import Container from './Container';
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
    <Flex
      as="nav"
      justify="space-between"
      maxW="5xl"
      m="0 auto"
      py="4"
      {...props}
    >
      <Link to="/">
        <Logo />
      </Link>
      <ul>
        {headerItems.map(item => (
          <Link key={item.path} to={item.path}>
            {item.label}
          </Link>
        ))}
      </ul>
    </Flex>
  );
};

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
