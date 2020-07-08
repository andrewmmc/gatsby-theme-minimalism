/* eslint-disable react/prop-types, import/prefer-default-export */
import React from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';

import { customTheme } from './src/themes/styles';

export const wrapPageElement = ({ element, props }) => {
  return (
    <ThemeProvider theme={customTheme} {...props}>
      <CSSReset />
      {element}
    </ThemeProvider>
  );
};

/* eslint-enable */
