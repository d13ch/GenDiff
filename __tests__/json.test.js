import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { beforeAll, expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import generateJsonDiff from '../src/formatters/json.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

let nestedPath1;
let nestedPath2;

let resultPath;

beforeAll(() => {
  nestedPath1 = getFixturePath('nestedFile1.json');
  nestedPath2 = getFixturePath('nestedFile2.json');
  resultPath = getFixturePath('result.json');
});

test('JSON generation', () => {
  expect(generateJsonDiff(nestedPath1, nestedPath2)).toEqual(readFileSync(resultPath, 'utf-8'));
});
