import React from 'react';
import { Box } from '@chakra-ui/core';

/**
 * The style of this component is inspired by Tailwind UI.
 * @see https://tailwindui.com/components/application-ui/tables/wide
 */

export const Table = (props) => {
  return (
    <Box borderWidth="1px" rounded="lg" overflow="hidden">
      <Box as="table" width="full" {...props} />
    </Box>
  );
};

export const TableHead = (props) => {
  return <Box as="thead" {...props} />;
};

export const TableRow = (props) => {
  return <Box as="tr" bg="white" {...props} />;
};

export const TableHeader = (props) => {
  return (
    <Box
      as="th"
      px="6"
      py="3"
      borderBottomWidth="1px"
      backgroundColor="gray.50"
      textAlign="left"
      fontSize="xs"
      color="gray.500"
      textTransform="uppercase"
      letterSpacing="wider"
      lineHeight="1rem"
      fontWeight="medium"
      {...props}
    />
  );
};

export const TableBody = (props) => {
  return <Box as="tbody" {...props} />;
};

export const TableCell = (props) => {
  return (
    <Box
      as="td"
      px="6"
      py="4"
      lineHeight="1.25rem"
      whiteSpace="nowrap"
      {...props}
    />
  );
};

export default {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
};
