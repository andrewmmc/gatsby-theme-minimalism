import styled from 'styled-components';
import { theme } from '@chakra-ui/core';

export const Main = styled.div``;

export const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    primary: {
      50: '#ebf8ff',
      100: '#ceedff',
      200: '#90cdf4',
      300: '#63b3ed',
      400: '#4299e1',
      500: '#3182ce',
      600: '#2a69ac',
      700: '#1e4e8c',
      800: '#153e75',
      900: '#1a365d',
    },
  },
};

export default customTheme;
