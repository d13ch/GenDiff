import yaml from 'js-yaml';

const parse = (data, extention) => (extention === '.json' ? JSON.parse(data) : yaml.load(data));

export default parse;
