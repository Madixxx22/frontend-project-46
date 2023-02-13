import yaml from 'js-yaml'

const getFormat = (path) => {
    return path.split('.')[1]
}

export const getParsingData = (data, path) => {
    const format = getFormat(path);
    if (format === 'json'){
        return JSON.parse(data);
    } else if (format === 'yml' || 'yaml') {
        return yaml.load(data);
    }
}