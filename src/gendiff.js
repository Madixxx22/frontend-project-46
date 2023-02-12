import fs from 'node:fs';
import path from 'path';
import _ from 'lodash';

const formatting = (diff) => {
    let result = '{\n';
    for (let item of diff) {
        if (item.status === 'added'){
            result += `  + ${item.key}: ${item.new} \n`;
        } else if (item.status === 'removed'){
            result += `  - ${item.key}: ${item.old} \n`;
        } else if (item.status === 'unchanged'){
            result += `    ${item.key}: ${item.value} \n`;
        } else if (item.status === 'changed'){
            result += `  - ${item.key}: ${item.old} \n`;
            result += `  + ${item.key}: ${item.new} \n`;
        }
    }
    return result + '}';
}

const engineDiff = (firstObj, SecondObj) => {
    const iter = (obj1, obj2) => {
        let diff = [];
        const merge_key = Object.keys(_.merge(_.cloneDeep(obj1), obj2)).sort(); 
        for (let key of merge_key) {
            if (obj1.hasOwnProperty(key) === false) {
                diff.push({
                    'key': key,
                    'new': obj2[key],
                    'status': 'added' 
                });
            } else if (obj2.hasOwnProperty(key) === false) {
                diff.push({
                    'key': key,
                    'old': obj1[key],
                    'status': 'removed'
                });
            } else if (obj1[key] === obj2[key]) {
                diff.push({
                    'key': key,
                    'value': obj1[key],
                    'status': 'unchanged'
                });
            } else if (obj1[key] !== obj2[key]) {
                diff.push({
                    'key': key,
                    'old': obj1[key],
                    'new': obj2[key],
                    'status': 'changed'
                });
            }
        }
        return diff;
    }

    return iter(firstObj, SecondObj);
};

export const genDiff = (filepath1, filepath2, format) => {
    try {
        const path1 = path.resolve(process.cwd(), filepath1)
        const path2 = path.resolve(process.cwd(), filepath2)
        const firstFile = JSON.parse(fs.readFileSync(path1, 'utf8'));
        const secondFile = JSON.parse(fs.readFileSync(path2, 'utf-8'));
        const difference = engineDiff(firstFile, secondFile);
        return formatting(difference);
    } catch (err) {
        console.log(err);
    }
};

export default genDiff;
