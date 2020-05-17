import React, { useState, useEffect } from 'react';
import { node } from 'prop-types';
import { ThemeProvider } from 'styled-components';

import useThemeConfig from 'hooks/useThemeConfig';
import light from 'themes/light';
import dark from 'themes/dark';

const Theme = ({ children, ...props }) => {
  const { darkTheme = false } = useThemeConfig();
  const [isInDark, setInDark] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      setInDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  const enableDarkMode = !darkTheme && isInDark;

  return (
    <ThemeProvider theme={enableDarkMode ? dark : light} {...props}>
      {children}
    </ThemeProvider>
  );
};

Theme.propTypes = {
  children: node.isRequired,
};

export default Theme;
