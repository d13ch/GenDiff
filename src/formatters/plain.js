import _ from 'lodash';
import generateDiffTree from '../index.js';
import parse from '../parser.js';

const getPropertyPath = (begin, end = undefined) => {
  if (begin === null) {
    return end;
  }
  if (end === undefined) {
    return begin;
  } return `${begin}.${end}`;
};

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  } if (_.isString(value)) {
    return `'${value}'`;
  } return value;
};

const generatePlainDiff = (filePath1, filePath2) => {
  const fileData1 = parse(filePath1);
  const fileData2 = parse(filePath2);
  const diffTree = generateDiffTree(fileData1, fileData2);

  let currentPropertyPath;

  const iter = (data, propertyPath) => {
    const result = data.flatMap((node) => {
      currentPropertyPath = getPropertyPath(propertyPath, node.key);
      switch (node.tag) {
        case 'added':
          return `Property '${currentPropertyPath}' was added with value: ${getValue(node.value)}`;
        case 'deleted':
          return `Property '${currentPropertyPath}' was removed`;
        case 'changed':
          return `Property '${currentPropertyPath}' was updated. From ${getValue(node.value.oldValue)} to ${getValue(node.value.newValue)}`;
        case 'nested':
          return iter(node.value, currentPropertyPath);
        case 'unchanged':
          return [];
        default:
          throw new Error('Damn!');
      }
    });
    return result.join('\n');
  };
  return iter(diffTree, null);
};

export default generatePlainDiff;
export { getPropertyPath, getValue };
