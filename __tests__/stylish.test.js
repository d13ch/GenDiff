import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { test, expect, beforeAll } from '@jest/globals';
import { readFileSync } from 'fs';
import generateDiff from '../src/formatters/stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

let jsonPath1;
let jsonPath2;
let yamlPath;
let ymlPath;
let stylishResult;
let nestedPath1;
let nestedPath2;
let nestedResult;

beforeAll(() => {
  jsonPath1 = getFixturePath('file1.json');
  jsonPath2 = getFixturePath('file2.json');
  yamlPath = getFixturePath('file1.yaml');
  ymlPath = getFixturePath('file2.yml');
  stylishResult = getFixturePath('stylishResult.yml');
  nestedPath1 = getFixturePath('nestedFile1.json');
  nestedPath2 = getFixturePath('nestedFile2.json');
  nestedResult = getFixturePath('stylishNestedResult.yml');
});

test('Stylish generation', () => {
  expect(generateDiff(jsonPath1, jsonPath2)).toEqual(readFileSync(stylishResult, 'utf-8'));
  expect(generateDiff(yamlPath, ymlPath)).toEqual(readFileSync(stylishResult, 'utf-8'));
  expect(generateDiff(jsonPath1, ymlPath)).toEqual(readFileSync(stylishResult, 'utf-8'));
  expect(generateDiff(nestedPath1, nestedPath2)).toEqual(readFileSync(nestedResult, 'utf-8'));
});
