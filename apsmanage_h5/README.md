# 全流程管理项目
在线地址：
## 起步
```bash
#Steps 1

npm install pnpm -g

#Steps 3

pnpm install

#Steps 4

pnpm run dev

```

## 目录
```text
|-- apsmanage_h5
    |-- .eslintignore
    |-- .eslintrc-auto-import.json  //auto-import的eslint文件
    |-- .eslintrc.js
    |-- .gitignore
    |-- index.html
    |-- package.json
    |-- postcss.config.js
    |-- README.md
    |-- vite.config.js
    |-- yarn.lock
    |-- DirectoryV2.xml //webstomr treeinfotip目录提示插件
    |-- public
    |   |-- constant.js
    |   |-- favicon.png
    |-- src
        |-- auto-import.d.ts  //auto-import的类型定义文件
        |-- http.rest //vscode 插件 rest client 生成的调试文件，无需关注
        |-- App.vue
        |-- main.js
        |-- api
        |   |-- axios.js
        |   |-- ddServe.js // 钉钉服务
        |-- assets
        |-- components
        |   |-- gaodemap.vue
        |   |-- remoteSelectInput.vue
        |-- directives
        |   |-- index.js //全局指令
        |-- plugins
        |   |-- nprogress.js
        |   |-- vant.js
        |-- router
        |   |-- index.js
        |-- store
        |   |-- index.js
        |   |-- user.js
        |-- styles
        |   |-- base.css
        |   |-- base.scss
        |   |-- mixins.scss
        |   |-- variable.scss
        |-- utils
        |   |-- ddApi.js // 钉钉授权,钉钉的一些操作放这里，需要反向代理
        |   |-- remoteLoad.js
        |   |-- scrollTo.js
        |   |-- timeFormat.js
        |   |-- utils.js
        |-- views
            |-- index.vue  
            |-- 404
            |-- myClient // 业务全流程
            |-- prodFow // 生产全流程
```

## 技术栈

| 技术           | 说明                | 官网                                                                               |
|--------------|-------------------|----------------------------------------------------------------------------------|
| Vite         | 下一代前端开发与构建工具      | [https://cn.vitejs.dev/](https://cn.vitejs.dev/)                                 |
| Vue3         | 渐进式JavaScript 框架  | [https://v3.cn.vuejs.org/](https://v3.cn.vuejs.org/guide/introduction.html)      |
| Vue-router   | 官方的路由管理器          | [https://router.vuejs.org/](https://router.vuejs.org/) |
| Pinia        | 全局状态管理模式          | [https://pinia.vuejs.org/](https://pinia.vuejs.org/) |
| Axios        | 基于Promise 的HTTP 库 | [https://github.com/axios/axios](https://github.com/axios/axios)                 |
| Element-plus | 前端桌面端UI组件库        | [https://element-plus.gitee.io/](https://element-plus.gitee.io/zh-CN/#/)                                   |
| Vant         | 前端移动端UI组件库        | [https://vant-contrib.gitee.io/vant](https://vant-contrib.gitee.io/vant/#/zh-CN/home)                            |
| SCSS         | CSS预处理器           | [https://sass-lang.com/](https://sass-lang.com/)                                 |
| VueUse       | Hook库             | [https://vueuse.org/](https://vueuse.org/)                               |
| unocss       | 即时按需原子CSS引擎。      | [ https://github.com/unocss/unocss]( https://github.com/unocss/unocss)   |
| pinia-plugin-persist       | 固化Pinia       | [ https://www.npmjs.com/package/pinia-plugin-persist]( https://www.npmjs.com/package/pinia-plugin-persist)   |
## PC调试钉钉api
只能访问根路由，修改router.js,重定向到需要调试的页面（不好用）
```bash
#Steps 1

npm i dingtalk-design-cli -g

#Steps 2

ding dev web --targetH5Url http://你的ip:4500

```
## 推荐插件
1. `WebStorm`插件`treeinfotip`
![](https://static-1253419794.cos.ap-nanjing.myqcloud.com/img/1658386556494.png)
## 注意
1. Element-plus和Vant已做按需加载，无需在页面中引入；
2. vue、vue-router、pinia 等api已做自动化引入，无需在页面单独引入；
3. 项目中对非200请求进行弹窗提示，如果需要忽略全局错误弹窗，配置config的notify参数，```fetchPost(`/materialOffer/uploadOffer`,params,{notify:true}```

## commitLint

提交格式：
```
<type>(<scope>): <subject>
```
1. `type` 为必填项，用于指定 commit 的类型
build : 更改构建系统和外部依赖项（如将 gulp 改为 webpack，更新某个 npm 包）  
docs : 仅仅修改文档说明  
feat : 增加一个新特性  
fix : 修复一个 bug  
perf : 更改代码以提高性能  
refactor : 代码重构时使用  
style : 不影响代码含义的改动，例如去掉空格、改变缩进、增删分号  
test : 增加新的测试功能或更改原有的测试模块  
其他自定义类型：在配置文件新增即可  

2. `scope` 为非必填项，用于描述改动的影响范围
scope可以是文件名，也可以是模块名，由自己定

3. `subject` 是必填项，这次提交的日志信息
