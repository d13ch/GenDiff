import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import generateDiff, { getFileData, getKeys } from '../src/stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath1 = join(__dirname, '..', '__fixtures__', 'file1.json');
const filePath2 = join(__dirname, '..', '__fixtures__', 'file2.json');
const expectedOutput = '/home/d_ch/frontend-project-46/__fixtures__/expectedResult.yml';

test('Stylish generation', () => {
  expect(generateDiff(filePath1, filePath2)).toEqual(readFileSync(expectedOutput, 'utf-8'));
});

test('Get keys', () => {
  const fileData1 = getFileData(filePath1);
  const fileData2 = getFileData(filePath2);
  const expectedKeys = ['follow', 'host', 'proxy', 'timeout', 'verbose'];
  expect(getKeys(fileData1, fileData2)).toEqual(expectedKeys);
});
