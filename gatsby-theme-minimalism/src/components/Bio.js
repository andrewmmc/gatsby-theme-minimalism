import React from 'react';
import { graphql, useStaticQuery, Link as GatsbyLink } from 'gatsby';
import { Text, Grid, Flex, Link, Icon } from '@chakra-ui/core';
import Image from 'gatsby-image';
import Heading from 'components/Heading';

const Bio = () => {
  const data = useStaticQuery(pageQuery);
  const { author, authorDescription } = data.site.siteMetadata;
  return (
    <Grid
      gridTemplateColumns={['1fr', '2fr 1fr']}
      gridTemplateRows={['1fr', '1fr']}
      gap={4}
    >
      <Flex flexDirection="column" justifyContent="center" height="100%">
        <Heading>Hi, I'm {author}.</Heading>
        {authorDescription && (
          <Text color="gray.600" fontSize="lg" mb={6}>
            {authorDescription}
          </Text>
        )}
        <Link as={GatsbyLink} to="/about" color="primary.500">
          Read More
          <Icon name="chevron-right" ml="1" />
        </Link>
      </Flex>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="flex-end"
        height="100%"
        display={['none', 'flex']}
      >
        <Image
          fixed={data.avatar.childImageSharp.fixed}
          alt={author}
          style={{ borderRadius: '50%' }}
        />
      </Flex>
    </Grid>
  );
};

const pageQuery = graphql`
  query BioQuery {
    avatar: file(
      sourceInstanceName: { eq: "assets" }
      relativePath: { eq: "profile.jpg" }
    ) {
      childImageSharp {
        fixed(width: 150, height: 150) {
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
