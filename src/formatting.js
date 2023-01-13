import * as path from 'path';

const chooseFormat = (givenFormat, filepath) => {
  const getDefaultFormat = (file) => {
    const extention = path.extname(file);
    return extention === '.json' ? 'stylish' : 'plain';
  };
  return givenFormat ?? getDefaultFormat(filepath);
};

export default chooseFormat;
