
const getValue = (value) => {
    if (typeof value === 'object' && value !== null) {
        return '[complex value]';
    } else if (typeof value === 'string') {
        return `'${value}'`;
    }
    return `${value}`;
}

const getChildren = (obj) => {
    if (obj.hasOwnProperty('children')) {
        return obj.children;
    } 
    return obj;
} 

const getPlain = (diff, path = '') => {
    const plainData = [];
    const data = getChildren(diff);
    for (const item of data) {
        const currentPath = path + `${item.key}`;
        const status = item.status;
        if (status === 'added') {
            plainData.push(`Property '${currentPath}' was added with value: ${getValue(item.new)}`);
        } else if (status === 'removed'){
            plainData.push(`Property '${currentPath}' was removed`);
        } else if (status === 'changed') {
            plainData.push(`Property '${currentPath}' was updated. From ${getValue(item.old)} to ${getValue(item.new)}`);
        } else if (status === 'nested') {
            plainData.push(getPlain(getChildren(item), `${currentPath}.`));
        } 
    }
    return plainData.join('\n');
}

export const plain = (diff) => getPlain(diff, '');


export default plain;
