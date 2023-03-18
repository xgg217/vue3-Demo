<template>
  <span class="moreTextWrap" :class="{'canMove': canMove, 'ti-10': canMove}" :style="Props.style">
    <div class="moreTextBox" ref="moreTextWrap">
      <span class="moreTextInner" style="left: 0px;" ref="moreTextInner">{{ Props.text }}</span>
    </div>
  </span>
</template>

<script setup>
import { getDeviceOSType } from "@/utils/utils"
import throttle from "@/utils/throttle"

const Props = defineProps({
  text: {
    type: String,
    require: true
  },
  style: {
    type: Object,
    require: true
  }
})

const moreTextWrap = ref()
const moreTextInner = ref()
const canMove = ref(false)

onMounted(() => {
  nextTick(() => {
    if (moreTextInner.value.offsetWidth > moreTextWrap.value.offsetWidth) {
      canMove.value = true
    }
    if (getDeviceOSType() == "pc") {
      let initClientX = 0
      let canMoveMax = moreTextInner.value.offsetWidth - moreTextWrap.value.offsetWidth
      let initLeft = 0
      moreTextInner.value.onmousedown = (e) => {
        initClientX = e.clientX
        initLeft = moreTextInner.value.style.left
        document.onmousemove = (e2) => {
          const distance = parseInt(initLeft) + (e2.clientX - initClientX)
          setLeft(distance, canMoveMax)
        }
      }
      
      document.onmouseup = () => {
        if (!moreTextInner.value) return
        document.onmousemove = null
      }
    }
  })
})

const setLeft = throttle((distance, canMoveMax) => {
  if (distance > 0 || distance < (-canMoveMax - 20)) {
    return
  }
  moreTextInner.value.style.left = distance + 'px'
}, 1)

onBeforeUnmount(() => {
  if (getDeviceOSType() == "pc") {
    moreTextInner.value.onmousemove = null
    moreTextInner.value.onmousedown = null
  }
})
</script>

<style lang="scss" scoped>
.moreTextWrap{
  position: relative;
  overflow: hidden;
  user-select: none;
  .moreTextBox{
    overflow-x: auto;
    overflow-y: hidden;
    width: 100%;
    .moreTextInner{
      position: relative;
      white-space: nowrap;
      height: calc(100% + 20px);
    }
  }
}
.canMove{
  &::after{
    display: block;
    content: " ";
    position: absolute;
    left: 0px;
    top: 0;
    height: 100%;
    width: 0px;
    box-shadow: 0 0px 10px 1px rgb(116, 116, 116);
  }
}
</style>