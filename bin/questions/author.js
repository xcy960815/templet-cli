/**
 * 作者
 */

module.exports = (author) => {
    return {
        type: 'input',
        name: 'author',
        default: author,
        message: '请输入项目作者',
    }
}
