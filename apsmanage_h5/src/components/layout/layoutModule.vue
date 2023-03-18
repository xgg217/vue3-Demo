<template>
  <div class="layout">
    <div class="flex ui-cell-sb" v-show="showTitle">
      <div class="ui-cell mb-5">
        <img :src=leftIcon alt="" v-if="leftIcon" class="layout_icon">
        <div class="title" v-if="title">{{title}}</div>
        <div class="mini-title" v-if="miniTitle">{{miniTitle}}</div>
      </div>
      <div class="flex ui-cell">
        <slot name="right"></slot>
      </div>
    </div>
   <div class="layout_main">
     <slot name="main"></slot>
   </div>
  </div>
</template>

<script>
export default {
  name: 'layoutModule',
  props: {
    bgColor: {
      type: String,
      default: '#fff'
    },
    title: {
      type: String,
      default: ''
    },
    miniTitle: {
      type: String,
      default: ''
    },
    showTitle:{
      type: Boolean,
      default: true
    },
    leftIcon:{
      type: String,
      default:''
    }
  },
  setup(props){

  }
}
</script>

<style lang="scss" scoped>
.layout{
  width: 100%;
  box-sizing: border-box;
  background-color: v-bind(bgColor);
  margin-top: 12px;
  padding: 10px 20px 14px 20px;
  font-size: 16px;
  color: $b-gray;
  .title{
    font-size: 16px;
    font-weight: bold;
    line-height: 36px;
  }
  .mini-title{
    color: $e-gray;
    font-size: 14px;
    height: 36px;
    line-height: 36px;
  }
  &_icon{
    width: 24px;
    height: 24px;
    margin-right: 6px;
  }
  &_main{
    //margin-top: 12px;
  }

}
</style>
