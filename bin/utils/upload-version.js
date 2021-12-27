const execa = require('execa')

module.exports = async function () {
    // 执行的指令
    const shellCommand = 'npm install weidian-easy-cli -g'
    // cd到项目中 执行快捷启动指令
    await execa(shellCommand, {
        shell: true,
        stdio: [2, 2, 2], //添加下载动画
    })
}
