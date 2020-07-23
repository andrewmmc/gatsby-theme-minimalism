const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const postsTemplate = require.resolve('./src/templates/blog.js');
  const projectsTemplate = require.resolve('./src/templates/projects.js');

  const [blogResults, notesResults, projectsResults] = await Promise.all([
    graphql(blogQuery),
    graphql(notesQuery),
    graphql(projectsQuery),
  ]);

  if (blogResults.errors) {
    throw blogResults.errors;
  }

  if (notesResults.errors) {
    throw notesResults.errors;
  }

  if (projectsResults.errors) {
    throw projectsResults.errors;
  }

  const blogPosts = blogResults.data.allMarkdownRemark.edges;
  blogPosts.forEach((post, index) => {
    const { slug } = post.node.fields;
    const previous =
      index === blogPosts.length - 1 ? null : blogPosts[index + 1].node;
    const next = index === 0 ? null : blogPosts[index - 1].node;
    createPage({
      path: slug,
      component: postsTemplate,
      context: {
        slug,
        previous,
        next,
      },
    });
  });

  const notesPosts = notesResults.data.allMarkdownRemark.edges;
  notesPosts.forEach((post, index) => {
    const { slug } = post.node.fields;
    const previous =
      index === notesPosts.length - 1 ? null : notesPosts[index + 1].node;
    const next = index === 0 ? null : notesPosts[index - 1].node;
    createPage({
      path: slug,
      component: postsTemplate,
      context: {
        slug,
        previous,
        next,
      },
    });
  });

  const projectPosts = projectsResults.data.allMarkdownRemark.edges;
  projectPosts.forEach((post, index) => {
    const { slug } = post.node.fields;
    const previous =
      index === projectPosts.length - 1 ? null : projectPosts[index + 1].node;
    const next = index === 0 ? null : projectPosts[index - 1].node;
    createPage({
      path: slug,
      component: projectsTemplate,
      context: {
        slug,
        previous,
        next,
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
      likeCoinId: String
      mapId: String
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
      description: String
      canonical: String
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
      filter: { fields: { type: { in: "blog" } } }
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

const notesQuery = `
  {
    allMarkdownRemark(
      filter: { fields: { type: { in: "notes" } } }
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

const projectsQuery = `
  {
    allMarkdownRemark(
      filter: { fields: { type: { eq: "projects" } } }
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
