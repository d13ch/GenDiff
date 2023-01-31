import generateDiffTree from '../index.js';

const generateJsonDiff = (filePath1, filePath2) => {
  const diffTree = generateDiffTree(filePath1, filePath2);

  return JSON.stringify(diffTree);
};

export default generateJsonDiff;
