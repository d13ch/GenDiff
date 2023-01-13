import generateStylishDiff from './stylish.js';

const chooseDiffType = (filePath1, filePath2, format) => {
  if (format === 'stylish') {
    return generateStylishDiff(filePath1, filePath2);
  } return undefined;
};

export default chooseDiffType;
