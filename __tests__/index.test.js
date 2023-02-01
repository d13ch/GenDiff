import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import generateDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

test('Stylish', () => {
  const stylishResult = readFileSync(getFixturePath('results/stylishResult.yml'), 'utf-8');
  expect(generateDiff(getFixturePath('nestedFile1.json'), getFixturePath('nestedFile2.json'), 'stylish')).toEqual(stylishResult);
});

test('Plain', () => {
  const plainResult = readFileSync(getFixturePath('results/plainResult.txt'), 'utf-8');
  expect(generateDiff(getFixturePath('nestedFile1.yaml'), getFixturePath('nestedFile2.json'), 'plain')).toEqual(plainResult);
});

test('JSON', () => {
  const jsonResult = readFileSync(getFixturePath('results/result.json'), 'utf-8');
  expect(generateDiff(getFixturePath('nestedFile1.yaml'), getFixturePath('nestedFile2.yml'), 'json')).toEqual(jsonResult);
});
