/* eslint-disable react/prop-types, import/prefer-default-export */
import React, { Fragment } from 'react';
import { ThemeProvider, CSSReset, Box } from '@chakra-ui/core';

import Header from './src/components/Header';
import Footer from './src/components/Footer';
import { customTheme } from './src/themes/styles';

export const wrapPageElement = ({ element }) => {
  return (
    <Fragment>
      <Box bg="gray.50" minHeight="100vh">
        <Header />
        {element}
        <Footer />
      </Box>
    </Fragment>
  );
};

export const wrapRootElement = ({ element, props }) => {
  return (
    <ThemeProvider theme={customTheme} {...props}>
      <CSSReset />
      {element}
    </ThemeProvider>
  );
};

/* eslint-enable */
