import React, { memo } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Heading from 'components/Heading';

const Logo = (props) => {
  const data = useStaticQuery(pageQuery);
  const { title } = data.site.siteMetadata;
  return (
    <Heading as="h1" fontWeight="600" size="md" mb={0} {...props}>
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
