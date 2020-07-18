import React from 'react';
import {
  Box,
  Heading,
  Text,
  FormControl,
  FormHelperText,
  Input,
  Button,
  Grid,
} from '@chakra-ui/core';
import useThemeConfig from 'hooks/useThemeConfig';

const Signup = (props) => {
  const { convertKitFormId } = useThemeConfig();
  if (!convertKitFormId) return null;
  return (
    <Box
      borderWidth="1px"
      rounded="lg"
      shadow="sm"
      bg="white"
      p={6}
      overflow="hidden"
      {...props}
    >
      <Heading as="h3" size="md" mb={2}>
        Subscribe to the Newsletter
      </Heading>
      <Text mb={4}>Subscribe to get my latest content by email.</Text>
      <FormControl mb={4}>
        <form
          action={`//app.convertkit.com/forms/${convertKitFormId}/subscriptions`}
          method="post"
        >
          <Grid
            gridTemplateColumns={['1fr', '1fr 1fr 0.8fr']}
            gridTemplateRows={['1fr 1fr 1fr', '1fr']}
            gap={4}
          >
            <Input
              type="text"
              className="formkit-input"
              name="fields[first_name]"
              aria-label="Your name"
              placeholder="Your name"
              required
            />
            <Input
              type="email"
              className="formkit-input"
              name="email_address"
              aria-label="Your email"
              placeholder="Your email"
              required
            />
            <Button
              type="submit"
              data-element="submit"
              className="formkit-submit"
            >
              Subscribe Now
            </Button>
          </Grid>
        </form>
      </FormControl>
      <FormHelperText>
        No spam - You can unsubscribe at any time.
      </FormHelperText>
    </Box>
  );
};

export default Signup;
