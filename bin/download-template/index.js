/**
 * 通过指定模版创建项目
 */

import templates from '../templates.js'
import download from 'download-git-repo'
// import ora from 'ora'
//     // 下载之前进行loading
//     const spinner = ora('模版拉取中').start()
import chalk from 'chalk'
import logSymbols from 'log-symbols'
import handlePackageJson from '../handle-package-json/index.js'
export default async function (templateName, projectName, answers) {
    // 通过 templateName 获取 下载地址
    const { downloadUrl } = templates[templateName]
    // 下载模版
    await download(
        `direct:${downloadUrl}`,
        projectName,
        { clone: true },
        async (err) => {
            if (err) {
                // 下载失败
                // spinner.fail('模版拉取失败')
                console.log(logSymbols.error, chalk.red(err))
                return
            }
            // // 下载成功
            // spinner.succeed('模版拉取完成')
            // 现在成功之后 修改package.json 内容
            handlePackageJson(projectName, answers)
        }
    )
}
