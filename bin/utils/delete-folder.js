const fs = require('fs');
const chalk = require('chalk');
/**
 * @desc 删除文件
 * @param {string} filePath
 * @returns {boolean} 删除成功返回true 否则返回false
 */
module.exports = function deleteFolder(filePath) {
  if (fs.existsSync(filePath)) {
    const files = fs.readdirSync(filePath);
    files.forEach((file) => {
      const nextFilePath = `${filePath}/${file}`;
      const states = fs.statSync(nextFilePath);
      if (states.isDirectory()) {
        // recurse
        deleteFolder(nextFilePath);
      } else {
        // delete file
        try {
          fs.unlinkSync(nextFilePath);
        } catch (err) {
          console.log(chalk.redBright(`无法删除文件 ${nextFilePath}: ${err.message}`));
        }
      }
    });
    try {
      fs.rmdirSync(filePath);
    } catch (err) {
      console.log(chalk.redBright(`无法删除文件夹 ${filePath}: ${err.message}`));
    }
  }
};
