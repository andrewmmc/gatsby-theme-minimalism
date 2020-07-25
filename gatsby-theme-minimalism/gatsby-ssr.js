/* eslint-disable react/prop-types, import/prefer-default-export */
import React, { Fragment } from 'react';

import Header from './src/components/Header';
import Footer from './src/components/Footer';
import { GlobalStyle } from './src/components/Layout';

export const wrapPageElement = ({ element }) => {
  return (
    <Fragment>
      <Header />
      {element}
      <Footer />
    </Fragment>
  );
};

export const wrapRootElement = ({ element, props }) => {
  return <GlobalStyle {...props}>{element}</GlobalStyle>;
};

/* eslint-enable */
