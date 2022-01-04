const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
module.exports = function (projectName) {
    // package.json的路径
    const packagePath = path.resolve(
        process.cwd(),
        `${projectName}/package.json`
    )

    console.log(`${chalk.yellowBright('===> 开始读取package.json文件\n')}`)

    const packagejson = fs.readFileSync(packagePath)

    console.log(`${chalk.greenBright('===> package.json文件读取完毕\n')}`)

    return JSON.parse(packagejson)
}
