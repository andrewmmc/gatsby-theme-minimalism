import React from 'react';
import { string } from 'prop-types';
import { Link as GatsbyLink } from 'gatsby';
import { Icon, Link, Flex } from '@chakra-ui/core';

const PostNav = ({ previousUrl, previousTitle, nextUrl, nextTitle }) => {
  return (
    <Flex justifyContent="space-between" direction={['column', 'row']} mt={8}>
      {previousUrl && (
        <Link
          as={GatsbyLink}
          to={previousUrl}
          color="gray.600"
          rel="prev"
          textAlign="left"
          mb={2}
        >
          <Flex alignItems="center">
            <Icon name="chevron-left" mx={2} />
            {previousTitle}
          </Flex>
        </Link>
      )}
      {nextUrl && (
        <Link
          as={GatsbyLink}
          to={nextUrl}
          color="gray.600"
          rel="next"
          textAlign="right"
          mb={2}
        >
          <Flex alignItems="center">
            {nextTitle}
            <Icon name="chevron-right" mx={2} />
          </Flex>
        </Link>
      )}
    </Flex>
  );
};

PostNav.propTypes = {
  previousUrl: string,
  previousTitle: string,
  nextUrl: string,
  nextTitle: string,
};

PostNav.defaultProps = {
  previousUrl: undefined,
  previousTitle: undefined,
  nextUrl: undefined,
  nextTitle: undefined,
};

export default PostNav;
