const chalk = require('chalk');

/**
 * @desc 循环输出 从网上查询的模板列表
 * @param {Array<{desc:string,downloadUrl:string}>} templateList
 * @returns {void}
 */
module.exports = async function (templateList) {
  const templateNames = Object.keys(templateList);
  // 英文的最大长度
  const enMaxLength = templateNames.reduce((previousValue, currentValue) => {
    return currentValue.length >= previousValue ? currentValue.length : previousValue;
  }, 0);

  const templateName = '模板名称';
  const templateDesc = '模板描述';
  let fillingContent = '';
  const fillingLength = enMaxLength - templateName.length * 2; /*一个文字等于两个英文*/
  for (let i = 0; i < fillingLength; i++) {
    fillingContent += ' ';
  }
  // 输出提示
  console.log(
    `${chalk.redBright(`${fillingContent}${templateName}`)}  :  ${chalk.redBright(
      `${templateDesc}`,
    )}`,
  );
  // 循环输出
  for (const key in templateList) {
    const keyLength = key.length;
    if (keyLength === enMaxLength) {
      console.log(
        `${chalk.greenBright(`${key}`)}  :  ${chalk.yellowBright(`${templateList[key].desc}`)}`,
      );
    } else {
      let fillingContent = '';
      const fillingLength = enMaxLength - keyLength;
      for (let i = 0; i < fillingLength; i++) {
        fillingContent += ' ';
      }
      console.log(
        `${chalk.greenBright(`${fillingContent}${key}`)}  :  ${chalk.yellowBright(
          `${templateList[key].desc}`,
        )}`,
      );
    }
  }
};
