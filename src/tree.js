import _ from 'lodash';

const getKeys = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.union(keys1, keys2);
  return _.sortBy(keys);
};

const isObject = (data) => typeof data === 'object' && data !== null;

const generateDiffTree = (fileData1, fileData2) => {
  const iter = (data1, data2) => {
    const keys = getKeys(data1, data2);
    const diff = keys.map((key) => {
      if (!_.has(data2, key)) {
        return { key, value: data1[key], tag: 'deleted' };
      }
      if (!_.has(data1, key)) {
        return { key, value: data2[key], tag: 'added' };
      }
      if (isObject(data1[key]) && isObject(data2[key])) {
        return { key, value: iter(data1[key], data2[key]), tag: 'nested' };
      }
      return data1[key] === data2[key]
        ? { key, value: data1[key], tag: 'unchanged' }
        : { key, value: { oldValue: data1[key], newValue: data2[key] }, tag: 'changed' };
    });
    return diff;
  };
  return iter(fileData1, fileData2);
};
export default generateDiffTree;
