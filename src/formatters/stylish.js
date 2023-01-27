import _ from 'lodash';
import generateDiffTree from '../index.js';
import parse from '../parser.js';

const stringify = (data, spacesCount) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    const entries = Object.entries(currentValue);
    const spaces = '    ';
    const identSize = depth * spacesCount;
    const currentIndent = spaces.repeat(identSize);
    const strings = entries.map(([key, value]) => `${currentIndent}${key}: ${iter(value, depth + 1)}`);

    return `{\n${strings.join('\n')}\n${spaces.repeat(identSize - depth)}}`;
  };

  return iter(data, 1);
};

const generateStylishDiff = (filePath1, filePath2) => {
  const fileData1 = parse(filePath1);
  const fileData2 = parse(filePath2);
  const diffTree = generateDiffTree(fileData1, fileData2);

  const iter = (tree, depth) => {
    const braceIdent = (level) => ' '.repeat(level * 4 - 4);
    const ident = (level) => ' '.repeat(level * 4 - 2);
    const result = tree.map((node) => {
      const strValue = (value = node.value) => stringify(value, depth + 1);
      switch (node.tag) {
        case 'deleted':
          return `${ident(depth)}- ${node.key}: ${strValue()}`;
        case 'added':
          return `${ident(depth)}+ ${node.key}: ${strValue()}`;
        case 'changed':
          return `${ident(depth)}- ${node.key}: ${strValue(node.value.value1)}\n${ident(depth)}+ ${node.key}: ${strValue(node.value.value2)}`;
        case 'nested':
          return `${ident(depth)}  ${node.key}: ${iter(node.value, depth + 1)}`;
        default:
          return `${ident(depth)}  ${node.key}: ${strValue()}`;
      }
    });

    return `{\n${result.join('\n')}\n${braceIdent(depth)}}`;
  };

  return iter(diffTree, 1);
};

export default generateStylishDiff;
