const path = require('path');
const fs = require('fs');
const co = require('co');
const prompt = require('co-prompt');
const deleteFolder = require('./delete-folder');
const chalk = require('chalk');
const ora = require('ora');

// 返回运行文件所在的目录 __dirname

// 当前命令所在的目录  path.resolve('./')

// 当前命令所在的目录  process.cwd()

/**
 * @desc 检查当前路径下面 是否存在跟项目重名的文件夹
 * @param {string} folderName
 */
module.exports = async (folderName) => {
  // 目录列表
  const dirList = fs.readdirSync('./');
  // 是否存在相同的项目名称
  const hasSameFolder = dirList.some((name) => name === folderName);
  if (hasSameFolder) {
    // 如果有相同的文件夹名称 询问用户
    const askResult = await co(function* () {
      return yield prompt(
        `
${chalk.yellowBright('检测到当前路径下有跟项目重复的文件夹,是否删除?')}

    ${chalk.greenBright('Y -> 删除重名的文件夹')}
    
    ${chalk.greenBright('N -> 保留重名的文件夹并基于当前文件夹创建一个随机的文件夹后缀')}
    
    `,
      );
    });
    if (['y', 'yes'].includes(askResult.toLowerCase())) {
      // 当前命令所在的地址
      const cliCurrentPath = process.cwd();
      const folderPath = path.resolve(cliCurrentPath, folderName);
      console.log(`${chalk.green('===> 开始删除重复文件')}\n`);
      // 删除文件夹
      await deleteFolder(folderPath);
      console.log(chalk.green('===> 重复文件删除成功\n'));
    } else if (['n', 'no'].includes(askResult.toLowerCase())) {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const fullMonth = month < 10 ? `0${month}` : month;
      const date = currentDate.getDate();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();
      folderName = `${folderName} ${year}-${fullMonth}-${date} ${hours}:${minutes}:${seconds}`;
      console.log(`   随机文件后缀已生成，新的项目名称为==>${chalk.greenBright(folderName)}`);
    } else {
      // 当前命令所在的地址
      const cliCurrentPath = process.cwd();
      const folderPath = path.resolve(cliCurrentPath, folderName);
      console.log(`${chalk.green('===> 开始文件删除\n')}`);
      // 删除文件夹
      await deleteFolder(folderPath);
      console.log(chalk.green('===> 文件删除成功\n'));
    }
  }
  return folderName;
};
