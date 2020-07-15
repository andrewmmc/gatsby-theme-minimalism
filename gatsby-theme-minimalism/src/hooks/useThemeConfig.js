import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const useThemeConfig = () => {
  const data = useStaticQuery(graphql`
    query {
      themeConfig(id: { eq: "gatsby-theme-minimalism" }) {
        siteName
        convertKitFormId
        mapId
      }
    }
  `);

  return data.themeConfig;
};

export default useThemeConfig;
