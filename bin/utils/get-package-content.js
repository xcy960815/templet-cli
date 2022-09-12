const { readFileSync } = require('fs')
const path = require('path')

/**
 * @desc 获取package的属性
 * @params {string} packageKey package.json 里面的属性
 * @returns packageKey存在的时候 就返回packageKey 所对应的值 否则 返回全部的package.json的内容
 */
module.exports = function getPackage(packageKeys) {
    const packageContent = {}
    const packagePath = path.resolve(__dirname, '../../package.json')
    const packageOriginalContent = JSON.parse(readFileSync(packagePath) || '{}')
    if (packageKeys && packageKeys.length) {
        packageKeys.forEach(key => {
            packageContent[key] = packageOriginalContent[key]
        })
    } else {
        return packageOriginalContent
    }
    return packageContent !== JSON.stringify("{}") ? packageContent : packageOriginalContent
}
