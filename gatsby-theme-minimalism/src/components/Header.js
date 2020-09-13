import React, { memo } from 'react';
import { Link as GatsbyLink, graphql, useStaticQuery } from 'gatsby';
import {
  Box,
  Flex,
  Button,
  IconButton,
  Link,
  List,
  ListItem,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/core';
import { FiMenu } from 'react-icons/fi';
import Logo from './Logo';

const Header = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const data = useStaticQuery(pageQuery);
  const { social } = data.site.siteMetadata;
  const { github } = social || {};

  const allPages = data.allSitePage.edges.map((edge) => edge.node.path);
  const headerItems = [{ path: '/', label: 'Blog' }];

  if (allPages.includes('/notes/')) {
    headerItems.push({
      path: '/notes',
      label: 'Notes',
    });
  }

  if (allPages.includes('/projects/')) {
    headerItems.push({
      path: '/projects',
      label: 'Projects',
    });
  }

  if (allPages.includes('/about/')) {
    headerItems.push({
      path: '/about',
      label: data.about.frontmatter.title,
    });
  }

  if (github) {
    headerItems.push({
      path: `https://github.com/${github}`,
      label: `GitHub`,
    });
  }

  return (
    <Box width="100%" borderBottomWidth="1px">
      <Flex
        as="nav"
        justify="space-between"
        alignItems="center"
        maxW="3xl"
        m="0 auto"
        px="4"
        py="2"
        {...props}
      >
        <Link as={GatsbyLink} to="/">
          <Logo />
        </Link>
        <IconButton
          ref={btnRef}
          aria-label="Menu"
          variant="ghost"
          icon={FiMenu}
          onClick={onOpen}
        />
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader />
            <DrawerBody>
              <List>
                {headerItems.map((item) => (
                  <ListItem key={item.path}>
                    <MenuItem to={item.path}>{item.label}</MenuItem>
                  </ListItem>
                ))}
              </List>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  );
};

const MenuItem = ({ to, children, ...props }) => {
  let externalProps = {};
  if (to.startsWith('http')) {
    externalProps = {
      isExternal: true,
      target: `_blank`,
      rel: `noopener noreferrer`,
    };
  }

  return (
    <Button
      as={GatsbyLink}
      to={to}
      variant="ghost"
      fontWeight="normal"
      _active={{ bg: 'gray.100' }}
      {...externalProps}
      {...props}
    >
      {children}
    </Button>
  );
};

export default memo(Header);

const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        social {
          github
        }
      }
    }
    allSitePage {
      edges {
        node {
          path
        }
      }
    }
    about: markdownRemark(fields: { slug: { eq: "/about/" } }) {
      frontmatter {
        title
      }
    }
  }
`;
