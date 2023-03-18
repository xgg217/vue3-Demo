<template>
  <div class="flow">
    <div class="step" v-for="(item,index) in data" :key="index">
      <div class="step-left">
        <div class="step-left_line" v-if="(index+1)!==data.length"></div>
        <div class="step-left_name">
          <span v-if="item.name.length<=2">{{ item.name }}</span>
          <span v-else class="ui-nowrap-2 fz-12">{{ item.name }}</span>
        </div>
      </div>
      <div class="handel flex1">
        <div class="ui-cell ui-cell-sb">
          <div class="fz-14 b-gray-color">{{ item.handleText }}</div>
          <div>{{ item.handelTime }}</div>
        </div>
        <div>{{ item.name }} {{ item?.status ? '(' + item?.status + ')' : '' }}</div>
        <div class="pt-10 pb-10 b-gray-color">{{ item.msg }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({})

let data = [
  {
    name: '陶思',
    handleText: '发起申请',
    handelTime: '06-15  14:14',
    msg: '上报3片报废板,上报3片报废板,上报3片报废板,上报3片报废板,上报3片报废板,上报3片报废板',
  },
  {
    name: '陶思',
    handleText: '当线组长知悉',
    handelTime: '06-15  14:14',
    msg: '上报3片报废板',
    status: '已处理'
  },
  {
    name: '陶思',
    handleText: '当线组长驳回',
    handelTime: '06-15  14:14',
    msg: '上报3片报废板',
    status: '已处理'
  },
  {
    name: '陶思陶思',
    handleText: '当线组长驳回',
    handelTime: '06-15  14:14',
    msg: '上报3片报废板',
    status: '已处理'
  },
  {
    name: '陶思陶',
    handleText: '当线组长驳回',
    handelTime: '06-15  14:14',
    msg: '上报3片报废板',
    status: '已处理'
  }
]
</script>

<style lang="scss" scoped>
.flow {
  .step {
    display: flex;
    min-height: 70px;
    padding: 5px 0;

    &-left {
      width: 70px;
      flex-shrink: 0;
      position: relative;

      &_line {
        width: 2px;
        height: 100%;
        background: #B3B3B3;
        margin-left: 21px;
      }

      &_name {
        box-sizing: border-box;
        display: flex;
        width: 42px;
        height: 42px;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 14px;
        background: $a-blue;
        border-radius: 8px;
        color: #FFFFFF;
        padding: 5px;
        position: absolute;
        top: 0;
        left: 0;
        border-bottom: 5px solid #fff;
      }
    }

    .handel {
      font-size: 12px;
      color: $e-gray;
      line-height: 22px;
    }
  }
}
</style>
