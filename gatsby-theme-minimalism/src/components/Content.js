import React from 'react';
import rehypeReact from 'rehype-react';
import {
  Box,
  Code,
  Divider,
  Heading,
  Icon,
  Link,
  List,
  ListItem,
  Text,
} from '@chakra-ui/core';

import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from './Table';

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    h1: (props) => <Heading as="h1" size="xl" my={4} {...props} />,
    h2: (props) => <Heading as="h2" size="lg" my={4} {...props} />,
    h3: (props) => <Heading as="h3" size="md" my={4} {...props} />,
    h4: (props) => <Heading as="h4" size="sm" my={4} {...props} />,
    h5: (props) => <Heading as="h5" size="xs" my={4} {...props} />,
    h6: (props) => <Heading as="h6" size="xs" my={4} {...props} />,
    hr: (props) => <Divider borderColor="gray.400" my={4} {...props} />,
    p: (props) => <Text lineHeight="tall" my={4} {...props} />,
    ul: (props) => <List styleType="disc" my={4} spacing={3} {...props} />,
    li: (props) => <ListItem {...props} />,
    ol: (props) => (
      <List as="ol" styleType="decimal" my={4} spacing={3} {...props} />
    ),
    code: (props) =>
      props.className ? (
        <pre {...props} />
      ) : (
        <Code {...props} borderWidth="1px" />
      ),
    table: (props) => <Table {...props} />,
    thead: (props) => <TableHead {...props} />,
    tr: (props) => <TableRow {...props} />,
    th: (props) => <TableHeader {...props} />,
    tbody: (props) => <TableBody {...props} />,
    td: (props) => <TableCell {...props} />,
    a: (props) => {
      if (props.href && props.href.startsWith('http')) {
        const { children, ...remainProps } = props;
        return (
          <Link color="primary.500" {...remainProps} isExternal>
            {children}
            <Icon name="external-link" mx={2} mb={1} />
          </Link>
        );
      }
      return <Link color="primary.500" {...props} />;
    },
    img: (props) => <Box as="img" rounded="sm" {...props} />,
    figure: (props) => <Box as="figure" textAlign="center" my={4} {...props} />,
    figcaption: (props) => (
      <Text as="figcaption" fontSize="sm" color="gray.500" mt={4} {...props} />
    ),
  },
}).Compiler;

const Content = ({ htmlAst, ...props }) => {
  return (
    <Box {...props}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          pre.grvsc-container {
            margin: 2rem 0;
            box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06);
          }
`,
        }}
      />
      {renderAst(htmlAst)}
    </Box>
  );
};

export default Content;
