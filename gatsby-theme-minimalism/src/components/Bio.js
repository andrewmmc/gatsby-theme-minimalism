import React from 'react';
import { graphql, useStaticQuery, Link as GatsbyLink } from 'gatsby';
import { Text, Flex, Link, Icon, useTheme } from '@chakra-ui/core';
import styled from '@emotion/styled';
import Image from 'gatsby-image';
import Heading from 'components/Heading';

const Bio = (props) => {
  const { breakpoints } = useTheme();
  const data = useStaticQuery(pageQuery);
  const { author, authorDescription } = data.site.siteMetadata;
  const avatarSources = [
    data.mobileAvatar.childImageSharp.fixed,
    {
      ...data.tabletAvatar.childImageSharp.fixed,
      media: `(min-width: ${breakpoints[1]})`,
    },
  ];

  return (
    <Flex
      flexDirection={['column-reverse', 'row']}
      justifyContent="space-between"
      {...props}
    >
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="flex-start"
      >
        <Heading>Hi, I'm {author}.</Heading>
        {authorDescription && (
          <Text color="gray.600" fontSize="lg" mb={4}>
            {authorDescription}
          </Text>
        )}
        <Link as={GatsbyLink} to="/about" color="primary.500">
          About Me
          <Icon name="chevron-right" ml="1" />
        </Link>
      </Flex>
      <Flex alignSelf={['flex-start', 'center']} pb={[4, 0]} pl={[0, 4]}>
        <StyledAvatar fixed={avatarSources} alt={author} />
      </Flex>
    </Flex>
  );
};

const StyledAvatar = styled(Image)`
  border-radius: 50%;
`;

const pageQuery = graphql`
  query BioQuery {
    mobileAvatar: file(
      sourceInstanceName: { eq: "assets" }
      relativePath: { eq: "profile.jpg" }
    ) {
      childImageSharp {
        fixed(width: 75, height: 75) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    tabletAvatar: file(
      sourceInstanceName: { eq: "assets" }
      relativePath: { eq: "profile.jpg" }
    ) {
      childImageSharp {
        fixed(width: 125, height: 125) {
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
