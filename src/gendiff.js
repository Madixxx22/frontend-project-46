import fs from 'node:fs';
import path from 'path';
import { getParsingData } from './parsers.js';
import { engineDiff, formatting } from './generate-difference.js';

const getData = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf8');

/* eslint-disable-next-line */
export const genDiff = (filepath1, filepath2, format) => {
  try {
    const firstFile = getParsingData(getData(filepath1), filepath1);
    const secondFile = getParsingData(getData(filepath2), filepath2);
    if (firstFile === 'error' || secondFile === 'error') {
      return 'Неверный формат файлов';
    }
    const difference = engineDiff(firstFile, secondFile);
    return formatting(difference);
  } catch (err) {
    console.log(err);
  }
};

export default genDiff;
