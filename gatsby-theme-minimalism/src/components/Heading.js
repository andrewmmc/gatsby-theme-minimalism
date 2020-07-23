import React from 'react';
import slugify from 'slugify';
import { Heading, Icon, PseudoBox } from '@chakra-ui/core';

export const StyledHeading = ({ children, ...props }) => (
  <Heading as="h1" size="xl" mb={4} {...props}>
    {children}
  </Heading>
);

export const LinkedHeading = ({ children, ...props }) => {
  let extraProps = {};
  const isText = children && children[0] && typeof children[0] === 'string';
  if (isText) extraProps = { id: `${slugify(children[0], { lower: true })}` };
  return (
    <StyledHeading
      css={{ '&[id]:hover a': { opacity: 1 } }}
      {...extraProps}
      {...props}
    >
      {children}
      {isText && (
        <PseudoBox
          aria-label="anchor"
          as="a"
          color="primary.500"
          outline="none"
          _focus={{
            opacity: 1,
            boxShadow: 'outline',
          }}
          opacity={0}
          href={`#${extraProps.id}`}
        >
          <Icon name="link" mx={2} mb={1} />
        </PseudoBox>
      )}
    </StyledHeading>
  );
};

export default StyledHeading;
