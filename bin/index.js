#!/usr/bin/env node
//获取用户命令 方式
// 原生获取用户指令的方式 较为麻烦 所以这里采用 commander
// console.log(process.argv)

const { Command } = require('commander')
// const fs = require('fs')
const { templates } = require('./templates.js')
const downloadTemplate = require('./download-template/index.js')
const createIndex = require('./questions/create-index.js')
const initIndex = require('./questions/init-index.js')
const chalk = require('chalk')
const path = require('path')
// const { fileURLToPath } = require('url')
// const checkNodeVersion = require('./check-node-version.js')
/**
 * 设计思路
 * 1、解析用户输入的指令
 * list 指令
 * create <templateName> <projectName> 指令
 * init  指令
 * 除了list 指令之外统统都需要询问用户 projectName version desc
 *
 */

/**
 * 输出指令版本号
 */
const program = new Command()
// const __dirname1 = fileURLToPath(import.meta.url)
// path.resolve(__dirname, '../../package.json')
// const packageContent = fs.readFileSync('../package.json')
// const { version } = JSON.parse(packageContent)
program.version('1.0.8', '-V, --version')

/**
 * 初始化指定版本的指令
 */
program
    .command('create <templateName> <projectName>')
    .description('通过🈯️模版创建项目')
    .action(async (templateName, projectName) => {
        // 获取用户配置
        const answers = await createIndex(projectName)

        downloadTemplate(templateName, projectName, answers)
    })

/**
 * 用户自己选择版本
 */
program
    .command('init')
    .description('通过选择模版创建项目')
    .action(async () => {
        const answers = await initIndex()
        const { templateName, name } = answers
        const projectName = name
        downloadTemplate(templateName, projectName, answers)
    })

/**
 * 查看所有的vue版本指令
 * */
program
    .command('list')
    .description('查看所有模版列表')
    .action(() => {
        for (const key in templates) {
            console.log(
                chalk.greenBright(`${key}`) +
                    ' : ' +
                    chalk.yellowBright(`${templates[key].desc}`)
            )
        }
    })

program
    .command('help')
    .description(
        `本脚手架是用来初始化大数据前端模版，目前只提供了两个模版（vue2、vue3）`
    )

program.parse(process.argv)
