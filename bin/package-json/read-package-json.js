const fs = require('fs')
const chalk = require('chalk')
/**
 *
 * @param {package.json 的路径} packagePath
 * @returns package.json 的内容
 */
module.exports = function (packagePath) {
    console.log(`${chalk.yellowBright('===> 开始读取package.json文件\n')}`)

    const packagejson = fs.readFileSync(packagePath)

    console.log(`${chalk.greenBright('===> package.json文件读取完毕\n')}`)

    return JSON.parse(packagejson)
}
