import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import generateDiff from '../src/formatters/stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const jsonPath1 = getFixturePath('file1.json');
const jsonPath2 = getFixturePath('file2.json');
const yamlPath = getFixturePath('file1.yaml');
const ymlPath = getFixturePath('file2.yml');
const stylishResult = getFixturePath('stylishResult.yml');
const nestedPath1 = getFixturePath('nestedFile1.json');
const nestedPath2 = getFixturePath('nestedFile2.json');
const nestedResult = getFixturePath('stylishNestedResult.yml');

test('Stylish generation', () => {
  expect(generateDiff(jsonPath1, jsonPath2)).toEqual(readFileSync(stylishResult, 'utf-8'));
  expect(generateDiff(yamlPath, ymlPath)).toEqual(readFileSync(stylishResult, 'utf-8'));
  expect(generateDiff(jsonPath1, ymlPath)).toEqual(readFileSync(stylishResult, 'utf-8'));
  expect(generateDiff(nestedPath1, nestedPath2)).toEqual(readFileSync(nestedResult, 'utf-8'));
});
