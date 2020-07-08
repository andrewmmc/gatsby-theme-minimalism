import React from 'react';
import { bool, shape } from 'prop-types';
import styled, { css } from 'styled-components';
import media from 'styled-media-query';
import Image from 'gatsby-image';

const PlaceHolder = styled.div``;

const StyledBackgroundImage = styled(Image)``;

const Thumbnail = ({ fluid, auto, ...props }) => {
  if (fluid) {
    return <StyledBackgroundImage fluid={fluid} auto={auto} {...props} />;
  }

  return <PlaceHolder auto={auto} {...props} />;
};

Thumbnail.defaultProps = {
  fluid: undefined,
  auto: false,
};

Thumbnail.propTypes = {
  fluid: shape({}),
  auto: bool,
};

export default Thumbnail;
