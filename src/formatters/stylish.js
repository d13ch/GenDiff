import _ from 'lodash';
import generateDiffTree from '../index.js';
import parse from '../parser.js';

const ident = (level = 1, spacesCount = 1, correction = 0) => ' '.repeat(level * spacesCount - correction);

const stringify = (data, initialDepth) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    const entries = Object.entries(currentValue);
    const strings = entries.map(([key, value]) => `${ident(depth, 4)}${key}: ${iter(value, depth + 1)}`);

    return `{\n${strings.join('\n')}\n${ident(depth, 4, 4)}}`;
  };
  return iter(data, initialDepth);
};

const generateStylishDiff = (filePath1, filePath2) => {
  const fileData1 = parse(filePath1);
  const fileData2 = parse(filePath2);
  const diffTree = generateDiffTree(fileData1, fileData2);

  const iter = (tree, depth) => {
    const currentIdent = ident(depth, 4, 2);
    const result = tree.map((node) => {
      const stringifyValue = (value = node.value) => stringify(value, depth + 1);
      switch (node.tag) {
        case 'deleted':
          return `${currentIdent}- ${node.key}: ${stringifyValue()}`;
        case 'added':
          return `${currentIdent}+ ${node.key}: ${stringifyValue()}`;
        case 'changed':
          return `${currentIdent}- ${node.key}: ${stringifyValue(node.value.oldValue)}\n${currentIdent}+ ${node.key}: ${stringifyValue(node.value.newValue)}`;
        case 'nested':
          return `${currentIdent}  ${node.key}: ${iter(node.value, depth + 1)}`;
        default:
          return `${currentIdent}  ${node.key}: ${stringifyValue()}`;
      }
    });

    return `{\n${result.join('\n')}\n${ident(depth, 4, 4)}}`;
  };

  return iter(diffTree, 1);
};

export default generateStylishDiff;
