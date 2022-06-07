# Prop

## 概述

+ 命名
+ 定义

## 命名

+ 在声明 `prop` 的时候，其命名应该始终使用 `camelCase` ，而在模板和 JSX 中应该始终使用 `kebab-case`

  ```js
  // 反面例子
  props: {
    'greeting-text': String
  }

  <WelcomeMessage greetingText="hi"/>
  ```

  ```js
  // 正面例子
  props: {
    greetingText: String
  }

  <WelcomeMessage greeting-text="hi"/>
  ```

## Prop 定义

+ Prop 定义应尽量详细

  ```js
  // 错误
  props: ['status']
  ```

  ```js
  // 正确
  props: {
    status: String
  }

  props: {
    status: {
      type: String,
      required: true,
      validator: value => {
        return [
          'syncing',
          'synced',
          'version-conflict',
          'error'
        ].includes(value)
      }
    }
  }
  ```


