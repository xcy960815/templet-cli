/**
 * @desc 项目版本号
 * @returns
 * {
 * type: 'input',
 * name: 'version',
 * message: '项目版本',
 * default: '1.0.0',
 * }
 */

module.exports = () => ({
  type: 'input',
  name: 'version',
  message: '项目版本',
  default: '1.0.0',
});
