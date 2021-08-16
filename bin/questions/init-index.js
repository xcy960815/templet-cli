/**
 * 问题
 */
import inquirer from 'inquirer'
import projectName from './project-name.js'
import version from './version.js'
import description from './description.js'
import vueConfig from './vue-config.js'
export default async (projectname) => {
    projectname = projectname || 'project'
    return await inquirer.prompt([
        vueConfig(),
        projectName(projectname),
        version(),
        description(),
    ])
}
