<template>
  <div class="listItemWrap flex">
    <!-- 图片 -->
    <div class="imgWrap relative">
      <img :src="imgUrl">
      <div class="unreadWrap" v-if="Props.unread"></div>
    </div>
    <!-- 信息 -->
    <div class="infoWrap flex1">
      <!-- 标题 -->
      <header class="flex">
        <span class="title">{{ Props.title }}</span>
        <span class="statusWrap flex-align-center">
          <!-- 状态 -->
          <slot name="status"></slot>
        </span>
      </header>
      <!-- 内容插槽 -->
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup>
const Props = defineProps({
  imgName: {
    type: String,
    // default: "processIcon"
  },
  unread: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: "标题"
  }
})

const imgUrl = computed(() => {
  const path = `../../../assets/listIcon/${ Props.imgName}.png`
  const modules = import.meta.globEager(`../../../assets/listIcon/*.png`)
  return modules[path].default
})
</script>

<style lang="scss" scoped>
.listItemWrap{
  border: 1px solid #F1F3F6;
  border-radius: 12px;
  min-height: 119px;
  box-sizing: border-box;
  margin-bottom: 16px;
  padding: 20px 12px;
  .imgWrap{
    height: 80px;
    width: 80px;
    img{
      height: 100%;
      width: 100%;
    }
    .unreadWrap{
      height: 10px;
      width: 10px;
      background-color: #E50000;
      position: absolute;
      top: 0;
      right: 0;
      border-radius: 5px;
    }
  }
  .infoWrap{
    margin-left: 16px;
    header{
      .title{
        font-size: 18px;
        color: #1B2124;
        font-weight: bold;
      }
      .statusWrap{
        margin-left: 18px;
      }
    }
  }
}
</style>