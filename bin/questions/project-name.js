/**
 * 项目名称
 */

module.exports = (projectName) => ({
    type: 'input',
    name: 'name',
    message: '请输入项目名称',
    default: projectName,
})
