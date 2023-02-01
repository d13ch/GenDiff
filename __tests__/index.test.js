import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { beforeAll, expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import generateDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

let jsonPath1;
let jsonPath2;
let yamlPath1;
let ymlPath2;
let stylishResult;
let plainResult;
let jsonResult;

beforeAll(() => {
  jsonPath1 = getFixturePath('nestedFile1.json');
  jsonPath2 = getFixturePath('nestedFile2.json');
  yamlPath1 = getFixturePath('nestedFile1.yaml');
  ymlPath2 = getFixturePath('nestedFile2.yml');
  stylishResult = getFixturePath('results/stylishResult.yml');
  plainResult = getFixturePath('results/plainResult.txt');
  jsonResult = getFixturePath('results/result.json');
});

test('Stylish', () => {
  expect(generateDiff(jsonPath1, jsonPath2, 'stylish')).toEqual(readFileSync(stylishResult, 'utf-8'));
});

test('Plain', () => {
  expect(generateDiff(yamlPath1, jsonPath2, 'plain')).toEqual(readFileSync(plainResult, 'utf-8'));
});

test('JSON', () => {
  expect(generateDiff(yamlPath1, ymlPath2, 'json')).toEqual(readFileSync(jsonResult, 'utf-8'));
});
