import React from 'react';
import { string, shape } from 'prop-types';
import { Box, Heading, Text, Stack } from '@chakra-ui/core';
import { BackgroundImage } from 'components/Image';

const Card = ({ date, readingTime, title, featuredImage, ...props }) => {
  return (
    <Box
      rounded="lg"
      bg="white"
      textAlign="left"
      height="100%"
      overflow="hidden"
      {...props}
    >
      {featuredImage && <BackgroundImage height={150} {...featuredImage} />}
      <Stack spacing={1} p={6}>
        <Stack isInline spacing={4} color="gray.500" fontSize="sm">
          <Text as="time">{date}</Text>
          <Text as="span">{readingTime}</Text>
        </Stack>
        <Heading as="h3" size="md">
          {title}
        </Heading>
      </Stack>
    </Box>
  );
};

Card.propTypes = {
  date: string.isRequired,
  readingTime: string.isRequired,
  title: string.isRequired,
  featuredImage: shape({}).isRequired,
};

export default Card;
