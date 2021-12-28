/**
 * 通过指定模版创建项目
 */
const { promisify } = require('util')
const { templates } = require('./template-list.js')
const chalk = require('chalk')
const ora = require('ora')

/**
 *
 * @param {模板名称} templateName
 * @param {项目名称} projectName
 * @param {inquirer返回的参数} answers
 */
module.exports = async function (templateName, projectName) {
    // 通过 templateName 获取下载地址
    const { downloadUrl } = templates[templateName] //通过模板查找下载url

    const spinner = ora(chalk.green('开始拉取模版...'))
    // 包装成一个promise方法.
    const download = promisify(require('download-git-repo'))

    try {
        // 下载模版
        spinner.start()
        await download(`direct:${downloadUrl}`, projectName, { clone: true })
        spinner.succeed(chalk.green('模版拉取完成'))
    } catch (error) {
        spinner.fail(
            chalk.red(`模版拉取失败,失败原因:${chalk.red(error.message)}`)
        )
        // 退出node进程
        process.exit(1)
    }
}
