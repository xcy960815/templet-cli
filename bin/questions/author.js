/**
 * @desc 作者
 * @returns {Object}
 */
const getUserInfo = require('../utils/get-user-info.js')
module.exports = () => {
    // 获取当前系统用户名称
    const { username } = getUserInfo()
    return {
        type: 'input',
        name: 'author',
        default: username,
        message: '请输入项目作者',
    }
}
