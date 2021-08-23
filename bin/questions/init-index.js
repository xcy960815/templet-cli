/**
 * 问题
 */
import inquirer from 'inquirer'
import projectName from './project-name.js'
import version from './version.js'
import description from './description.js'
import vueConfig from './vue-config.js'
import author from './author.js'
import getUserInfo from '../user-info/get-user-info.js'
export default async () => {
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
