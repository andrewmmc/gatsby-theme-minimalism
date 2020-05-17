import Typography from 'typography';

const BASE_FONT_SIZE = 16;

const typography = new Typography({
  baseFontSize: `${BASE_FONT_SIZE}px`,
  baseLineHeight: 1.666,
  headerFontFamily: [
    'Inter UI',
    'Helvetica Neue',
    'Helvetica',
    'Arial',
    'sans-serif',
  ],
  bodyFontFamily: [
    'Inter UI',
    'Helvetica Neue',
    'Helvetica',
    'Arial',
    'sans-serif',
  ],
  overrideStyles: ({ rhythm }) => ({
    body: {
      fontKerning: 'inherit',
    },
    'h1,h2,h3,h4,h5,h6': {
      lineHeight: 1.35,
      marginBottom: '1rem',
    },
    blockquote: {
      marginTop: 0,
      marginRight: 0,
      marginLeft: 0,
      paddingLeft: rhythm(1),
    },
  }),
});

// Hot reload typography in development
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default typography;
export const { rhythm, scale } = typography;
