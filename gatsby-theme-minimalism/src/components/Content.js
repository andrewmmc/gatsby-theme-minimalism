import React from 'react';
import rehypeReact from 'rehype-react';
import {
  Alert,
  Box,
  Code,
  Divider,
  Icon,
  Link,
  List,
  ListItem,
  Text,
} from '@chakra-ui/core';
import { Global, css } from '@emotion/core';

import { LinkedHeading } from './Heading';
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
    h1: (props) => <LinkedHeading as="h1" size="lg" mt={8} mb={4} {...props} />,
    h2: (props) => <LinkedHeading as="h2" size="lg" mt={8} mb={4} {...props} />,
    h3: (props) => <LinkedHeading as="h3" size="md" mt={8} mb={4} {...props} />,
    h4: (props) => <LinkedHeading as="h4" size="sm" mt={8} mb={4} {...props} />,
    h5: (props) => <LinkedHeading as="h5" size="xs" mt={8} mb={4} {...props} />,
    h6: (props) => <LinkedHeading as="h6" size="xs" mt={8} mb={4} {...props} />,
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
          <Link
            color="primary.500"
            {...remainProps}
            overflowWrap="anywhere"
            isExternal
          >
            {children}
            <Icon name="external-link" mx={2} mb={1} />
          </Link>
        );
      }
      return <Link color="primary.500" overflowWrap="anywhere" {...props} />;
    },
    img: (props) => <Box as="img" rounded="sm" {...props} />,
    figure: (props) => <Box as="figure" textAlign="center" my={8} {...props} />,
    figcaption: (props) => (
      <Text as="figcaption" fontSize="sm" color="gray.500" mt={4} {...props} />
    ),
    blockquote: (props) => (
      <Alert
        my={4}
        px={4}
        py={0}
        status="info"
        variant="left-accent"
        flexDirection="column"
        alignItems="flex-start"
        {...props}
      />
    ),
  },
}).Compiler;

const Content = ({ content, isHTMLContent = true, ...props }) => {
  return (
    <Box {...props}>
      <Global
        styles={css`
          pre.grvsc-container {
            margin: 2rem 0;
            border-width: 1px;
            white-space: pre-wrap;
            word-break: break-all;
            overflow: auto;
            max-width: calc(100vw - 2rem);
          }
        `}
      />
      {isHTMLContent ? renderAst(content) : content}
    </Box>
  );
};

export default Content;
