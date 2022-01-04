const chalk = require('chalk')

const getTemplateList = require('./template-list.js')
/**
 * 循环输出 从网上查询的模板列表
 */
module.exports = async function () {
    const templates = await getTemplateList()
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
