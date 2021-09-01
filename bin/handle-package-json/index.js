const execa = require('execa')
const ora = require('ora')
const path = require('path')
const chalk = require('chalk')
// import logSymbols from ('log-symbols')

const readPackageJson = require('./read-package-json.js')
const writePackageJson = require('./write-package-json.js')
module.exports = async function (templateName, projectName, answers) {
    // 读取package.json的内容
    const packageContent = readPackageJson(projectName)

    // 修改package.json的内容
    await writePackageJson(projectName, packageContent, answers)

    // 提示项目创建成功 logSymbols.success,
    console.log(chalk.green('项目创建成功'))

    const getRootPath = path.resolve(process.cwd(), projectName)

    // 下载之前进行loading
    const spinner = ora('安装依赖中').start()
    const shell =
        templateName === 'vue2' || templateName === 'vue3' ? 'v' : 'npm install'

    // cd到项目中 执行快捷启动指令
    await execa(shell, {
        shell: true,
        cwd: getRootPath,
        stdio: [2, 2, 2],
    })
    spinner.succeed('安装依赖完成')
}
