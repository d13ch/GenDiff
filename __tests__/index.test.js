import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { expect, test } from '@jest/globals';
import generateDiff, { getKeys } from '../src/index.js';
import expectedResult from '../__fixtures__/expectedResult.js';
import parse from '../src/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const jsonPath1 = getFixturePath('file1.json');
const ymlPath = getFixturePath('file2.yml');

const jsonFile1 = parse(jsonPath1);
const ymlFile2 = parse(ymlPath);

test('Check difference generation logic', () => {
  expect(generateDiff(jsonFile1, ymlFile2)).toEqual(expectedResult);
});

test('Get keys', () => {
  const jsonData1 = parse(jsonPath1);
  const jsonData2 = parse(ymlPath);
  const expectedKeys = ['follow', 'host', 'proxy', 'timeout', 'verbose'];
  expect(getKeys(jsonData1, jsonData2)).toEqual(expectedKeys);
});
