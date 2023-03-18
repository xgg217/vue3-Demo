<template>
  <div class="pxNotifyWrap" :class="{'topZero': showNotify}">
    <div class="pxNotify flex-align-center" :style="{backgroundColor: currentItem.bgColor, color: currentItem.color}">
      <img :src="getImgSrc(currentItem.iconName)">
      <span class="flex1">{{ text }}</span>
      <van-icon @click="hidePxNotify" name="cross" :color="currentItem.color" size="16px" />
    </div>
  </div>
</template>

<script setup>
const showNotify = ref(false)
/* 提示文字 */
const text = ref('')
/* 提示类型 */
const type = ref('info')
/* 类型颜色 */
const typeColor = {
  "success": {color: "#34C606", iconName: "success", bgColor: "#EBFAF1"},
  "error": {color: "#FF5B5B", iconName: "error", bgColor: "#FFF1F1"},
  "warn": {color: "#FA9821", iconName: "warn", bgColor: "#FFF8EF"},
  "info": {color: "#34C606", iconName: "info", bgColor: "#EBFAF1"}
}
const currentItem = computed(() => {
  return typeColor[type.value]
})
/* 隐藏定时器 */
let timeInner = null
/* 打开提示 */
const openPxNotify = (params) => {
  text.value = params.text
  type.value = params.type
  const timeOut =  setTimeout(() => {
    showNotify.value = true
    timeInner = setTimeout(() => {
      showNotify.value = false
      clearTimeout(timeOut)
      clearTimeout(timeInner)
    }, params.duration || 5000)
  })
}
/* 关闭提示 */
const hidePxNotify = () => {
  showNotify.value = false
  clearTimeout(timeInner)
}
/* 动态图片 */
const getImgSrc = (name) => {
  const path = `../../assets/images/${name}.png`
  const modules = import.meta.globEager("../../assets/images/*.png")
  return modules[path].default
}

defineExpose({
  openPxNotify
})

onBeforeUnmount(() => {
  showNotify.value = false
  clearTimeout(timeInner)
})
</script>

<style lang="scss" scoped>
.pxNotifyWrap{
  min-height: 44px;
  max-height: 88px;
  width: 100vw;
  position: absolute;
  z-index: 999;
  left: 0;
  top: -88px;
  transition: top 0.1s ease-in-out;
  overflow: hidden;
  .pxNotify{
    width: 100%;
    height: 100%;
    padding: 10px 13px 10px 20px;
    box-sizing: border-box;
    img{
      height: 28px;
      width: 28px;
      margin-right: 10px;
    }
    span{
      max-height: 64px;
      overflow-y: auto;
      font-size: 14px;
    }
  }
}
.topZero{
  top: 0;
}
</style>