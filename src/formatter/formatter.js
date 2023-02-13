import { stylish } from './stylish.js';

/* eslint-disable-next-line */
export const formatting = (diff, format) => {
  if (format === 'stylish') {
    return stylish(diff);
  }
};

export default formatting;
