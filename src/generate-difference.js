import _ from 'lodash';

const isChild = (item) => {
  if (typeof item === 'object') {
    return true;
  }
  return false;
};

export const engineDiff = (firstObj, SecondObj) => {
  const iter = (obj1, obj2) => {
    const diff = [];
    const mergeKey = Object.keys(
      _.merge(_.cloneDeep(obj1), obj2),
    ).sort();
    /* eslint-disable-next-line */
    for (const key of mergeKey) {
      /* eslint-disable-next-line */
      if (obj1.hasOwnProperty(key) === false) {
        diff.push({
          key,
          new: obj2[key],
          status: 'added',
        });
      /* eslint-disable-next-line */
      } else if (obj2.hasOwnProperty(key) === false) {
        diff.push({
          key,
          old: obj1[key],
          status: 'removed',
        });
      } else if (isChild(obj1[key]) && isChild(obj2[key])) {
        const child = iter(obj1[key], obj2[key]);
        diff.push({
          key,
          children: child,
          status: 'nested',
        });
      } else if (obj1[key] === obj2[key]) {
        diff.push({
          key,
          value: obj1[key],
          status: 'unchanged',
        });
      } else if (obj1[key] !== obj2[key]) {
        diff.push({
          key,
          old: obj1[key],
          new: obj2[key],
          status: 'changed',
        });
      }
    }
    return diff;
  };

  return iter(firstObj, SecondObj);
};

export default engineDiff;
