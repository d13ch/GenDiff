import _ from 'lodash';

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

const generatePlainDiff = (diffTree) => {
  const iter = (data, propertyPath) => {
    const result = data.flatMap((node) => {
      const currentPropertyPath = getPropertyPath(propertyPath, node.key);
      switch (node.tag) {
        case 'added':
          return `Property '${currentPropertyPath}' was added with value: ${getValue(node.value)}`;
        case 'deleted':
          return `Property '${currentPropertyPath}' was removed`;
        case 'changed':
          return `Property '${currentPropertyPath}' was updated. From ${getValue(node.value.oldValue)} to ${getValue(node.value.newValue)}`;
        case 'unchanged':
          return [];
        case 'nested':
          return iter(node.value, currentPropertyPath);
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
