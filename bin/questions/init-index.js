/**
 * 问题
 */
const inquirer = require('inquirer')
const projectName = require('./project-name.js')
const version = require('./version.js')
const description = require('./description.js')
const vueConfig = require('./vue-config.js')
const author = require('./author.js')
const getUserInfo = require('../user-info/get-user-info.js')
module.exports = async () => {
    // 获取当前系统用户名称
    const { username } = await getUserInfo()
    return await inquirer.prompt([
        vueConfig(),
        projectName('project'),
        version(),
        description(),
        author(username),
    ])
}
