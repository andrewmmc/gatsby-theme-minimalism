module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/react'],
  rules: {
    'no-use-before-define': 0,
    'import/no-unresolved': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-filename-extension': 0,
  },
  env: {
    browser: true,
    es6: true,
  },
  plugins: ['react'],
  globals: {
    graphql: false,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/resolver': {
      alias: [
        ['hooks', './src/hooks'],
        ['components', './src/components'],
        ['pages', './src/pages'],
        ['templates', './src/templates'],
        ['themes', './src/themes'],
      ],
    },
  },
};
