import React from 'react';
import { node, bool } from 'prop-types';

import Container from './Container';

const Layout = ({ withContainer = true, children, ...props }) =>
  withContainer ? (
    <Container tabindex="-1" as="main" {...props}>
      {children}
    </Container>
  ) : (
    children
  );

Layout.defaultProps = {
  withContainer: true,
};

Layout.propTypes = {
  withContainer: bool,
  children: node.isRequired,
};

export default Layout;
