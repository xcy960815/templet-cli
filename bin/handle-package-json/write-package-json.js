// 获取package.json

const fs = require('fs')
// import logSymbols from ('log-symbols')
// console.log('logSymbols', logSymbols)
const chalk = require('chalk')
/**
 * @param projectName 项目名称
 * @param packageContent 原来的packageJson内容
 * @param answers 修改的内容
 */
module.exports = async function writePackageJson(
    projectName,
    packageContent,
    answers
) {
    // package.json的路径
    const packagePath = `${projectName}/package.json`
    // logSymbols.success,
    console.log(chalk.green('开始修改package.json文件'))
    // 修改package name
    packageContent.name = answers.name ? answers.name : ''
    // 修改package version
    packageContent.version = answers.version ? answers.version : ''
    // 修改package description
    packageContent.description = answers.description ? answers.description : ''
    // 修改package  author
    packageContent.author = answers.author ? answers.author : ''

    await fs.writeFileSync(packagePath, JSON.stringify(packageContent))
    // logSymbols.success,
    console.log(chalk.green('修改package.json文件完毕'))
}
