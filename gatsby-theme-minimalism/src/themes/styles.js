import { theme } from '@chakra-ui/core';

const greyScaleColors = {
  50: '#F2F2F2',
  100: '#F2F2F2',
  200: '#E6E6E6',
  300: '#B3B3B3',
  400: '#8A8A8A',
  500: '#555555',
  600: '#333333',
  700: '#333333',
  800: '#222222',
  900: '#000000',
};

const primaryColors = {
  50: '#eeebe5',
  100: '#eeebe5',
  200: '#ded7ca',
  300: '#cdc2b0',
  400: '#bdae95',
  500: '#ac9a7b',
  600: '#8a7b62',
  700: '#675c4a',
  800: '#453e31',
  900: '#221f19',
};

export const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    whiteAlpha: theme.colors.whiteAlpha,
    blackAlpha: theme.colors.blackAlpha,
    primary: primaryColors,
    gray: greyScaleColors,
    red: greyScaleColors,
    orange: greyScaleColors,
    yellow: greyScaleColors,
    green: greyScaleColors,
    teal: greyScaleColors,
    blue: primaryColors,
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
    outline: '0 0 0 2px rgba(179, 179, 179, 0.4)',
  },
};

export default customTheme;
