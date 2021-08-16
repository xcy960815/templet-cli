import execa from 'execa'
import fs from 'fs'
import path from 'path'
import handlebars from 'handlebars'
import chalk from 'chalk'

export default function () {
    console.log(logSymbols.success, chalk.green('模版拉取完成'))

    const packagePath = `${projectName}/package.json`

    const packageContent = fs.readFileSync(packagePath, 'utf-8')

    const newPackageContent = handlebars.compile(packageContent)(answers)

    fs.writeFileSync(packagePath, newPackageContent)

    // 提示项目创建成功
    console.log(chalk.green('项目创建成功'))

    const getRootPath = path.resolve(process.cwd(), projectName)
    // 4. 安装依赖
    console.log(chalk.blue(`安装依赖`))
    // cd到项目中 执行快捷启动指令
    execa('v', {
        cwd: getRootPath,
        stdio: [2, 2, 2],
    })
}
