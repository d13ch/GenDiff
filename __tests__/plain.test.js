import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { beforeAll, expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import generatePlainDiff from '../src/formatters/plain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

let filePath1;
let filePath2;
let result;

beforeAll(() => {
  filePath1 = getFixturePath('nestedFile1.json');
  filePath2 = getFixturePath('nestedFile2.json');
  result = getFixturePath('plainResult.txt');
});

test('Plain generation', () => {
  expect(generatePlainDiff(filePath1, filePath2)).toEqual(readFileSync(result, 'utf-8'));
});
