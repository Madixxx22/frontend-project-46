import _ from 'lodash';

const sign = {
  added: '  + ',
  removed: '  - ',
  unchanged: '    ',
  nested: '    ',
};

const getStringBase = (status = 'unchanged', key = '', value = '', deep = 0, specSign = '') => `${sign.nested.repeat(deep)}${sign[status]}${key}: ${specSign}${value}`;

const getStringObject = (obj, deep) => {
  const keys = Object.keys(obj);
  const data = keys.map((key) => {
    if (_.isObject(obj[key])) {
      const indent = sign.nested.repeat(deep + 1);
      return `\n${indent}${key}: {${getStringObject(obj[key], deep + 1)}\n${indent}}`;
    }
    return `\n${getStringBase('unchanged', key, obj[key], deep)}`;
  });
  return data.join('');
};

const getString = (status, key, value, deep) => {
  if (_.isObject(value)) {
    const title = getString(status, key, '', deep);
    const stringObj = getStringObject(value, deep + 1);
    const indent = sign.nested.repeat(deep + 1);
    const result = `${title}{${stringObj}\n${indent}}`;
    return result;
  }
  return getStringBase(status, key, value, deep);
};

const buildString = (item, deep = 0) => {
  switch (item.status) {
    case 'added':
      return getString(item.status, item.key, item.new, deep);
    case 'removed':
      return getString(item.status, item.key, item.old, deep);
    case 'changed':
      return [
        getString('removed', item.key, item.old, deep),
        getString('added', item.key, item.new, deep),
      ].join('\n');
    case 'nested': {
      const indent = sign.nested.repeat(deep + 1);
      const value = item.children.map((obj) => buildString(obj, deep + 1));
      const string = `${sign.nested.repeat(deep)}${sign[item.status]}${item.key}: {\n${value.join('\n')}\n${indent}}`;
      return string;
    }
    default:
      return getString(item.status, item.key, item.value, deep);
  }
};

export const stylish = (difference) => {
  const lines = difference.map((item) => buildString(item));
  return ['{', ...lines, '}'].join('\n');
};

export default stylish;
