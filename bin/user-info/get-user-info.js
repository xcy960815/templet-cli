import os from 'os'

export default async function getUserInfo() {
    // 获取当前用户
    const { username } = os.userInfo()
    return { username }
}
