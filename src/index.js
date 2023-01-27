import _ from 'lodash';
// import parse from './parser.js';

const getKeys = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.union(keys1, keys2);
  return _.sortBy(keys);
};

const isObject = (data) => typeof data === 'object' && data !== null;
// console.log(isObject(parse('/home/d_ch/frontend-project-46/__fixtures__/expectedResult.yml')));

const generateDiffTree = (fileData1, fileData2) => {
  // const fileData1 = parse(filePath1);
  // const fileData2 = parse(filePath2);
  const keys = getKeys(fileData1, fileData2);
  const diff = keys.map((key) => {
    if (!_.has(fileData2, key)) {
      return { key: `${key}`, value: fileData1[key], tag: 'deleted' };
      // _.fromPairs([[key, fileData1[key]], ['tag', 'deleted']]);
    }
    if (!_.has(fileData1, key)) {
      return { key: `${key}`, value: fileData2[key], tag: 'added' };
      // _.fromPairs([[key, fileData2[key]], ['tag', 'added']]);
    }
    if (isObject(fileData1[key]) && isObject(fileData2[key])) {
      return { key: `${key}`, value: generateDiffTree(fileData1[key], fileData2[key]), tag: 'nested' };
      // _.fromPairs([[key, generateDiffTree(fileData1[key], fileData2[key])], ['type', 'nested']]);
    }
    return fileData1[key] === fileData2[key]
      ? { key: `${key}`, value: fileData1[key], tag: 'unchanged' }
      // [[key, fileData1[key]], ['tag', 'unchanged']]
      : { key: `${key}`, value: { value1: fileData1[key], value2: fileData2[key] }, tag: 'changed' };
    // [[key, { value1: fileData1[key], value2: fileData2[key] }], ['tag', 'changed']]);
  });
  return diff;
};

// const file1 = parse('/home/d_ch/frontend-project-46/__fixtures__/nestedFile1.json');
// const file2 = parse('/home/d_ch/frontend-project-46/__fixtures__/nestedFile2.json');
// const a = generateDiffTree(file1, file2);
// const b = JSON.stringify(a, null, '  ');
// console.log(JSON.parse(b));

export default generateDiffTree;
export { getKeys };
