const fs = require('fs');

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
        fs.unlinkSync(nextFilePath);
      }
    });
    fs.rmdirSync(filePath);
  }
};
