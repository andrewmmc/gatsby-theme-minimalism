import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Icon, Link, Text } from '@chakra-ui/core';

import Heading from 'components/Heading';
import Layout from 'components/Layout';
import Seo from 'components/Seo';

const NotFound = () => (
  <Layout>
    <Seo title="404 Not Found" />
    <Heading>404 Not Found</Heading>
    <Text my={8}>
      The page you requested cannot be found. The URL may be misspelled or the
      page you're looking for is no longer available.
    </Text>
    <Link as={GatsbyLink} to="/" color="primary.500">
      <Icon name="chevron-left" ml="1" />
      Back to home
    </Link>
  </Layout>
);

export default NotFound;
