import _ from 'lodash';
import parse from './parser.js';

const getKeys = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.union(keys1, keys2);
  return _.sortBy(keys);
};

const generateDiff = (filePath1, filePath2) => {
  const fileData1 = parse(filePath1);
  const fileData2 = parse(filePath2);
  const keys = getKeys(fileData1, fileData2);
  const diff = keys.map((key) => {
    if (_.has(fileData1, key) && !_.has(fileData2, key)) {
      return `  - ${key}: ${fileData1[key]}`;
    }
    if (!_.has(fileData1, key) && _.has(fileData2, key)) {
      return `  + ${key}: ${fileData2[key]}`;
    } return fileData1[key] === fileData2[key]
      ? `    ${key}: ${fileData1[key]}`
      : `  - ${key}: ${fileData1[key]}\n  + ${key}: ${fileData2[key]}`;
  });
  return `{\n${diff.join('\n')}\n}`;
};

export default generateDiff;
export { getKeys };
