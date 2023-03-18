<template>
  <div class="share">
    <van-action-sheet v-model:show="newShow" :title="title">
      <div class="content">
        <slot></slot>
        <div class="content-list" v-if="showShare">
          <div class="ui-cell" @click="handelShare" >
            <img src="../../../assets/images/indicators2.svg" alt="">
            <div>分享给其他人</div>
          </div>
        </div>
        <div class="border"></div>
        <div class="cancel" @click="newShow=false">关闭</div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script setup>
import {openShare} from "@/utils/ddApi";

const emit = defineEmits(["update:show"])
let props = defineProps({
  show:{
    type: Boolean,
    default: false
  },
  title:{
    type: String,
    default: "更多操作"
  },
  showShare:{
    type: Boolean,
    default: true
  }
})
const newShow=computed({
  get: () => props.show,
  set: (value) => {
    emit('update:show',value)
  }
})
const handelShare = () => {
  openShare({title:'分享',url:'https://lanhuapp.com/'})
}
</script>

<style lang="scss" scoped>
.share {
  :deep(.van-action-sheet__header) {
    font-size: 18px;
    font-weight: 500;
    color: #8D9092;
  }
  .content{
    font-size: 16px;
    color: #1B2124;
    &-list{
      padding: 0 20px 0 20px;
      height: 50px;
      line-height: 50px;
    }
    img{
      height: 20px;
      margin-right: 10px;
    }
    .border{
      height:10px;
      background:#F5F5F5;
      border:0
    }
    .cancel{
      width: 335px;
      height: 36px;
      background: #EAF1FF;
      border-radius: 18px;
      font-size: 16px;
      font-weight: 500;
      color: #2972FE;
      margin: 20px auto;
      text-align: center;
      line-height: 36px;

    }
  }
}
</style>
