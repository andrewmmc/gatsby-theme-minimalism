import React, { memo } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Box, Flex, IconButton } from '@chakra-ui/core';
import {
  FiFacebook,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiRss,
  FiInstagram,
} from 'react-icons/fi';
import { RiMediumLine } from 'react-icons/ri';

const Footer = (props) => {
  const data = useStaticQuery(pageQuery);
  const { social } = data.site.siteMetadata;
  const { github, linkedin, facebook, instagram, twitter, medium } = social;

  return (
    <Flex
      as="footer"
      flexDirection={['column', 'row']}
      flexWrap="nowrap"
      justify="space-between"
      alignItems="center"
      maxW="2xl"
      m="0 auto"
      px="4"
      py="3"
      color="gray.500"
      {...props}
    >
      <Box mb={[2, 0]}>© {new Date().getFullYear()}</Box>
      <Box>
        <IconButton
          as="a"
          href="/rss.xml"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="RSS"
          variant="ghost"
          icon={FiRss}
        />
        {github && (
          <IconButton
            as="a"
            href={`https://github.com/${github}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            variant="ghost"
            icon={FiGithub}
          />
        )}
        {twitter && (
          <IconButton
            as="a"
            href={`https://twitter.com/${twitter}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            variant="ghost"
            icon={FiTwitter}
          />
        )}
        {facebook && (
          <IconButton
            as="a"
            href={`https://facebook.com/${facebook}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            variant="ghost"
            icon={FiFacebook}
          />
        )}
        {instagram && (
          <IconButton
            as="a"
            href={`https://instagram.com/${instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            variant="ghost"
            icon={FiInstagram}
          />
        )}
        {linkedin && (
          <IconButton
            as="a"
            href={`https://linkedin.com/in/${linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Linkedin"
            variant="ghost"
            icon={FiLinkedin}
          />
        )}
        {medium && (
          <IconButton
            as="a"
            href={`https://medium.com/${medium}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Medium"
            variant="ghost"
            icon={RiMediumLine}
          />
        )}
      </Box>
    </Flex>
  );
};

export default memo(Footer);

const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        siteUrl
        social {
          github
          linkedin
          facebook
          instagram
          twitter
          medium
        }
      }
    }
  }
`;
