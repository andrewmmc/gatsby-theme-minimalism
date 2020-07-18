import React from 'react';
import rehypeReact from 'rehype-react';
import {
  Alert,
  Box,
  Code,
  Divider,
  Heading,
  PseudoBox,
  Icon,
  Link,
  List,
  ListItem,
  Text,
} from '@chakra-ui/core';
import { Global, css } from '@emotion/core';

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
    h1: (props) => <Heading as="h1" size="lg" mt={8} mb={4} {...props} />,
    h2: (props) => <Heading as="h2" size="lg" mt={8} mb={4} {...props} />,
    h3: (props) => <Heading as="h3" size="md" mt={8} mb={4} {...props} />,
    h4: (props) => <Heading as="h4" size="sm" mt={8} mb={4} {...props} />,
    h5: (props) => <Heading as="h5" size="xs" mt={8} mb={4} {...props} />,
    h6: (props) => <Heading as="h6" size="xs" mt={8} mb={4} {...props} />,
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
            overflowWrap="break-word"
            isExternal
          >
            {children}
            <Icon name="external-link" mx={2} mb={1} />
          </Link>
        );
      }
      return <Link color="primary.500" overflowWrap="break-word" {...props} />;
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
        {...props}
      />
    ),
  },
}).Compiler;

const Content = ({ htmlAst, ...props }) => {
  return (
    <Box {...props}>
      <Global
        styles={css`
          pre.grvsc-container {
            margin: 2rem 0;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
              0 1px 2px 0 rgba(0, 0, 0, 0.06);
          }

          span.gatsby-resp-image-wrapper {
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
              0 1px 2px 0 rgba(0, 0, 0, 0.06);
          }

          a.anchor.before {
            padding-right: 1rem;
          }
        `}
      />
      {renderAst(htmlAst)}
    </Box>
  );
};

export default Content;
