import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'node:fs';
/* eslint-disable-next-line */
import { test, expect } from '@jest/globals';
import { genDiff } from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('success-flat', () => {
  const filePath1 = getFixturePath('flat-file1.json');
  const filePath2 = getFixturePath('flat-file2.json');
  const result = getFixturePath('flat-result.txt');
  expect(genDiff(filePath1, filePath2)).toBe(fs.readFileSync(result, 'utf-8'));
});
