const { promisify } = require('util');
const getTemplatesList = require('./get-template-list.js');
const chalk = require('chalk');
const ora = require('ora');
const listLog = require('./list-log.js');
/**
 * @desc 下载github的模板
 * @param {模板名称} templateName
 * @param {项目名称} projectName
 * @param {inquirer返回的参数} answers
 */
module.exports = async function (templateName, projectName) {
  const templateList = await getTemplatesList();

  // 判断模板是否存在
  if (!templateList[templateName]) {
    console.log(chalk.red(`===>【${templateName}】模版不存在,请重新选择模版名称。\n`));
    listLog(templateList);
    process.exit(1);
  }
  // 通过 templateName 获取下载地址
  const { downloadUrl } = templateList[templateName]; // 通过模板查找下载url

  const spinner = ora(chalk.green('开始拉取模版...'));
  // 包装成一个promise方法.
  const download = promisify(require('download-git-repo'));

  try {
    // 下载模版
    spinner.start();
    await download(`direct:${downloadUrl}`, projectName, { clone: true });
    spinner.succeed(chalk.green('===> 模版拉取完成\n'));
  } catch (error) {
    spinner.fail(chalk.red(`===> 模版拉取失败,失败原因:${chalk.red(error.message)}`));
    // 退出node进程
    process.exit(1);
  }
};
