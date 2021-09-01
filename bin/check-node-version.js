// 检查node版本
module.exports = function checkNodeVersion() {
    const nodeVersion = process.versions.node
    console.log('nodeVersion', nodeVersion)
    const oldNodeVersion = 13.4
    console.log()
    if (Number(nodeVersion) > oldNodeVersion) {
        console.log(
            '当前node版本过低，已临时加载指定版本node，执行完毕之后自动删除'
        )
    }
}
