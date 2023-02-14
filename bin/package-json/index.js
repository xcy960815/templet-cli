const chalk = require('chalk')
const path = require('path')
const readPackageContent = require('./read-package-content.js')
const writePackageContent = require('./write-package-content.js')
/**
 * @desc 操作package.json文件
 * @param {创建的项目名称} projectName
 * @param {用户配置} answers
 */
module.exports = async function (projectName, answers) {
    //创建的项目的 package.json的路径
    const packagePath = path.resolve(
        process.cwd(),
        `${projectName}/package.json`
    )
    // 读取项目的package.json的内容
    const projectPackageContent = readPackageContent(packagePath)

    // 修改项目的package.json的内容
    await writePackageContent(packagePath, projectPackageContent, answers)

    // 提示项目创建成功
    console.log(chalk.green('【 templet-cli 】创建项目完成\n'))
}
