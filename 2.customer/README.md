# 概述

## 环境变量

+ 项目根目录加载额外的环境变量

|文件|内容|
|:-|:-|
|.env|所有情况下都会加载|
|.env.local|所有情况下都会加载，但会被 git 忽略|
|.env.[mode]|只在指定模式下加载|
|.env.[mode].local|只在指定模式下加载，但会被 git 忽略|

+ `.env.*.local` 文件应是本地的，可以包含敏感变量

+ 定义：只有以 `VITE_` 为前缀的变量才会暴露给经过 `vite` 处理的代码（不能包含敏感信息，因为会出现在客户端代码中）

  ```js
  // 错误
  DB_PASSWORD=foobar

  // 正确
  VITE_SOME_KEY=123
  ```

+ 获取

  ```js
  import.meta.env.VITE_SOME_KEY
  ```

## public 目录

+ `public` 中的资源不应该被 JavaScript 文件引用
+ 引入 `public` 中的资源永远应该使用根绝对路径 - 举个例子，`public/icon.png` 应该在源码中被引用为 `/icon.png`
