# gatsby-theme-minimalism

![Publish](https://github.com/andrewmmc/gatsby-theme-minimalism/workflows/Publish/badge.svg)

Welcome to `gatsby-theme-minimalism`, a Gatsby theme by [Andrew Mok](https://andrewmmc.com). It's a simple Gatsby theme for blog and static website. Use it easily to create contents by `Markdown`.

<!-- ![Demo](https://github.com/andrewmmc/gatsby-theme-minimalism/raw/master/gatsby-theme-minimalism/README1.png) -->

## Preview

- [Demo Website](https://gatsby-theme-minimalism.andrewmmc.dev)

## 🚀 Getting started

```bash
npm i gatsby-theme-minimalism
## or
yarn gatsby-theme-minimalism
```

## How to use

Edit `gatsby-config.js` and replace `siteMetadata` by the following configs:

```js
module.exports = {
  siteMetadata: {
    title: '',
    author: 'Author Name',
    authorDescription: 'Author description here!',
    description: 'Site description',
    siteUrl: 'https://examplesite.com',
    seoKeywords: [],
    location: 'Hong Kong',
    email: 'no-reply@email.com',
    social: {
      github: 'github',
      linkedin: '',
      facebook: 'facebook',
      instagram: 'instagram',
      twitter: 'twitter',
      medium: '',
    },
  },
};
```

And add the following configs to `plugins` array:

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-theme-minimalism',
      // You can edit the following options, or ignore them if you don't care.
      // Note that siteName is required for RSS.
      options: {
        siteName: '',
        convertKitFormId: '',
        mapId: '',
      },
    },
  ],
};
```

| Options                     | Required? | Description                                                     |
| --------------------------- | --------- | --------------------------------------------------------------- |
| `siteName` (string)         | Y         | Required for RSS                                                |
| `convertKitFormId` (string) | N         | ConvertKit ID for blog posts, will not render if empty          |
| `mapId` (string)            | N         | Google Maps My Maps ID for about page, will not render if empty |

## Writing contents and replacing images

Check `example-site` for the sample folder structure for blog posts, about page and projects page.

You can replace the markdown files in `content` to update your website. You can change the images by replacing images in `assets` folder.

```
.
├── assets
|   ├── about.jpg
|   └── ...
├── content
|   ├── about
|   |   └── index.md
|   ├── blog
|   |   ├── 2020
|   |   |   └── title
|   |   |       └── index.md
|   |   └── ...
|   └── projects
|       └── title
|   |       └── index.md
└── ...
```

## Customizing the theme

To customize the colors used in the theme, shadow the files inside `src/gatsby-theme-minimalism/themes`. To extend the colors usage, import the base colors and export a new color object. Check [Component Shadowing](https://www.gatsbyjs.org/blog/2019-04-29-component-shadowing/) for the usage.

## Author

- [Andrew Mok](https://andrewmmc.com) (@andrewmmc)

## Questions or bugs report?

- Please feel free to [open an issue here](../../issues) or [contact me via email](mailto:hello@andrewmmc.com).
