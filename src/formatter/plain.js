import _ from 'lodash';

const getValue = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  } if (typeof value === 'string') {
    return `'${value}'`;
  }
  return `${value}`;
};

const getChildren = (obj) => {
  if (_.has(obj, 'children')) {
    return obj.children;
  }
  return [];
};

const buildPlain = (item, path = '') => {
  const currentPath = `${path}${item.key}`;
  const { status } = item;
  if (status === 'added') {
    return `Property '${currentPath}' was added with value: ${getValue(item.new)}\n`;
  } if (status === 'removed') {
    return `Property '${currentPath}' was removed\n`;
  } if (status === 'changed') {
    return `Property '${currentPath}' was updated. From ${getValue(item.old)} to ${getValue(item.new)}\n`;
  } if (status === 'nested') {
    const data = getChildren(item).map((child) => buildPlain(child, `${currentPath}.`));
    return data.join('');
  }
  return '';
};

export const plain = (difference) => {
  const lines = difference.map((item) => buildPlain(item));
  return lines.join('').slice(0, -1);
};

export default plain;
