import { stylish } from './stylish.js';
import { plain } from './plain.js';
import { json } from './json.js';

/* eslint-disable-next-line */
export const formatting = (diff, format) => {
  if (format === 'stylish') {
    return stylish(diff);
  } if (format === 'plain') {
    return plain(diff);
  } if (format === 'json') {
    return json(diff);
  }
};

export default formatting;
