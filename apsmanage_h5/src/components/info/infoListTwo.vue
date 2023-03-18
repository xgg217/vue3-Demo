<!--多行信息列表-->
<template>
  <layoutModule :show-title="false">
    <template #main>
      <div class="info" :style="column">
        <div v-for="item in infoList.value" :key="item.value" class="ui-cell info_list" v-show="!item.hidden">
          <div :style="{color: item.labelColor}">{{ item.name ?? '-' }}</div>
          <el-tooltip
              class="box-item"
              effect="dark"
              :content="infoList.data[item.value]+'' ?? '-'"
              placement="top"
          >
            <div class="ui-nowrap pr-10" :style="{color: item.contentColor}">{{ infoList.data[item.value] ?? '-' }}</div>
          </el-tooltip>
        </div>
      </div>
    </template>
  </layoutModule>
</template>

<script>
export default {
  name: 'infoList',
  props: {
    infoList: {
      type: Object,
      default: () => {
        return {
          data: {},
          value: [
            // {
            //   name: '客户单号',
            //   value: 'customerNo',
            //   hidden:true, //隐藏
            //   labelColor:'red',
            //   contentColor:'red'
            // },
            // {
            //   name: '料号',
            //   value: 'materialNo',
            // },
          ]
        }
      }
    },
    col: {
      type: Number,
      default: 2
    },
  },
  setup(props) {
    const column = computed(() => `grid-template-columns: repeat(${props.col}, ${100 / props.col}%)`)
    return {column}
  }
}
</script>

<style lang="scss" scoped>
.info {
  width: 100%;
  display: grid;
  &_list {
    font-size: 14px;
    width: 100%;
    height: 36px;
    div:first-of-type {
      text-align: left;
      color: $e-gray;
      min-width: 80px;
      flex-shrink: 0;
    }

    div:last-of-type {
      //color: $a-blue;
      overflow-x: hidden;
    }
  }
}
</style>
