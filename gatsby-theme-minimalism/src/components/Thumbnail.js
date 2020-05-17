import React from 'react';
import { bool, shape } from 'prop-types';
import styled, { css } from 'styled-components';
import media from 'styled-media-query';
import Image from 'gatsby-image';

const PlaceHolder = styled.div`
  padding: 0;
  width: 100%;
  height: 250px;
  background-color: ${({ theme }) => theme.lightGrayColor};

  ${media.greaterThan('small')`
    height: 450px;
  `};

  ${({ auto }) =>
    auto &&
    css`
      height: auto !important;
      padding: 62% 0 0 0 !important;
    `}
`;

const StyledBackgroundImage = styled(Image).attrs(({ theme }) => ({
  backgroundColor: theme.lightGrayColor,
}))`
  position: absolute;
  padding: ${({ auto }) => (auto ? '62% 0 0 0' : '0')};
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ auto }) => (auto ? '0' : '250px')};
  background-position: center;
  z-index: -1;

  ${media.greaterThan('small')`
    height: ${({ auto }) => (auto ? '0' : '400px')};
  `};

  /* Adjust image positioning (if image covers area with defined height) */
  & > img {
    object-fit: ${({ fit }) => fit || 'cover'} !important;
    object-position: ${({ position }) => position || '50% 50%'} !important;
  }
`;

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
