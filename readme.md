### 安装

```shell
 npm install weidian-easy-cli -g
```

#### 指令 1

```shell
easy list

    模板名称  :  模板描述
    vue2  :  (内部使用) vue2 + vuex + route + element-ui + typescript(javascript)
    vue3  :  (内部使用) vue3 + vuex + route + element-plus + typescript(javascript)
    vite + vue3  :  (开源使用) vue3 + vuex + route + vite + element-plus + typescript(javascript)
    rollup-js-template  :  (开源使用) 用rollup打包js的模版
    rollup-ts-template  :  (开源使用)  用rollup打包ts的模版
    rollup-vue-components : (开源使用) 用 rollup 打包 vue 组件的模版
    rollup-vue-components-ts : (开源使用) 用 rollup 打包 vue-ts 组件的模版

```

#### 指令 2

```shell
easy init

    ? 请选择模版版本 (Use arrow keys)
    ❯ vue2
    vue3
    vite + vue3
    rollup-js-template
    rollup-ts-template
    rollup-vue-components
    rollup-vue-components-ts
```

#### 指令 3

```shell
easy create <templateName> <projectName>

    templateName --> 模板名称  不知道模板名称可以执行 easy list 查看
    projectName --> 项目名称   自己的项目名称
```
