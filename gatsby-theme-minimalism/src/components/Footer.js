import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import rgba from 'polished/lib/color/rgba';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faRss } from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faTwitter,
  faFacebook,
  faInstagram,
  faLinkedin,
  faMedium,
} from '@fortawesome/free-brands-svg-icons';

import { Container } from 'themes/styles';

const Footer = props => {
  const data = useStaticQuery(pageQuery);
  const { social } = data.site.siteMetadata;
  const { github, linkedin, facebook, instagram, twitter, medium } = social;

  return (
    <StyledFooter {...props}>
      <StyledContainer>
        <div>© {new Date().getFullYear()}</div>
        <SocialMedia>
          <a
            href="/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="RSS"
          >
            <Icon icon={faRss} />
            <span className="visually-hidden">RSS</span>
          </a>
          {github && (
            <a
              href={`https://github.com/${github}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Icon icon={faGithub} />
              <span className="visually-hidden">GitHub</span>
            </a>
          )}
          {twitter && (
            <a
              href={`https://twitter.com/${twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <Icon icon={faTwitter} />
              <span className="visually-hidden">Twitter</span>
            </a>
          )}
          {facebook && (
            <a
              href={`https://facebook.com/${facebook}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Icon icon={faFacebook} />
              <span className="visually-hidden">Facebook</span>
            </a>
          )}
          {instagram && (
            <a
              href={`https://instagram.com/${instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Icon icon={faInstagram} />
              <span className="visually-hidden">Instagram</span>
            </a>
          )}
          {linkedin && (
            <a
              href={`https://linkedin.com/in/${linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Linkedin"
            >
              <Icon icon={faLinkedin} />
              <span className="visually-hidden">Linkedin</span>
            </a>
          )}
          {medium && (
            <a
              href={`https://medium.com/${medium}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Medium"
            >
              <Icon icon={faMedium} />
              <span className="visually-hidden">Medium</span>
            </a>
          )}
        </SocialMedia>
      </StyledContainer>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  padding: 1rem 0;
  color: ${({ theme }) => theme.primaryTextColor};
`;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
`;

const SocialMedia = styled.div`
  font-size: 1.2rem;
  display: flex;
  justify-content: flex-end;

  a {
    width: 50px;
    height: 100%;
    display: inline-block;
    padding: 0 1rem;
    border-bottom: none;

    &:hover,
    &:focus,
    &:active {
      background: none;
      border-bottom: none;
    }
  }

  span.visually-hidden {
    display: none;
  }
`;

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
