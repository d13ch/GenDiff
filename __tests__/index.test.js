import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { beforeAll, expect, test } from '@jest/globals';
import generateDiff, { getKeys } from '../src/index.js';
import expectedResult from '../__fixtures__/treeResult.js';
import parse from '../src/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

let jsonPath1;
let ymlPath;
let jsonFile1;
let ymlFile2;

beforeAll(() => {
  jsonPath1 = getFixturePath('file1.json');
  ymlPath = getFixturePath('file2.yml');
  jsonFile1 = parse(jsonPath1);
  ymlFile2 = parse(ymlPath);
});

test('Check difference generation logic', () => {
  expect(generateDiff(jsonPath1, ymlPath)).toEqual(expectedResult);
});

test('Get keys', () => {
  const expectedKeys = ['follow', 'host', 'proxy', 'timeout', 'verbose'];
  expect(getKeys(jsonFile1, ymlFile2)).toEqual(expectedKeys);
});
