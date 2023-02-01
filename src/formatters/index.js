import generateJsonDiff from './json.js';
import generatePlainDiff from './plain.js';
import generateStylishDiff from './stylish.js';

const makeFormattedDiff = (diffTree, format) => {
  switch (format) {
    case 'stylish':
      return generateStylishDiff(diffTree);
    case 'plain':
      return generatePlainDiff(diffTree);
    case 'json':
      return generateJsonDiff(diffTree);
    default:
      throw new Error('No such format!');
  }
};

export default makeFormattedDiff;
