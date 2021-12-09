/**
 * 选择指定版本的问题
 */
const inquirer = require('inquirer')
const projectName = require('./project-name.js')
const version = require('./version.js')
const description = require('./description.js')
const author = require('./author.js')

module.exports = async (projectname) => {
    projectname = projectname ? projectname : 'project'
    return await inquirer.prompt([
        projectName(projectname),
        version(),
        description(),
        author(),
    ])
}
