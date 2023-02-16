import _ from 'lodash';

export const engineDiff = (obj1, obj2) => {
  const mergeKeys = Object.keys(
    _.merge(_.cloneDeep(obj1), obj2),
  ).sort();
  const diff = mergeKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return { key, new: obj2[key], status: 'added' };
    } if (!_.has(obj2, key)) {
      return { key, old: obj1[key], status: 'removed' };
    } if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      const child = engineDiff(obj1[key], obj2[key]);
      return { key, children: child, status: 'nested' };
    } if (obj1[key] === obj2[key]) {
      return { key, value: obj1[key], status: 'unchanged' };
    } if (obj1[key] !== obj2[key]) {
      return {
        key, old: obj1[key], new: obj2[key], status: 'changed',
      };
    }
    return '';
  });
  return diff;
};

export default engineDiff;
