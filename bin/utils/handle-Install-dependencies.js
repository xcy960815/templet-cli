/**
 * 处理安装依赖包
 */

const execa = require('execa')
const path = require('path')

module.exports = async function (templateName, projectName) {
    // 获取当前项目的绝对路径
    const getRootPath = path.resolve(process.cwd(), projectName)
    console.log('开始安装依赖包')
    const shell =
        templateName === 'vue2' || templateName === 'vue3' ? 'v' : 'npm install'

    // cd到项目中 执行快捷启动指令
    await execa(shell, {
        shell: true,
        cwd: getRootPath,
        stdio: [2, 2, 2],
    })
    console.log('安装依赖完成')
}
