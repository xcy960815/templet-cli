const os = require('os')

module.exports = async () => {
    // 获取当前用户
    const { username } = os.userInfo()
    return { username }
}
