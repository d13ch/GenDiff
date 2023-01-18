import * as path from 'path';
import { readFileSync } from 'fs';
import yaml from 'js-yaml';

const getFileData = (filePath) => {
  const currentPath = process.cwd();
  const absPath = path.resolve(currentPath, filePath);
  const fileData = readFileSync(absPath, 'utf-8');

  return fileData;
};

const parse = (filePath) => {
  const data = getFileData(filePath);
  const extention = path.extname(filePath);

  return extention === '.json' ? JSON.parse(data) : yaml.load(data);
};

export default parse;
