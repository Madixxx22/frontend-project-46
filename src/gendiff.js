import fs from 'fs';
import path from 'path';
import { getParsingData } from './parsers.js';
import { engineDiff } from './generate-difference.js';
import { formatting } from './formatter/formatter.js';

const getData = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf8');

export const genDiff = (filepath1, filepath2, format = 'stylish') => {
  try {
    const firstFile = getParsingData(getData(filepath1), filepath1);
    const secondFile = getParsingData(getData(filepath2), filepath2);
    if (firstFile === 'error' || secondFile === 'error') {
      return 'Неверный формат файлов';
    }
    const difference = engineDiff(firstFile, secondFile);
    return formatting(difference, format);
  } catch (err) {
    return err;
  }
};

export default genDiff;
