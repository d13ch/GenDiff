import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import generateDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

test.each([
  ['nestedFile1.json', 'nestedFile2.json'],
  ['nestedFile1.yaml', 'nestedFile2.json'],
  ['nestedFile1.yaml', 'nestedFile2.yml'],
])('Stylish, default case and parsing of different formats', (file1, file2) => {
  const stylishResult = readFileSync(getFixturePath('results/stylishResult.yml'), 'utf-8');
  expect(generateDiff(getFixturePath(file1), getFixturePath(file2), 'stylish')).toEqual(stylishResult);
  expect(generateDiff(getFixturePath(file1), getFixturePath(file2))).toEqual(stylishResult);
});

test('Plain', () => {
  const plainResult = readFileSync(getFixturePath('results/plainResult.txt'), 'utf-8');
  expect(generateDiff(getFixturePath('nestedFile1.yaml'), getFixturePath('nestedFile2.json'), 'plain')).toEqual(plainResult);
});

test('JSON', () => {
  const jsonResult = readFileSync(getFixturePath('results/result.json'), 'utf-8');
  expect(generateDiff(getFixturePath('nestedFile1.yaml'), getFixturePath('nestedFile2.yml'), 'json')).toEqual(jsonResult);
});
