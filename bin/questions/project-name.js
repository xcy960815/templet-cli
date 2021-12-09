/**
 * 项目名称
 */

module.exports = (projectName) => {
    projectName = projectName ? projectName : 'project'
    return {
        type: 'input',
        name: 'projectName',
        message: '请输入项目名称',
        default: projectName,
    }
}
