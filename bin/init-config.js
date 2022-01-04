/**
 * 本文件是设置开发配置或者是发布配置的文件，由来原因是
 * 1、因为开发cli需要 重新修改 cli 指令名称（不做修改的话 就跟全局安装的npm包重名了）
 * 2、全局运行 npm link
 * 3、修改好之后 又要 运行npm unlink
 * 4、修改 package.json bin 的cli 指令名称 很是麻烦
 * 设计思路
 * 1、判断是开发还是发布
 * 1-1、如果是开发
 */
const execa = require('execa')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')
const readPackageJson = require('../bin/package-json/read-package-json.js')
const writePackageJson = require('../bin/package-json/write-package-json.js')
const updateVersion = require('../bin/utils/update-version.js')
// 询问用户 cli 测试的 名字
const initQuestions = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'shellName',
            message: '请输入cli测试指令',
            validate: function (answer) {
                // inquirer验证
                if (answer.length < 1) {
                    return '请输入cli测试指令'
                } else {
                    const reg = /^[5A-Za-z0-9-\_]+$/
                    if (reg.test(answer)) {
                        return true
                    } else {
                        console.log(
                            chalk.redBright(
                                'cli名称只能输入英文，数字，下划线，横线'
                            )
                        )
                    }
                }
            },
        },
    ])
}
//本cli的 package.json的路径
const packagePath = path.resolve(__dirname, '../package.json')
/**
 * 初始化配置
 */
const initConfig = async () => {
    // 判断是不是生产环境
    const isProduction = process.env.NODE_ENV === 'production'
    // 发布
    if (isProduction) {
        // 读取项目的package.json的内容
        const packageContent = readPackageJson(packagePath)
        // 更新版本号
        const lastVersion = updateVersion(packageContent.version)
        const answers = {
            version: lastVersion,
            bin: {
                tem: '/bin/index.js',
            },
        }
        // 修改项目的package.json的内容
        await writePackageJson(packagePath, packageContent, answers)
        // 执行 npm unlink 移除全局指令 start
        const unlinkCommand = 'npm unlink'

        await execa(unlinkCommand, {
            shell: true,
            stdio: [2, 2, 2],
        })
        console.log(chalk.blueBright('===> 已移除全局指令'))
        // 执行 npm unlink 移除全局指令 end
        const publishCommand =
            'npm --registry https://registry.npmjs.org/ publish'
        await execa(publishCommand, {
            shell: true,
            stdio: [2, 2, 2],
        })
    } else {
        // const installCommand = 'npm install'
        // await execa(installCommand, {
        //     shell: true,
        //     stdio: [2, 2, 2],
        // })
        // 获取cli指令
        const { shellName } = await initQuestions()
        // 读取项目的package.json的内容
        const packageContent = readPackageJson(packagePath)
        const answers = {
            bin: {
                [shellName]: '/bin/index.js',
            },
        }
        // 修改项目的package.json的内容
        await writePackageJson(packagePath, packageContent, answers)

        // 执行 npm unlink 移除全局指令 start
        const unlinkCommand = 'npm unlink'

        await execa(unlinkCommand, {
            shell: true,
            stdio: [2, 2, 2],
        })
        console.log(chalk.blueBright('\n===> 已移除全局指令\n'))
        // 执行 npm unlink 移除全局指令 end
        // 执行 npm link 移除全局指令 start
        const linkCommand = 'npm link'

        await execa(linkCommand, {
            shell: true,
            stdio: [2, 2, 2],
        })
        console.log(chalk.blueBright(`\n===> 已安装全局指令 ${shellName}\n`))
        // 执行 npm link 移除全局指令 end
    }
}
initConfig()
