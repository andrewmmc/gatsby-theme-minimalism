import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';

const Bio = ({ mini = false, ...props }) => {
  const data = useStaticQuery(pageQuery);
  const { author, authorDescription } = data.site.siteMetadata;
  return (
    <Container mini={mini} {...props}>
      {mini ? (
        <>
          <StyledImage fixed={data.avatar.childImageSharp.fixed} alt={author} />
          <Link to="/about">{author}</Link>
        </>
      ) : (
        <>
          <h1>Hi, I'm {author}.</h1>
          {authorDescription && <p>{authorDescription}</p>}
        </>
      )}
    </Container>
  );
};

const Container = styled.div``;

const StyledImage = styled(Image)``;

const pageQuery = graphql`
  query BioQuery {
    avatar: file(
      sourceInstanceName: { eq: "assets" }
      relativePath: { eq: "profile.jpg" }
    ) {
      childImageSharp {
        fixed(width: 25, height: 25) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        authorDescription
      }
    }
  }
`;

export default Bio;
