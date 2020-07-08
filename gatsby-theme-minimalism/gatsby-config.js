const path = require('path');

module.exports = options => {
  const { siteName = '' } = options;
  return {
    plugins: [
      {
        resolve: 'gatsby-plugin-root-import',
        options: {
          hooks: path.join(__dirname, 'src/hooks'),
          components: path.join(__dirname, 'src/components'),
          pages: path.join(__dirname, 'src/pages'),
          templates: path.join(__dirname, 'src/templates'),
          themes: path.join(__dirname, 'src/themes'),
        },
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: options.contentPath || `content`,
          name: 'content',
        },
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: options.assetPath || `assets`,
          name: 'assets',
        },
      },
      {
        resolve: 'gatsby-transformer-remark',
        options: {
          plugins: [
            {
              resolve: 'gatsby-remark-relative-images',
            },
            {
              resolve: 'gatsby-remark-images',
              options: {
                maxWidth: 590,
                linkImagesToOriginal: false,
                showCaptions: true,
                quality: 90,
              },
            },
            {
              resolve: 'gatsby-remark-responsive-iframe',
              options: {
                wrapperStyle: 'margin-bottom: 1.0725rem',
              },
            },
            'gatsby-remark-prismjs',
            'gatsby-remark-copy-linked-files',
            'gatsby-remark-smartypants',
            'gatsby-remark-reading-time',
          ],
        },
      },
      'gatsby-transformer-sharp',
      'gatsby-plugin-sharp',
      {
        resolve: 'gatsby-plugin-google-fonts',
        options: {
          fonts: ['Inter:400,600,700'],
          display: 'swap',
        },
      },
      {
        resolve: `gatsby-plugin-feed`,
        options: {
          query: `
            {
              site {
                siteMetadata {
                  title
                  description
                  siteUrl
                  site_url: siteUrl
                }
              }
            }
          `,
          feeds: [
            {
              serialize: ({ query: { site, allMarkdownRemark } }) => {
                return allMarkdownRemark.edges.map(edge => {
                  return {
                    ...edge.node.frontmatter,
                    description: edge.node.excerpt,
                    date: edge.node.frontmatter.date,
                    url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                    guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                    custom_elements: [{ 'content:encoded': edge.node.html }],
                  };
                });
              },
              query: `
                {
                  allMarkdownRemark(
                    filter: { fields: { type: { eq: "blog" } } }
                    sort: { fields: [frontmatter___date], order: DESC }
                    limit: 1000
                  ) {
                    edges {
                      node {
                        excerpt(truncate: true)
                        html
                        fields { 
                          slug
                          type
                        }
                        frontmatter {
                          title
                          date
                        }
                      }
                    }
                  }
                }
              `,
              output: '/rss.xml',
              title: siteName,
            },
          ],
        },
      },
      'gatsby-plugin-react-helmet',
      // {
      //   resolve: 'gatsby-plugin-typography',
      //   options: {
      //     pathToConfigModule: require.resolve('./src/themes/typography'),
      //   },
      // },
      'gatsby-plugin-styled-components',
    ],
  };
};
