/**
 * 通过指定模版创建项目
 */

const { templates } = require('../templates.js')
const download = require('download-git-repo')
const chalk = require('chalk')
const ora = require('ora')
const handleSetPackageJson = require('../handle-package-json/index.js')
module.exports = async function (templateName, projectName, answers) {
    // 通过 templateName 获取下载地址
    const { downloadUrl } = templates[templateName]
    const spinner = ora(chalk.green('开始拉取模版...')).start()
    const timeId = setTimeout(() => {
        spinner.color = 'yellow'
        spinner.text = chalk.yellow('当前网速较慢')
    }, 5000)
    // 下载模版
    await download(
        `direct:${downloadUrl}`,
        projectName,
        { clone: true },
        async (err) => {
            // 任务执行完成后 清除提示网速慢的延时器
            clearTimeout(timeId)
            if (err) {
                await spinner.fail(
                    chalk.red(`模版拉取失败,失败原因:${chalk.red(err)}`)
                )
                return
            }
            // 下载成功
            await spinner.succeed(chalk.green('模版拉取完成'))
            // 现在成功之后 修改package.json 内容
            handleSetPackageJson(templateName, projectName, answers)
        }
    )
}
