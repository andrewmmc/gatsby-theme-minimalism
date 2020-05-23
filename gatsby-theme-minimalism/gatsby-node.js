const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;
  const blogTemplate = require.resolve('./src/templates/blog.js');
  const categoryTemplate = require.resolve('./src/templates/category.js');

  // redirect /blog to home page
  createRedirect({
    fromPath: '/blog',
    toPath: '/',
    isPermanent: true,
    redirectInBrowser: true,
    force: true,
  });

  createRedirect({
    fromPath: '/blog/',
    toPath: '/',
    isPermanent: true,
    redirectInBrowser: true,
    force: true,
  });

  // Create blog pages
  const blogResults = await graphql(blogQuery);

  if (blogResults.errors) {
    throw blogResults.errors;
  }

  const blogPosts = blogResults.data.allMarkdownRemark.edges;
  blogPosts.forEach((post, index) => {
    const { slug } = post.node.fields;
    const previous =
      index === blogPosts.length - 1 ? null : blogPosts[index + 1].node;
    const next = index === 0 ? null : blogPosts[index - 1].node;
    createPage({
      path: slug,
      component: blogTemplate,
      context: {
        slug,
        previous,
        next,
      },
    });
  });

  // Create category pages
  const categoryResults = await graphql(categoryQuery);

  if (categoryResults.errors) {
    throw categoryResults.errors;
  }

  const categoryList = categoryResults.data.allMarkdownRemark.group;
  categoryList.forEach(category => {
    createPage({
      path: `category/${category.fieldValue}`,
      component: categoryTemplate,
      context: {
        category: category.fieldValue,
        count: category.totalCount,
      },
    });
  });

  return true;
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  fmImagesToRelative(node);

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode });
    createNodeField({
      name: 'slug',
      node,
      value: slug,
    });

    let type;
    const { dir, base } = path.parse(slug);
    if (dir === '/') {
      type = base;
    } else {
      [, type] = dir.split('/');
    }

    createNodeField({
      node,
      name: 'type',
      value: type,
    });
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type ThemeConfig implements Node {
      siteName: String
      convertKitFormId: String
      likeCoinId: String
      mapId: String
      darkTheme: Boolean
      compactMode: Boolean
      showIntro: Boolean
    }

    type Social implements Node {
      github: String
      linkedin: String
      facebook: String
      instagram: String
      twitter: String
      medium: String
    }

    type SiteSiteMetadata implements Node {
      title: String
      author: String
      authorDescription: String
      description: String
      siteUrl: String
      seoKeywords: [String]
      location: String
      email: String
      social: Social
    }

    type MarkdownRemarkFrontmatter implements Node {
      title: String
      featuredImage: File @fileByRelativePath
      category: [String]
    }
  `;
  createTypes(typeDefs);
};

exports.sourceNodes = ({ actions, createContentDigest }, themeConfig = {}) => {
  const { createNode } = actions;

  createNode({
    ...themeConfig,
    id: `gatsby-theme-minimalism`,
    parent: null,
    children: [],
    internal: {
      type: `ThemeConfig`,
      contentDigest: createContentDigest(themeConfig),
      content: JSON.stringify(themeConfig),
      description: `Options for gatsby-theme-minimalism`,
    },
  });
};

const blogQuery = `
  {
    allMarkdownRemark(
      filter: { fields: { type: { eq: "blog" } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1000
    ) {
      edges {
        node {
          fields {
            slug
            type
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;

const categoryQuery = `
{
  allMarkdownRemark(filter: {fields: {type: {eq: "blog"}}}, limit: 1000) {
    group(field: frontmatter___category) {
      fieldValue
      totalCount
    }
  }
}
`;
