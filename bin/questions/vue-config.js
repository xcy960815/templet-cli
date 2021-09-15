const { templates } = require('../templates')

const choices = []
for (const key in templates) {
    choices.push({ name: key })
}
module.exports = () => {
    return {
        type: 'list',
        message: '请选择模版版本',
        name: 'templateName',
        choices,
    }
}
