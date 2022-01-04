/**
 * 问题
 */
const inquirer = require('inquirer')
const projectName = require('./project-name.js')
const version = require('./version.js')
const description = require('./description.js')
const vueConfig = require('./vue-config.js')
const author = require('./author.js')

module.exports = async () => {
    return await inquirer.prompt([
        await vueConfig(),
        projectName(),
        version(),
        description(),
        author(),
    ])
}
