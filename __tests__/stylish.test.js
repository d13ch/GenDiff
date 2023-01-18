import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import generateDiff, { getKeys } from '../src/stylish.js';
import parse from '../src/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const jsonPath1 = join(__dirname, '..', '__fixtures__', 'file1.json');
const jsonPath2 = join(__dirname, '..', '__fixtures__', 'file2.json');
const yamlPath = join(__dirname, '..', '__fixtures__', 'file1.yaml');
const ymlPath = join(__dirname, '..', '__fixtures__', 'file2.yml');
const expectedOutput = join(__dirname, '..', '__fixtures__', 'expectedResult.yml');

test('Stylish generation', () => {
  expect(generateDiff(jsonPath1, jsonPath2)).toEqual(readFileSync(expectedOutput, 'utf-8'));
  expect(generateDiff(yamlPath, ymlPath)).toEqual(readFileSync(expectedOutput, 'utf-8'));
  expect(generateDiff(jsonPath1, ymlPath)).toEqual(readFileSync(expectedOutput, 'utf-8'));
});

test('Get keys', () => {
  const jsonData1 = parse(jsonPath1);
  const jsonData2 = parse(jsonPath2);
  const expectedKeys = ['follow', 'host', 'proxy', 'timeout', 'verbose'];
  expect(getKeys(jsonData1, jsonData2)).toEqual(expectedKeys);
});
