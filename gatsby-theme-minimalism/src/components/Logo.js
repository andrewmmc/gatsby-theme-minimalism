import React, { memo } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Heading } from '@chakra-ui/core';

const Logo = (props) => {
  const data = useStaticQuery(pageQuery);
  const { title } = data.site.siteMetadata;
  return (
    <Heading as="h1" size="md" {...props}>
      {title}
    </Heading>
  );
};

export default memo(Logo);

const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
