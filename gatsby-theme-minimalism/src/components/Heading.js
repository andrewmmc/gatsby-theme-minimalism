import React from 'react';
import { Heading } from '@chakra-ui/core';

const StyledHeading = ({ children, ...props }) => (
  <Heading as="h1" size="xl" mb={[2, 6]} {...props}>
    {children}
  </Heading>
);

export default StyledHeading;
