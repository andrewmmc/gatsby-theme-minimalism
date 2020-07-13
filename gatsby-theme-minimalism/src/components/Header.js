import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { Box, Flex, Button, List, ListItem } from '@chakra-ui/core';
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
    <Box bg="white" borderBottomWidth="1px">
      <Flex
        as="nav"
        justify="space-between"
        maxW="2xl"
        m="0 auto"
        px="4"
        py="3"
        {...props}
      >
        <Button as={Link} variant="ghost" to="/">
          <Logo />
        </Button>
        <List d="flex">
          {headerItems.map(item => (
            <ListItem>
              <MenuItem key={item.path} to={item.path}>
                {item.label}
              </MenuItem>
            </ListItem>
          ))}
        </List>
      </Flex>
    </Box>
  );
};

const MenuItem = ({ to, children, ...props }) => (
  <Button as={Link} to={to} variant="ghost" fontWeight="normal" {...props}>
    {children}
  </Button>
);

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
