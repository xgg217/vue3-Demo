<!--
 * @Author: 付祖敏 1326580471@qq.com
 * @Date: 2022-05-27 16:54:10
 * @LastEditors: 付祖敏 1326580471@qq.com
 * @LastEditTime: 2022-05-27 21:52:54
 * @FilePath: \6.响应式\README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# virtual dom

## 概述

  - 所谓的 `virtual dom` ，也就是虚拟节点。
  - 它通过 JS 的 `Object` 对象模拟 DOM 中的节点，然后再通过特定的 `render` 方法将其渲染成真实的 DOM 节点
  ![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/4/9/16a014193dd4ac5c~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)

## 具体步骤

  1. 实现一个 `utils` 方法库
  2. 实现一个 `Element（virtual dom）`
  3. 实现 `diff` 算法
  4. 实现 `patch`

## diff 算法

  - diff 算法进行虚拟节点 `Element` 的对比，并返回一个 `patch` 对象，用来存储两个节点不同的地方
  - 这也是整个 `virtual dom` 实现最核心的一步
  - 而 `diff` 算法又包含了两个不一样的算法，一个是 `O(n)` ，一个则是 `O(max(m, n))`

## 同层级元素比较 O(n)

  - 如果元素之间进行完全的一个比较，即新旧 Element 对象的父元素，本身，子元素之间进行一个混杂的比较，其实现的时间复杂度为 O(n^3)
  - 但是在我们前端开发中，很少会出现跨层级处理节点，所以这里我们会做一个同级元素之间的一个比较，则其时间复杂度则为 O(n)

## 
