export default () => {
    return {
        type: 'list',
        message: '请选择vue版本',
        name: 'templateName',
        choices: [
            {
                name: 'vue2',
            },
            {
                name: 'vue3',
            },
        ],
    }
}
