const siteName = 'Example Site';

module.exports = {
  siteMetadata: {
    title: siteName,
    author: 'Author Name',
    authorDescription: 'Author description here!',
    description: 'Site description.',
    siteUrl: 'https://examplesite.com',
    seoKeywords: [],
    location: 'Hong Kong',
    email: 'no-reply@email.com',
    social: {
      github: 'github',
      linkedin: 'linkedin',
      facebook: 'facebook',
      instagram: 'instagram',
      twitter: 'twitter',
      medium: 'medium',
    },
  },
  plugins: [
    {
      resolve: 'gatsby-theme-minimalism',
      options: {
        siteName,
        convertKitFormId: '123',
        mapId: '',
      },
    },
  ],
};
