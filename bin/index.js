#!/usr/bin/env node
const { Command } = require('commander')
const listLog = require('./utils/list-log')
const downloadTemplate = require('./utils/download-template')
const templateQuestions = require('./questions/template-questions')
const initQuestions = require('./questions/init-questions')
const handleSetPackageJson = require('./handle-package-json/index')
const installDependencies = require('./utils/install-dependencies')
const chalk = require('chalk')
const program = new Command()
const checkVersion = require('./utils/check-version')
const checkInternet = require('./utils/check-internet')
const checkFolder = require('./utils/check-folder')
program.version(require('../package.json').version, '-v, --version')

/**
 * 初始化指定版本的指令
 */
program
    .command('create <templateName> <projectName>')
    .description(
        chalk.yellowBright(
            '通过模版创建项目,不知道模板列表的可以执行 list 指令'
        )
    )
    .action(async (templateName, projectName) => {
        // 检查网络
        await checkInternet()
        // 检查版本号
        await checkVersion()
        //收集用户配置
        const answers = await templateQuestions(projectName)
        // 检查文件
        const checkedProjectName = await checkFolder(projectName)
        // 下载模板
        await downloadTemplate(templateName, checkedProjectName, answers)
        // 现在成功之后 修改package.json 内容
        await handleSetPackageJson(checkedProjectName, answers)
        // 安装依赖包
        installDependencies(templateName, checkedProjectName)
    })

/**
 * 用户自己选择版本
 */
program
    .command('init')
    .description('初始化模板')
    .action(async () => {
        // 检查网络
        await checkInternet()
        // 检查版本号
        await checkVersion()
        // 收集用户信息
        const answers = await initQuestions()
        const { templateName, projectName } = answers
        // 检查文件
        const checkedProjectName = await checkFolder(projectName)
        // 下载模板
        await downloadTemplate(templateName, checkedProjectName, answers)
        // 现在成功之后 修改package.json 内容
        await handleSetPackageJson(checkedProjectName, answers)
        // 安装依赖包
        installDependencies(templateName, checkedProjectName)
    })

/**
 * 查看所有的vue版本指令
 * */
program
    .command('list')
    .description('查看所有模版列表')
    .action(async () => {
        // 检查版本号
        await checkVersion()
        listLog()
    })

program
    .command('help')
    .description(
        `本脚手架是用来初始化大数据前端模版，目前只提供了两个模版（vue2、vue3）`
    )

program.parse(process.argv)
