import fs from 'node:fs';
import path from 'node:path';

/**
 * 注意：此文件为备用文件，后面需要生成指定文件名翻译可以用这个。详情可参考Teenpatti_APP_H5, ./config/rules-translate.js
 * 从自动化翻译中获取指定模块的翻译对象
 * @param {string} module 指定需要移动的模块
 * @returns {object} 例如 { en: { key: 'value' }, hi: ... }
 */
function getTranslateFile(module = '') {
  const configPath = path.join(__dirname, '../auto-translate.json');
  const translateConfig = require(configPath);
  if (translateConfig && translateConfig.output) {
    const outputDir = path.join(__dirname, '../', translateConfig.output);
    // 读取输出语言目录文件，只保留目录
    const outputFileList = fs.readdirSync(outputDir);
    const translateLangDirs = outputFileList
      .map((dir) => {
        return { dirname: dir, dir: path.join(outputDir, dir) };
      })
      .filter((dir) => {
        const dirStatus = fs.statSync(dir.dir);
        return dirStatus.isDirectory();
      });
    // 获取指定模块的翻译对象
    let langObj: { [x: string]: any } = {};
    translateLangDirs.forEach((dir) => {
      const langFileList = fs.readdirSync(dir.dir);
      const file = langFileList.find((file) => {
        if (!module) return !!file
        return new RegExp(`^${module}\.`).test(file);
      });

      if (file) {
        const filePath = path.join(dir.dir, file);
        const translateText = fs.readFileSync(filePath, 'utf-8');
        let translateObj = {};
        try {
          translateObj = JSON.parse(translateText.slice(15, -2));
        } catch (e) {
          console.log('Translation file parsing failed');
        }
        langObj[dir.dirname] = translateObj;
      }
    });
    return langObj
    // console.log(JSON.stringify(langObj, undefined, 2));
  }
  return {};
}

/**
 * 格式化多语言对象
 * @param {object} translateObj 例如 { en: { 'page.key': 'value' }, hi: ... }
 * @returns {object} 例如 { page: { en: { key: 'value' }, hi: ...}, page2: ... }
 */
function formatTranslateObj(translateObj: { [x: string]: any }) {
  let newObj: { [x: string]: any } = {};
  let langObj: { [x: string]: any } = {};
  Object.keys(translateObj).forEach((langKey) => {
    langObj[langKey] = {};
  });
  const langJSON = JSON.stringify(langObj);

  Object.keys(translateObj).forEach((langKey) => {
    Object.keys(translateObj[langKey]).forEach((key) => {
      const keyList = key.split('.');
      const pageKey = keyList[0] || '';
      const valueKey = keyList[1] || '';
      if (!newObj[pageKey]) {
        newObj[pageKey] = JSON.parse(langJSON);
      }
      newObj[pageKey][langKey][valueKey] = translateObj[langKey][key];
    });
  });
  return newObj;
}

/**
 * 根据多语言对象生成翻译文件
 * @param {object} translateObj 例如 { page: { en: { key: 'value' }, hi: ...}, page2: ... }
 */
function storageRuleTranslate(translateObj: { [x: string]: any }, ruleTranslateDir: string) {
  const ruleDir = path.join(__dirname, '../', ruleTranslateDir);
  try {
    fs.accessSync(ruleDir);
  } catch (e) {
    console.log(`create ${ruleTranslateDir} dir`);
    fs.mkdirSync(ruleDir, { recursive: true });
  }
  Object.keys(translateObj).forEach((pageKey) => {
    const pagePath = path.join(ruleDir, `${pageKey}.js`);
    console.log(`create ${ruleTranslateDir}/${pageKey} file`);
    const body = JSON.stringify(translateObj[pageKey], undefined, 2);
    const content = `const LANGUAGE = ${body}`;
    fs.writeFileSync(pagePath, content);
    fs.appendFileSync(pagePath, '\n', 'utf8');
  });
}

const translateObj = getTranslateFile();
const ruleTranslateObj = formatTranslateObj(translateObj);
// 存放规则翻译文件的目录
const ruleTranslateDir = '/locales';
storageRuleTranslate(ruleTranslateObj, ruleTranslateDir);
