const chalk = require('chalk')
const readPackageJson = require('./read-package-json.js')
const writePackageJson = require('./write-package-json.js')
const path = require('path')
const fs = require('fs')

module.exports = async function (projectName, answers) {
    // 读取项目的package.json的内容
    const packageContent = readPackageJson(projectName)

    // 修改项目的package.json的内容
    await writePackageJson(projectName, packageContent, answers)

    // 本cli的package的地址
    const packagePath = path.resolve(__dirname, '../../package.json')

    const localPackageContent = JSON.parse(fs.readFileSync(packagePath))

    const { name } = localPackageContent

    // 提示项目创建成功
    console.log(chalk.green(`【 ${name} 】项目创建成功\n`))
}
