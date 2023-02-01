import * as path from 'path';
import { readFileSync } from 'fs';
import parse from './parser.js';
import generateDiffTree from './tree.js';
import makeFormattedDiff from './formatters/index.js';

const getFileData = (filePath) => {
  const currentPath = process.cwd();
  const absPath = path.resolve(currentPath, filePath);
  const fileData = readFileSync(absPath, 'utf-8');

  return fileData;
};

const genDiff = (filePath1, filePath2, format) => {
  const fileData1 = getFileData(filePath1);
  const fileData2 = getFileData(filePath2);
  const fileExtention1 = path.extname(filePath1);
  const fileExtention2 = path.extname(filePath2);
  const obj1 = parse(fileData1, fileExtention1);
  const obj2 = parse(fileData2, fileExtention2);
  const diffTree = generateDiffTree(obj1, obj2);

  return makeFormattedDiff(diffTree, format);
};

export default genDiff;
export { getFileData };
