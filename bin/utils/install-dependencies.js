<<<<<<< HEAD
/**
 * 处理安装依赖包
 */
const execa = require("execa");
const path = require("path");
const chalk = require("chalk");
=======

const execa = require('execa')
const path = require('path')
const chalk = require('chalk')

>>>>>>> acb07d8ac9a7b8dc88231df28b3d6219750f389b
/**
 * @desc 给当前项目安装依赖包
 * @param {模板名称} templateName
 * @param {项目名称} projectName
 * @returns
 */
module.exports = async (templateName, projectName) => {
<<<<<<< HEAD
  // 获取当前项目的绝对路径
  const getRootPath = path.resolve(process.cwd(), projectName);
  console.log(`⌛️ ${chalk.greenBright("开始安装依赖包")}`);
  // 一次性切换npm源
  const shellCommand = "npm --registry https://registry.npm.taobao.org install";
  // cd到项目中 执行快捷启动指令
  await execa(shellCommand, {
    shell: true,
    cwd: getRootPath,
    stdio: [2, 2, 2],
  });
  console.log(chalk.greenBright("   🎉依赖包安装完成\n"));

  // cd 到项目里面
  console.log(
    `   ${chalk.redBright("cd")} ${chalk.yellowBright(projectName)}\n`
  );

  // 启动
  console.log(
    `   ${chalk.greenBright(isWeidianProject ? "v" : "npm run dev")}`
  );
};
=======
    // 获取当前项目的绝对路径
    const getRootPath = path.resolve(process.cwd(), projectName)
    console.log(`⌛️ ${chalk.greenBright('开始安装依赖包')}`)
    // 一次性切换npm源
    const shellCommand = 'npm --registry https://registry.npm.taobao.org install'
    // cd到项目中 执行快捷启动指令
    await execa(shellCommand, {
        shell: true,
        cwd: getRootPath,
        stdio: [2, 2, 2],
    })
    console.log(chalk.greenBright('   🎉依赖包安装完成\n'))

    // 输出cd 指令
    console.log(
        `   ${chalk.redBright('cd')} ${chalk.yellowBright(projectName)}\n`
    )
    // 输出启动指令
    console.log(
        `   ${chalk.greenBright('npm run dev')}`
    )
}
>>>>>>> acb07d8ac9a7b8dc88231df28b3d6219750f389b
