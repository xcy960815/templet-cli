const semver = require('semver')
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
// const packageContent = require('../../package.json')
const { promisify } = require('util')
const uploadVersion = require('./upload-version')
const fs = require('fs')
const path = require('path')
const packagePath = path.resolve(__dirname, '../../package.json')
const { name, version } = JSON.parse(fs.readFileSync(packagePath))

module.exports = async () => {
    const request = promisify(require('request'))
    const result = await request({
        url: `https://registry.npmjs.org/${name}`,
        //为了用户体验，这里时间不能太长
        timeout: 3000,
    })
    const { body, statusCode } = result
    if (statusCode === 200) {
        const parseBody = JSON.parse(body)
        // 获取最新的cli版本
        const latestVersion = parseBody['dist-tags'].latest

        // 当前版本号
        const currentVersion = version

        // 版本号对比
        const hasNewVersion = semver.lt(currentVersion, latestVersion)
        if (hasNewVersion) {
            console.log(
                chalk.yellow(`  A newer version of ${name} is available`)
            )
            console.log('  最新版本:    ' + chalk.green(latestVersion))
            console.log('  当前版本:    ' + chalk.red(currentVersion))

            const uploadResult = await co(function* () {
                return yield prompt(
                    '  Do you want to update the package ? [Y/N]'
                )
            })
            if (['y', 'yes'].includes(uploadResult.toLowerCase())) {
                await uploadVersion(latestVersion)
            } else if (['n', 'no'].includes(uploadResult.toLowerCase())) {
                console.log(chalk.red('已放弃版本更新'))
            }
        }
    } else {
        console.log(chalk.red('\n获取版本号失败，跳过更新'))
    }
}
