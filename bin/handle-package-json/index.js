const chalk = require('chalk')
const readPackageJson = require('./read-package-json.js')
const writePackageJson = require('./write-package-json.js')
module.exports = async function (projectName, answers) {
    // 读取package.json的内容
    const packageContent = readPackageJson(projectName)
    // 修改package.json的内容
    await writePackageJson(projectName, packageContent, answers)
    // 提示项目创建成功 logSymbols.success,
    console.log(chalk.green('项目创建成功'))
}
