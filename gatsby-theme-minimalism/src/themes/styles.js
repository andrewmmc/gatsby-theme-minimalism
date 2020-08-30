import { theme } from '@chakra-ui/core';

const greyScaleColors = {
  50: '#f2f2f2',
  100: '#f2f2f2',
  200: '#e6e6e6',
  300: '#b3b3b3',
  400: '#b3b3b3',
  500: '#333333',
  600: '#333333',
  700: '#333333',
  800: '#333333',
  900: '#333333',
};

export const customTheme = {
  ...theme,
  colors: {
    whiteAlpha: theme.colors.whiteAlpha,
    blackAlpha: theme.colors.blackAlpha,
    primary: greyScaleColors,
    gray: greyScaleColors,
    red: greyScaleColors,
    orange: greyScaleColors,
    yellow: greyScaleColors,
    green: greyScaleColors,
    teal: greyScaleColors,
    blue: greyScaleColors,
    cyan: greyScaleColors,
    purple: greyScaleColors,
    pink: greyScaleColors,
    linkedin: greyScaleColors,
    facebook: greyScaleColors,
    messenger: greyScaleColors,
    whatsapp: greyScaleColors,
    twitter: greyScaleColors,
    telegram: greyScaleColors,
  },
  shadows: {
    ...theme.shadows,
    outline: "0 0 0 2px rgba(179, 179, 179, 0.6)",
  }
};

export default customTheme;
