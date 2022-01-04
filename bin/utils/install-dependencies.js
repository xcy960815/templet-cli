/**
 * 处理安装依赖包
 */
const execa = require('execa')
const path = require('path')
const chalk = require('chalk')
/**
 * 给当前项目安装依赖包
 * @param {模板名称} templateName
 * @param {项目名称} projectName
 */
module.exports = async (templateName, projectName) => {
    // 获取当前项目的绝对路径
    const getRootPath = path.resolve(process.cwd(), projectName)
    console.log(`⌛️ ${chalk.greenBright('开始安装依赖包')}`)
    const isWeidianProject = ['vue2', 'vue3'].includes(templateName)
    // 一次性切换npm源
    const shellCommand = isWeidianProject
        ? 'npm --registry http://npm.idcvdian.com/ install'
        : 'npm --registry https://registry.npm.taobao.org install'

    // cd到项目中 执行快捷启动指令
    await execa(shellCommand, {
        shell: true,
        cwd: getRootPath,
        stdio: [2, 2, 2],
    })
    console.log(chalk.greenBright('   🎉依赖包安装完成\n'))

    // cd 到项目里面
    console.log(
        `   ${chalk.redBright('cd')} ${chalk.yellowBright(projectName)}\n`
    )

    // 启动
    console.log(
        `   ${chalk.greenBright(isWeidianProject ? 'v' : 'npm run dev')}`
    )
}
