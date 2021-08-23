// 获取package.json

import fs from 'fs'
import logSymbols from 'log-symbols'
import chalk from 'chalk'
export default function getPackageJson(projectName) {
    // package.json的路径
    const packagePath = `${projectName}/package.json`
    console.log(logSymbols.success, chalk.green('开始读取package.json文件'))

    const packagejson = fs.readFileSync(packagePath)

    console.log(logSymbols.success, chalk.green('读取package.json文件完毕'))

    return JSON.parse(packagejson)
}
