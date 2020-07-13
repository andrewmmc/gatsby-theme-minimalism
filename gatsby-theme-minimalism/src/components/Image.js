import React from 'react';
import { shape } from 'prop-types';
import { Box } from '@chakra-ui/core';
import Image from 'gatsby-background-image';

export const BackgroundImage = ({ fluid, fixed, ...props }) => {
  return null;
  return (
    <Box w="100%" h={[250, 450]}>
      <Image
        fluid={fluid}
        fixed={fixed}
        style={{ height: '100%' }}
        {...props}
      />
    </Box>
  );
};

export const FeatureImage = ({ fluid, fixed, ...props }) => {
  return (
    <Box w="100%" h={[180, 250]} rounded="sm" overflow="hidden">
      <Image
        fluid={fluid}
        fixed={fixed}
        style={{ height: '100%' }}
        {...props}
      />
    </Box>
  );
};

BackgroundImage.defaultProps = {
  fluid: undefined,
  fixed: undefined,
};

BackgroundImage.propTypes = {
  fluid: shape({}),
  fixed: shape({}),
};

export default BackgroundImage;
