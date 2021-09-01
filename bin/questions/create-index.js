/**
 * 选择指定版本的问题
 */
const inquirer = require('inquirer')
const projectName = require('./project-name.js')
const version = require('./version.js')
const description = require('./description.js')
const author = require('./author.js')
const getUserInfo = require('../user-info/get-user-info.js')
module.exports = async (projectname) => {
    // 获取当前系统用户名称
    const { username } = await getUserInfo()
    projectname = projectname || 'project'
    return await inquirer.prompt([
        projectName(projectname),
        version(),
        description(),
        author(username),
    ])
}
