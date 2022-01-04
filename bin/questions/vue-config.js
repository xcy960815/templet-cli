const getTemplatesList = require('../utils/template-list')

module.exports = async () => {
    const templates = await getTemplatesList()
    const choices = []
    for (const key in templates) {
        choices.push({ name: key })
    }
    return {
        type: 'list',
        message: '请选择模版版本',
        name: 'templateName',
        choices,
    }
}
