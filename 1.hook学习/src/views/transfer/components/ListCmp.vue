<script setup lang="ts">
import type { IItem } from './../types'
const props = defineProps<{
  data: IItem[]
}>()
</script>

<template>
  <div class="box">
    <div class="head">
      <div class="head_left">
        <input type="checkbox" value="" />
        <p>List 1</p>
      </div>
      <p class="head_right">0/15</p>
    </div>

    <div class="list">
      <ul>
        <!-- <li>
          <label>
            <input type="checkbox" value="" />
            <p>List 1</p>
          </label>
        </li> -->

         <li v-for="item of props.data">
          <label>
            <input type="checkbox" v-model="item.checked" />
            <p>{{ item.label }}</p>
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.box {

  width: 200px;
  border-radius: 8px;
}

.head {
  padding: 15px;
  height: 32px;
  // border: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f5f7fa;
  border: 1px solid #ebeef5;

  .head_left {
    display: flex;
    align-items: center;

    p {
      font-weight: bold;
      font-size: 16px;
      margin-left: 5px;
    }
  }

  .head_right {
    font-size: 12px;
  }
}

.list {
  // border: 1px solid #000;
  border-left: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
  height: 200px;
  overflow-y: scroll;

  ul {
    padding: 5px 10px;
    li {
      list-style: none;
      label {
        display: flex;
        cursor: pointer;

        p {
          margin-left: 5px;
          font-size: 16px;
        }

        &:hover {
          color: #409eff;
        }
      }
    }
  }
}


::-webkit-scrollbar {
  width: 14px;
  height: 14px;
}

::-webkit-scrollbar-track,
::-webkit-scrollbar-thumb {
  border-radius: 999px;
  border: 5px solid transparent;
}

::-webkit-scrollbar-track {
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2) inset;
}

::-webkit-scrollbar-thumb {
  min-height: 20px;
  background-clip: content-box;
  box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.2) inset;
}

::-webkit-scrollbar-corner {
  background: transparent;
}

</style>