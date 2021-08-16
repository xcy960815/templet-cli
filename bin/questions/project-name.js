/**
 * 项目名称
 */

export default (projectName) => ({
    type: 'input',
    name: 'name',
    message: '请输入项目名称',
    default: projectName,
})
