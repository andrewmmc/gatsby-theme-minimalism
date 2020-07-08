import React from 'react';
import { Box } from '@chakra-ui/core';

const Container = ({ children, ...props }) => (
  <Box maxW="5xl" w="100%" {...props}>
    {children}
  </Box>
);

export default Container;
