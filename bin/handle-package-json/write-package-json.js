// 获取package.json

import fs from 'fs'
import logSymbols from 'log-symbols'
import chalk from 'chalk'
/**
 * @param projectName 项目名称
 * @param packageContent 原来的packageJson内容
 * @param answers 修改的内容
 */
export default async function writePackageJson(
    projectName,
    packageContent,
    answers
) {
    // package.json的路径
    const packagePath = `${projectName}/package.json`
    console.log(logSymbols.success, chalk.green('开始修改package.json文件'))
    // 修改package name
    packageContent.name = answers.name ? answers.name : ''
    // 修改package version
    packageContent.version = answers.version ? answers.version : ''
    // 修改package description
    packageContent.description = answers.description ? answers.description : ''
    // 修改package  author
    packageContent.author = answers.author ? answers.author : ''

    await fs.writeFileSync(packagePath, JSON.stringify(packageContent))

    console.log(logSymbols.success, chalk.green('修改package.json文件完毕'))
}
