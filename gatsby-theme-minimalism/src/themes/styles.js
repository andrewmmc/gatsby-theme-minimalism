import { theme } from '@chakra-ui/core';

const greyScaleColors = {
  50: '#f7f7f7',
  100: '#f5f5f5',
  200: '#dddddd',
  300: '#c4c4c4',
  400: '#acacac',
  500: '#939393',
  600: '#7b7b7b',
  700: '#494949',
  800: '#3b3b3b', // fixed
  900: '#2c2c2c',
};

const primaryColors = {
  50: '#efebde',
  100: '#efebde',
  200: '#dfd6bd',
  300: '#cec29c',
  400: '#bead7b',
  500: '#ae995a',
  600: '#8b7a48',
  700: '#685c36',
  800: '#463d24',
  900: '#231f12',
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
