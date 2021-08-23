/**
 * 作者
 */

export default (author) => {
    return {
        type: 'input',
        name: 'author',
        default: author,
        message: '请输入项目作者',
    }
}
