const execa = require('execa');
const getPackageContent = require('./get-package-content');
const { name } = getPackageContent(['name']);

/**
 * @desc 将依赖包更新到指定的版本号
 * @param {最新的版本号} latestVersion
 */
module.exports = async function (latestVersion) {
  // 强制安装最新指定版本的依赖包
  const shellCommand = `npm install ${name}@${latestVersion} -g`;
  // cd到项目中 执行快捷启动指令
  await execa(shellCommand, {
    shell: true,
    stdio: [2, 2, 2], //添加下载动画
  });
};
