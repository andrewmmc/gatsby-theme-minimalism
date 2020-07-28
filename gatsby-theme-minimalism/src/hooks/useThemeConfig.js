import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const useThemeConfig = () => {
  const data = useStaticQuery(graphql`
    query {
      themeConfig(id: { eq: "gatsby-theme-minimalism" }) {
        siteName
        mapId
      }
    }
  `);

  return data.themeConfig;
};

export default useThemeConfig;
