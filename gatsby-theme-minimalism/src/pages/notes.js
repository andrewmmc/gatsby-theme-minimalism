import React, { useState } from 'react';
import { shape } from 'prop-types';
import { Link as GatsbyLink, graphql } from 'gatsby';
import {
  Icon,
  Flex,
  Link,
  List,
  ListItem,
  Input,
  InputGroup,
  InputRightElement,
  Tag,
  Text,
  Stack,
} from '@chakra-ui/core';
import Heading from 'components/Heading';
import Layout from 'components/Layout';
import Seo from 'components/Seo';

const Notes = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;
  const categories = data.allMarkdownRemark.group || [];
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const isEmptySearchFilter = query === '';
  const isEmptyCategoryFilter = category === '';

  const handleSearchFilter = (e) => {
    const searchText = (e.target.value || '').toLowerCase();
    setQuery(searchText);
  };

  const toggleCategoryFilter = (e) => {
    const categoryText = e.target.innerText;
    if (categoryText === category) {
      setCategory(''); // reset filter
    } else {
      setCategory(categoryText);
    }
  };

  const results = posts
    .filter(({ node }) => {
      const postCategory = node.frontmatter.category || [];
      return isEmptyCategoryFilter || postCategory.includes(category);
    })
    .filter(({ node }) => {
      const title = (node.frontmatter.title || node.fields.slug).toLowerCase();
      return isEmptySearchFilter || title.includes(query);
    });

  return (
    <Layout>
      <Seo title="Blog" />
      <Heading>Unorganized Notes</Heading>
      <InputGroup mb={6}>
        <Input
          value={query}
          onChange={handleSearchFilter}
          placeholder="Search notes"
          size="md"
        />
        <InputRightElement children={<Icon name="search" color="gray.300" />} />
      </InputGroup>
      <Flex my={4} flexWrap="wrap">
        {categories.map((item, idx) => (
          <Link onClick={toggleCategoryFilter} mr={2} mb={2} key={`tag_${idx}`}>
            <Tag
              size="sm"
              variantColor={item.fieldValue === category ? `primary` : `gray`}
            >
              {item.fieldValue}
            </Tag>
          </Link>
        ))}
      </Flex>
      <List mb={4}>
        {results.length > 0 ? (
          results.map(({ node }, idx) => {
            const title = node.frontmatter.title || node.fields.slug;
            const { date } = node.frontmatter;
            const { readingTime } = node.fields;
            return (
              <ListItem mb={6} key={`blog_post_${idx}`}>
                <Stack spacing={1}>
                  <Stack isInline spacing={4} color="gray.500" fontSize="sm">
                    <Text as="time">{date}</Text>
                    <Text as="span">{readingTime.text}</Text>
                  </Stack>
                  <Heading as="h3" size="md">
                    <Link as={GatsbyLink} to={node.fields.slug}>
                      {title}
                    </Link>
                  </Heading>
                </Stack>
              </ListItem>
            );
          })
        ) : (
          <Text>No notes found.</Text>
        )}
      </List>
    </Layout>
  );
};

Notes.propTypes = {
  data: shape({}).isRequired,
};

export default Notes;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { fields: { type: { eq: "notes" } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1000
    ) {
      edges {
        node {
          excerpt(truncate: true)
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            category
          }
        }
      }
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`;
