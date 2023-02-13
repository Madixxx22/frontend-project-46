const sign = {
  added: '  + ',
  removed: '  - ',
  unchanged: '    ',
  nested: '    ',
};

const getString = (item, deep, value = '', specSign = '') => `${sign.nested.repeat(deep)}${sign[item.status]}${item.key}: ${value}${specSign}\n`;

const getObjectString = (obj, deep) => {
  let result = '';
  const keys = Object.keys(obj);
  /* eslint-disable-next-line */
  for (const key of keys) {
    if (typeof obj[key] === 'object') {
      result += `${sign.nested.repeat(deep)}${key}: {\n`;
      result += getObjectString(obj[key], deep + 1);
      result += `${sign.nested.repeat(deep)}}\n`;
    } else {
      result += `${sign.nested.repeat(deep)}${key}: ${obj[key]}\n`;
    }
  }
  return result;
};

const buildString = (difference) => {
  let result = '{\n';
  const iter = (diff, deep) => {
  /* eslint-disable-next-line */
    for (const item of diff) {
      if (item.status === 'added') {
        if (typeof item.new === 'object') {
          result += getString(item, deep, '', '{');
          result += getObjectString(item.new, deep + 2);
          result += `${sign.nested.repeat(deep + 1)}}\n`;
        } else {
          result += getString(item, deep, item.new);
        }
      } else if (item.status === 'removed') {
        if (typeof item.old === 'object') {
          result += getString(item, deep, '', '{');
          result += getObjectString(item.old, deep + 2);
          result += `${sign.nested.repeat(deep + 1)}}\n`;
        } else {
          result += getString(item, deep, item.old);
        }
      } else if (item.status === 'unchanged') {
        result += getString(item, deep, item.value);
      } else if (item.status === 'changed') {
        item.status = 'removed';
        if (typeof item.old === 'object' && item.old !== null) {
          result += getString(item, deep, '', '{');
          result += getObjectString(item.old, deep + 2);
          result += `${sign.nested.repeat(deep + 1)}}\n`;
        } else {
          result += getString(item, deep, item.old);
        }
        item.status = 'added';
        if (typeof item.new === 'object' && item.new !== null) {
          result += getString(item, deep, '', '{');
          result += getObjectString(item.new, deep + 2);
          result += `${sign.nested.repeat(deep + 1)}}\n`;
        } else {
          result += getString(item, deep, item.new);
        }
        item.status = 'changed';
      } else if (item.status === 'nested') {
        result += getString(item, deep, '', '{');
        iter(item.children, deep + 1);
        result += `${sign.nested.repeat(deep + 1)}}\n`;
      }
    }
  };
  iter(difference, 0);
  return `${result}}`;
};

export const stylish = (difference) => buildString(difference);

export default stylish;
