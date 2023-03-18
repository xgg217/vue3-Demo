<template>
  <div class="ui-cell ui-cell-sb tab">
   <div class="tab_list">
     <div @click="handleTab(index)" v-for="(item,index) in tabList" :key="index" :class="{active:item.value==activeIndex}">{{item.label}}</div>
   </div>
    <img src="@/assets/images/filter.png" alt="" class="tab_filter" v-if="showFilter" @click="handleFilter">
  </div>
</template>

<script>
export default {
  name: "PxtTab",
  props: {
    tabList: {
      type: Array,
      default: () => [{value: 0, label: '全部'},{value:1, label: '齐套'},{value:2, label: '不齐套'}]
    },
    activeIndex: {
      type: Number,
      default: 0
    },
    showFilter: {
      type: Boolean,
      default: false
    },
  },
  setup(props,ctx) {
    const handleTab = (index) => {
      ctx.emit('handleTab',index)
    }
    const handleFilter = () => {
      ctx.emit('handleFilter')
    }
    return {handleTab,handleFilter}
  }
}
</script>

<style scoped lang="scss">
.tab {
  width: 100%;
  height: 44px;
  &_list{
    align-items: center;
    overflow: auto;
    display: flex;
    div{
      min-width: 86px;
      margin-right: 16px;
      height: 32px;
      line-height: 32px;
      border-radius: 20px;
      color: $c-gray;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
    }
    div:last-of-type{
      margin-right: 0;
    }
  }
  &_filter{
    width: 32px;
  }
  .active{
    color: #FFFFFF;
    background-color: $a-blue;
  }
}
</style>
