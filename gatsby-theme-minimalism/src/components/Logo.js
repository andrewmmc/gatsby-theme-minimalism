import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

const Logo = props => {
  const data = useStaticQuery(pageQuery);
  const { title } = data.site.siteMetadata;
  return <H1 {...props}>{title}</H1>;
};

const H1 = styled.h1`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  display: inherit;
`;

export default Logo;

const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
