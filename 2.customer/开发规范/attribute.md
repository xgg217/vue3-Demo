# attribute

## 多个 attribute 的元素

+ 多个 attribute 的元素应该分多行撰写，每个 attribute 一行

  ```html
  <!-- 反面例子 -->
  <img src="https://vuejs.org/images/logo.png" alt="Vue Logo">

  <MyComponent foo="a" bar="b" baz="c"/>
  ```

  ```html
  <img
    src="https://vuejs.org/images/logo.png"
    alt="Vue Logo"
  >

  <MyComponent
    foo="a"
    bar="b"
    baz="c"
  />
  ```

## 带引号的 attribute 值

+ 非空 HTML attribute 的值应该始终带有引号 (单引号或双引号，选择未在 JS 里面使用的那个)

  ```html
  <!-- 反面例子 -->
  <input type=text>

  <AppSidebar :style={width:sidebarWidth+'px'}>
  ```

  ```html
  <!-- 正面例子 -->
  <input type="text">

  <AppSidebar :style="{ width: sidebarWidth + 'px' }">
  ```

## 元素 attribute 的顺序

1. 定义 (提供组件的选项)

  + is

2. 列表渲染 (创建相同元素的多个变体)

  + v-for

3. 条件 (元素是否渲染/显示)

  + v-if
  + v-else-if
  + v-else
  + v-show
  + v-cloak

4. 渲染修饰符 (改变元素的渲染方式)

  + v-pre
  + v-once

5. 全局感知 (要求在组件以外被感知)

  + id

6. 唯一性 Attribute (需要唯一值的 attribute)

  + ref
  + key

7. 双向绑定 (结合了绑定与事件)

   + v-model

8. 其他 Attribute (所有普通的、绑定或未绑定的 attribute)

9. 事件 (组件事件监听器)

  + v-on

10. 内容 (覆写元素的内容)

  + v-html
  + v-text
