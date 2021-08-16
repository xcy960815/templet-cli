export default () => {
    return {
        type: 'list',
        message: '选择vue配置',
        name: 'middleware',
        choices: [
            {
                name: 'vue+router',
            },
            {
                name: 'vue+vuex',
            },
            {
                name: 'vue+vuex+router',
            },
        ],
    }
}
