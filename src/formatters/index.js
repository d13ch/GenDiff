import generateJsonDiff from './json.js';
import generatePlainDiff from './plain.js';
import generateStylishDiff from './stylish.js';

const chooseDiffType = (filePath1, filePath2, format) => {
  switch (format) {
    case 'stylish':
      return generateStylishDiff(filePath1, filePath2);
    case 'plain':
      return generatePlainDiff(filePath1, filePath2);
    case 'json':
      return generateJsonDiff(filePath1, filePath2);
    default:
      throw new Error('No such format!');
  }
};

export default chooseDiffType;
