import React from 'react';
import { Box } from '@chakra-ui/core';

const Container = ({ children, ...props }) => (
  <Box maxW="2xl" px="4" py="12" m="0 auto" w="100%" {...props}>
    {children}
  </Box>
);

export default Container;
