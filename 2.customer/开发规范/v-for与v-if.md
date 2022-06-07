## v-for与v-if

## v-for 设置 key 值

+ 始终以 `key` 配合 `v-for`

## 避免 v-if 和 v-for 一起使用

+ 永远不要在一个元素上同时使用 `v-if` 和 `v-for`
+ 在 vue3 种 `v-if` 的优先级现在高于 `v-for`

+ 解决方案：

  1. 使用计算属性
  2. 将 `v-if` 移动至容器元素上

  ```html
  <!-- 错误 -->
  <ul>
    <li
      v-for="user in users"
      v-if="user.isActive"
      :key="user.id"
    >
      {{ user.name }}
    </li>
  </ul>
  ```

  ```html
  <!-- 方式1 -->
  <ul>
    <li
      v-for="user in activeUsers"
      :key="user.id"
    >
      {{ user.name }}
    </li>
  </ul>

  <!-- 方式1 -->
  <ul>
    <template v-for="user in users" :key="user.id">
      <li v-if="user.isActive">
        {{ user.name }}
      </li>
    </template>
  </ul>
  ```
