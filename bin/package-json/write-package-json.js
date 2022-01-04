// 获取package.json

const fs = require('fs')
const chalk = require('chalk')
/**
 * @param projectName 项目名称
 * @param packageContent 原来的packageJson内容
 * @param answers 修改的内容
 */
module.exports = async function writePackageJson(
    packagePath,
    packageContent,
    answers
) {
    console.log(`${chalk.yellowBright('===> 开始修改package.json文件')}\n`)

    Object.keys(answers).forEach((answer) => {
        const answerValue = answers[answer]

        const hasKey = packageContent.hasOwnProperty(answer)

        if (hasKey) {
            packageContent[answer] = answerValue ? answerValue : ''
        } else if (answer === 'projectName') {
            packageContent.name = answerValue
        }
    })

    fs.writeFileSync(packagePath, JSON.stringify(packageContent, null, 4))

    console.log(`${chalk.greenBright('===> 修改package.json文件完毕')}\n`)
}
