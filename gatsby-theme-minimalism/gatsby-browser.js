/* eslint-disable react/prop-types, import/prefer-default-export */

import React from 'react';
import { ThemeProvider } from '@chakra-ui/core';

// custom typefaces
// import 'typeface-montserrat';
// import 'typeface-merriweather';

// PrismJS theme
// import 'prismjs/themes/prism.css';
// import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

// import Theme from './src/components/Theme';

export const wrapPageElement = ({ element, props }) => {
  return <ThemeProvider {...props}>{element}</ThemeProvider>;
};

/* eslint-enable */
