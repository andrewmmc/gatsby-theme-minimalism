import React from 'react';
import { string, bool } from 'prop-types';
import { Stack, Link } from '@chakra-ui/core';

const Feedback = ({ siteUrl, slug, showTwitter = true, showGitHub = true }) => {
  return (
    <>
      <Stack isInline spacing={4}>
        {showTwitter && (
          <Link
            color="primary.500"
            fontSize="sm"
            href={`https://twitter.com/search?q=${encodeURI(siteUrl + slug)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Discuss on Twitter
          </Link>
        )}
        {showGitHub && (
          <Link
            color="primary.500"
            fontSize="sm"
            href={`https://github.com/andrewmmc/andrewmmc.com/edit/master/content${slug}index.md`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Edit on GitHub
          </Link>
        )}
      </Stack>
    </>
  );
};

Feedback.propTypes = {
  siteUrl: string.isRequired,
  slug: string.isRequired,
  showTwitter: bool,
  showGitHub: bool,
  showConvertKitForm: bool,
};

Feedback.defaultProps = {
  showTwitter: true,
  showGitHub: true,
  showConvertKitForm: true,
};

export default Feedback;
