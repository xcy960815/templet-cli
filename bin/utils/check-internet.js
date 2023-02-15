// 检测网络
const isOnline = require('is-online');
const chalk = require('chalk');

/**
 * @desc 检查网络
 * @returns {Promise<void>}
 */
module.exports = async () => {
  const online = await isOnline({
    timeout: 1000,
    version: 'v4',
  });
  if (!online) {
    console.log(chalk.red('请检查网络'));
    process.exit(1);
  }
};
