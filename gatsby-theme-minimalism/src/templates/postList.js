import React, { useState } from 'react';
import { shape, arrayOf, string } from 'prop-types';
import { Link as GatsbyLink } from 'gatsby';
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

const PostList = ({
  posts = [],
  postCategories = [],
  searchPlaceholder = '',
  notFoundText = '',
  showSearchFilter = true,
  showCategoryFilter = true,
}) => {
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
    <>
      {showSearchFilter && (
        <InputGroup mb={6}>
          <Input
            value={query}
            onChange={handleSearchFilter}
            placeholder={searchPlaceholder}
            size="md"
          />
          <InputRightElement
            children={<Icon name="search" color="gray.300" />}
          />
        </InputGroup>
      )}
      {showCategoryFilter && postCategories.length > 0 && (
        <Flex my={4} flexWrap="wrap">
          {postCategories.map((item, idx) => (
            <Link
              onClick={toggleCategoryFilter}
              mr={2}
              mb={2}
              key={`tag_${idx}`}
            >
              <Tag
                size="sm"
                variantColor={item.fieldValue === category ? `primary` : `gray`}
              >
                {item.fieldValue}
              </Tag>
            </Link>
          ))}
        </Flex>
      )}
      <List mb={4}>
        {results.length > 0 ? (
          results.map(({ node }, idx) => {
            const title = node.frontmatter.title || node.fields.slug;
            const { date } = node.frontmatter;
            const { readingTime } = node.fields;
            return (
              <ListItem mb={6} key={`post_${idx}`}>
                <Stack spacing={1}>
                  <Stack isInline spacing={4} color="gray.500" fontSize="sm">
                    <Text as="time">{date}</Text>
                    <Text as="span">{readingTime.text}</Text>
                  </Stack>
                  <Heading as="h2" size="md">
                    <Link as={GatsbyLink} to={node.fields.slug}>
                      {title}
                    </Link>
                  </Heading>
                </Stack>
              </ListItem>
            );
          })
        ) : (
          <Text>{notFoundText}</Text>
        )}
      </List>
    </>
  );
};

PostList.propTypes = {
  posts: arrayOf(shape({})).isRequired,
  postCategories: arrayOf(shape({})),
  searchPlaceholder: string,
  notFoundText: string,
};

PostList.defaultProps = {
  postCategories: undefined,
  searchPlaceholder: undefined,
  notFoundText: undefined,
};

export default PostList;
