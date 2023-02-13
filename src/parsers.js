import yaml from 'js-yaml';

const getFormat = (path) => path.split('.')[1];

export const getParsingData = (data, path) => {
  const format = getFormat(path);
  if (format === 'json') {
    return JSON.parse(data);
  } if (format === 'yml' || format === 'yaml') {
    return yaml.load(data);
  }
  return 'error';
};

export default getParsingData;
