import React from 'react';
import styled from 'styled-components';
import media from 'styled-media-query';
import rgba from 'polished/lib/color/rgba';
import darken from 'polished/lib/color/darken';
import useThemeConfig from 'hooks/useThemeConfig';

const Signup = () => {
  const { convertKitFormId } = useThemeConfig();
  if (!convertKitFormId) return null;
  return (
    <Container>
      <h3>Subscribe to the Newsletter</h3>
      <p>Subscribe to get my latest content by email.</p>
      <StyledForm
        action={`//app.convertkit.com/forms/${convertKitFormId}/subscriptions`}
        method="post"
      >
        <StyledInput
          type="text"
          className="formkit-input"
          name="fields[first_name]"
          aria-label="Your name"
          placeholder="Your name"
          required
        />
        <StyledInput
          type="email"
          className="formkit-input"
          name="email_address"
          aria-label="Your email"
          placeholder="Your email"
          required
        />
        <StyledButton data-element="submit" className="formkit-submit">
          Subscribe Now
        </StyledButton>
      </StyledForm>
      <small>
        <strong>No spam</strong> - You can unsubscribe at any time.
      </small>
    </Container>
  );
};

const Container = styled.div``;

const StyledForm = styled.form``;

const StyledInput = styled.input``;

const StyledButton = styled.button``;

export default Signup;
