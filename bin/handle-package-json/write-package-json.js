// 获取package.json

const fs = require('fs')
const path = require('path')
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
    const packagePath = path.resolve(
        process.cwd(),
        `${projectName}/package.json`
    )
    console.log(`===> ${chalk.yellowBright('开始修改package.json文件')}\n`)

    // 修改package name
    packageContent.name = answers.name ? answers.name : ''

    // 修改package version
    packageContent.version = answers.version ? answers.version : ''

    // 修改package description
    packageContent.description = answers.description ? answers.description : ''

    // 修改package  author
    packageContent.author = answers.author ? answers.author : ''

    await fs.writeFileSync(packagePath, JSON.stringify(packageContent))

    console.log(`===> ${chalk.greenBright('修改package.json文件完毕')}\n`)
}
