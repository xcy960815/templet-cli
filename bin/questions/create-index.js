/**
 * 问题
 */
import inquirer from 'inquirer'
import projectName from './project-name.js'
import version from './version.js'
import description from './description.js'
import author from './author.js'
import getUserInfo from '../user-info/get-user-info.js'
export default async (projectname) => {
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
