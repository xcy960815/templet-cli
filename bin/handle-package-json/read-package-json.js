// 获取package.json

const fs = require('fs')
// import logSymbols from ('log-symbols')
// console.log('logSymbols', logSymbols)
const chalk = require('chalk')
module.exports = function getPackageJson(projectName) {
    // package.json的路径
    const packagePath = `${projectName}/package.json`
    // logSymbols.success,
    console.log(chalk.green('开始读取package.json文件'))

    const packagejson = fs.readFileSync(packagePath)
    // logSymbols.success,
    console.log(chalk.green('读取package.json文件完毕'))

    return JSON.parse(packagejson)
}
