const fs = require('fs');
const path = require('path');

const deepCopyKeys = (source, target) => {
  for (const key in source) {
    if (typeof source[key] === 'object' && source[key] !== null) {
      target[key] = target[key] || {};
      deepCopyKeys(source[key], target[key]);
    } else {
      if (!(key in target)) {
        target[key] = '';
      }
    }
  }
};

const copyTranslationKeys = () => {
  const sourceFile = path.join(
    __dirname,
    'src',
    'locales',
    'en',
    'translation.json',
  );
  const sourceData = JSON.parse(fs.readFileSync(sourceFile, 'utf-8'));

  const localesDir = path.join(__dirname, 'src', 'locales');
  const languages = fs
    .readdirSync(localesDir)
    .filter(
      (dir) =>
        dir !== 'en' && fs.lstatSync(path.join(localesDir, dir)).isDirectory(),
    );

  languages.forEach((lang) => {
    const targetFile = path.join(localesDir, lang, 'translation.json');

    const targetData = fs.existsSync(targetFile)
      ? JSON.parse(fs.readFileSync(targetFile, 'utf-8'))
      : {};

    deepCopyKeys(sourceData, targetData);

    fs.writeFileSync(targetFile, JSON.stringify(targetData, null, 2), 'utf-8');
  });

  console.log('Keys successfully copied!');
};

copyTranslationKeys();
