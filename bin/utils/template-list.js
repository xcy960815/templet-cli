const ora = require('ora');
const { promisify } = require('util');
const request = promisify(require('request'));
const chalk = require('chalk');

/**
 * @link 加速方案 来自于 https://zhuanlan.zhihu.com/p/337469043
 * @desc 查询线上模板列表
 */
module.exports = async function () {
  const spinner = ora(chalk.greenBright('正在查询模板相关配置...'));
  spinner.start();
  const result = await request({
    url: 'https://cdn.jsdelivr.net/gh/xcy960815/template-list@master/template-list.json',
    timeout: 3000,
  }).catch((_error) => {
    spinner.fail(chalk.redBright('模板相关配置查询失败，请稍后再试'));
    process.exit(1);
  });
  spinner.succeed(chalk.greenBright('🎉 模板相关配置查询完成\n'));
  return JSON.parse(result.body);
};
