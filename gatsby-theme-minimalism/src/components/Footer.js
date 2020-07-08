import React from 'react';
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

const Footer = props => {
  const data = useStaticQuery(pageQuery);
  const { social } = data.site.siteMetadata;
  const { github, linkedin, facebook, instagram, twitter, medium } = social;

  return (
    <Flex
      as="footer"
      justify="space-between"
      maxW="5xl"
      m="0 auto"
      p="3"
      {...props}
    >
      <div>© {new Date().getFullYear()}</div>
      <div>
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
        {/* {medium && (
          <a
            href={`https://medium.com/${medium}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Medium"
          >
            <Icon icon={faMedium} />
            <span className="visually-hidden">Medium</span>
          </a>
        )} */}
      </div>
    </Flex>
  );
};

export default Footer;

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
