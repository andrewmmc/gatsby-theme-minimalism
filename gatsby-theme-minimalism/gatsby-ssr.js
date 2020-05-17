/* eslint-disable react/prop-types, import/prefer-default-export */

import React from 'react';
import Theme from './src/components/Theme';

export const wrapPageElement = ({ element, props }) => {
  return <Theme {...props}>{element}</Theme>;
};

/* eslint-enable */
