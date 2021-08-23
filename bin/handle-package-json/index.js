import execa from 'execa'
import ora from 'ora'
import path from 'path'
// import handlebars from 'handlebars'
import chalk from 'chalk'
import logSymbols from 'log-symbols'
import readPackageJson from './read-package-json.js'
import writePackageJson from './write-package-json.js'
export default async function (projectName, answers) {
    console.log(logSymbols.success, chalk.green('模版拉取完成'))

    // 读取package.json的内容
    const packageContent = readPackageJson(projectName)

    // 修改package.json的内容
    await writePackageJson(projectName, packageContent, answers)
    // const newPackageContent = handlebars.compile(packageContent)(answers)

    // newPackageContent.name = answers.name

    // newPackageContent.version = answers.version

    // newPackageContent.description = answers.description

    // newPackageContent.name = answers.author

    // fs.writeFileSync(packagePath, newPackageContent)

    // 提示项目创建成功
    console.log(logSymbols.success, chalk.green('项目创建成功'))

    const getRootPath = path.resolve(process.cwd(), projectName)

    // 下载之前进行loading
    const spinner = ora('安装依赖中').start()

    // cd到项目中 执行快捷启动指令
    execa('v', {
        cwd: getRootPath,
        stdio: [2, 2, 2],
    })
    spinner.succeed()
}
