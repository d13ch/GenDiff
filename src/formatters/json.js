import generateDiffTree from '../index.js';
import parse from '../parser.js';

const generateJsonDiff = (filePath1, filePath2) => {
  const fileData1 = parse(filePath1);
  const fileData2 = parse(filePath2);
  const diffTree = generateDiffTree(fileData1, fileData2);

  return JSON.stringify(diffTree);
};

export default generateJsonDiff;
