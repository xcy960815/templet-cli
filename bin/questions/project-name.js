/**
 * @desc 项目名称
 * @returns {Object}
 */

module.exports = (projectName) => {
  projectName = projectName ? projectName : 'project';
  return {
    type: 'input',
    name: 'projectName',
    message: '请输入项目名称',
    default: projectName,
  };
};
