import { stylish } from './stylish.js';
import { plain } from './plain.js';


/* eslint-disable-next-line */
export const formatting = (diff, format) => {
  if (format === 'stylish') {
    return stylish(diff);
  } else if (format === 'plain') {
    return plain(diff);
  }
};

export default formatting;
