import React from 'react';
import rehypeReact from 'rehype-react';
import { Code, Divider, Heading, List, ListItem, Text } from '@chakra-ui/core';

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    h1: props => <Heading as="h1" size="xl" my={4} {...props} />,
    h2: props => <Heading as="h2" size="lg" my={4} {...props} />,
    h3: props => <Heading as="h3" size="md" my={4} {...props} />,
    h4: props => <Heading as="h4" size="sm" my={4} {...props} />,
    h5: props => <Heading as="h5" size="xs" my={4} {...props} />,
    h6: props => <Heading as="h6" size="xs" my={4} {...props} />,
    hr: props => <Divider {...props} my={4} />,
    p: props => <Text {...props} my={4} />,
    ul: props => <List styleType="disc" {...props} my={4} />,
    li: props => <ListItem {...props} my={4} />,
    ol: props => <List as="ol" styleType="decimal" {...props} my={4} />,
    code: props => <Code {...props} />,
  },
}).Compiler;

const Content = ({ htmlAst }) => {
  return renderAst(htmlAst);
};

export default Content;
