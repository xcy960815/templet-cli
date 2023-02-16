const getTemplatesList = require('../utils/get-template-list');

/**
 * @desc 选择指定版本的问题
 * @returns {type: 'list', message: '请选择模版版本', name: 'templateName', choices: Array<{ name: key }>}
 */
module.exports = async () => {
  const templateList = await getTemplatesList();
  const choices = [];
  for (const key in templateList) {
    choices.push({ name: key });
  }
  return {
    type: 'list',
    message: '请选择模版版本',
    name: 'templateName',
    choices,
  };
};
