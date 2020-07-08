/* eslint-disable react/prop-types, import/prefer-default-export */

import React from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';

export const wrapPageElement = ({ element, props }) => {
  return (
    <ThemeProvider {...props}>
      <CSSReset />
      {element}
    </ThemeProvider>
  );
};

/* eslint-enable */
