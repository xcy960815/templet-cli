// const { templates } = require('./template-list.js')
const chalk = require('chalk')
const { promisify } = require('util')
const request = promisify(require('request'))
const ora = require('ora')
// 加速方案 来自于 https://zhuanlan.zhihu.com/p/337469043
module.exports = async function () {
    console.log()
    const spinner = ora(chalk.green('正在查询模板列表'))
    spinner.start()
    const result = await request({
        url: 'https://raw.fastgit.org/ChongYu-Yease/template-list/master/template-list.json',
        timeout: 3000,
    }).catch(() => {
        spinner.fail(chalk.red('😔 模版拉取失败,请检查网络连接后再试一次'))
        process.exit(1)
    })
    spinner.succeed(chalk.green('🎉 模板列表查询完成'))
    console.log()
    const templates = JSON.parse(result.body)
    const templateNames = Object.keys(templates)
    // 英文的最大长度
    const enMaxLength = templateNames.reduce((previousValue, currentValue) => {
        if (currentValue.length >= previousValue) {
            return currentValue.length
        }
    }, 0)

    const templateName = '模板名称'
    const templateDesc = '模板描述'
    let fillingContent = ''
    const fillingLength =
        enMaxLength - templateName.length * 2 /*一个文字等于两个英文*/
    for (let i = 0; i < fillingLength; i++) {
        fillingContent += ' '
    }
    // 输出提示
    console.log(
        `${chalk.redBright(
            `${fillingContent}${templateName}`
        )}  :  ${chalk.redBright(`${templateDesc}`)}`
    )
    // 循环输出
    for (const key in templates) {
        const keyLength = key.length
        if (keyLength === enMaxLength) {
            console.log(
                `${chalk.greenBright(`${key}`)}  :  ${chalk.yellowBright(
                    `${templates[key].desc}`
                )}`
            )
        } else {
            let fillingContent = ''
            const fillingLength = enMaxLength - keyLength
            for (let i = 0; i < fillingLength; i++) {
                fillingContent += ' '
            }
            console.log(
                `${chalk.greenBright(
                    `${fillingContent}${key}`
                )}  :  ${chalk.yellowBright(`${templates[key].desc}`)}`
            )
        }
    }
}
