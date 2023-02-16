const semver = require('semver');
const co = require('co');
const prompt = require('co-prompt');
const chalk = require('chalk');
const { promisify } = require('util');
const uploadVersion = require('./upload-version');
const getPackageContent = require('./get-package-content');
const { name, version } = getPackageContent(['name', 'version']);
const ora = require('ora');

/**
 * @desc 检查线上最新的脚手架版本号
 * @return {Promise<void>}
 */
module.exports = async () => {
  const spinner = ora(chalk.green('正在检查脚手架版本\n'));
  spinner.start();
  const request = promisify(require('request'));
  const result = await request({
    url: `https://registry.npmjs.org/${name}`,
    // 为了用户体验，这里时间不能太长
    timeout: 3000,
  }).catch(() => {
    spinner.fail(chalk.red('脚手架版本检查失败请重试一次\n'));
    process.exit(1);
  });
  spinner.succeed(`${chalk.green('🎉 手架版本检查完成')}\n`);
  const { body, statusCode } = result;
  if (statusCode === 200) {
    const parseBody = JSON.parse(body);
    // 获取最新的cli版本
    const latestVersion = parseBody['dist-tags'].latest;
    // 当前版本号
    const currentVersion = version;
    // 版本号对比
    const hasNewVersion = semver.lt(currentVersion, latestVersion);
    if (hasNewVersion) {
      console.log(chalk.yellow(`  A newer version of ${name} is available`));
      console.log('  最新版本:    ' + chalk.green(latestVersion));
      console.log('  当前版本:    ' + chalk.red(currentVersion));
      const uploadResult = await co(function* () {
        return yield prompt(`  Do you want to update the ${name} ? [Y/N]`);
      });
      if (['y', 'yes'].includes(uploadResult.toLowerCase())) {
        await uploadVersion(latestVersion);
      } else if (['n', 'no'].includes(uploadResult.toLowerCase())) {
        console.log(chalk.red('已放弃版本更新'));
      }
    }
  } else {
    console.log(chalk.yellowBright('获取版本号失败，跳过更新\n'));
  }
};
