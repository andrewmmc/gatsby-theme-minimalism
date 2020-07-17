import React from 'react';
import { string, shape } from 'prop-types';
import { Box, Flex, Heading, Text, Stack } from '@chakra-ui/core';
import { BackgroundImage } from 'components/Image';

const Card = ({ date, readingTime, title, featuredImage, ...props }) => {
  return (
    <Box
      rounded="lg"
      bg="white"
      textAlign="left"
      height="100%"
      minH="300px"
      overflow="hidden"
      {...props}
    >
      {featuredImage && <BackgroundImage height={150} {...featuredImage} />}
      <Stack spacing={1} p={6}>
        <Flex
          color="gray.500"
          fontSize="sm"
          flexDirection={['row', 'column', 'column', 'row']}
        >
          {date && (
            <Text as="time" mr={4}>
              {date}
            </Text>
          )}
          {readingTime && <Text as="span">{readingTime}</Text>}
        </Flex>
        <Heading as="h3" size="md">
          {title}
        </Heading>
      </Stack>
    </Box>
  );
};

Card.propTypes = {
  date: string.isRequired,
  readingTime: string,
  title: string.isRequired,
  featuredImage: shape({}).isRequired,
};

Card.defaultProps = {
  readingTime: undefined,
};

export default Card;
