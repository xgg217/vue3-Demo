<template>
  <div class="bpmnView wh100" :class="{'fullPageWrap': isFull}">
    <!-- bpmn模块 -->
    <div class="bpmnBoard" ref="bpmnBoardRef"></div>
    <!-- 操作栏 -->
    <div class="operateWrap flex-center">
      <el-icon @click="plusCanvas"><Plus /></el-icon>
      <el-icon @click="minsCanvas"><Minus /></el-icon>
      <el-icon @click="aimCanvas"><Aim /></el-icon>
      <el-icon v-if="isApp" @click="fullCanvas"><FullScreen /></el-icon>
    </div>
  </div>
</template>

<script setup>
import { business, quote } from "./xmlStr";
import BpmnViewer from "bpmn-js/lib/Viewer"
import Touch from "diagram-js/lib/navigation/touch"
import MoveCanvas from "diagram-js/lib/navigation/movecanvas"
import { Plus, Minus, Aim, FullScreen } from '@element-plus/icons-vue'
import { bussinessBpmnList, quoetBpmnList } from "@/constant/tempBpmnDict"
import {useSystemStore} from "@/store";
let {isApp}=storeToRefs(useSystemStore())
/* 类型xml字典 */
const typeXmlDict = {
  bussiness: {xml: business, statusList: bussinessBpmnList},
  quote: {xml: quote, statusList: quoetBpmnList}
}

const route = useRoute()
/* 当前执行节点 */
let index = -1
const findInd = typeXmlDict[route.query.type].statusList.reverse().findIndex(item => item.status == route.query.status)
if ( findInd > -1) {
  index = typeXmlDict[route.query.type].statusList.length - 1 - findInd
}
const statusList = typeXmlDict[route.query.type].statusList.reverse()


/* bpmn对象 */
const bpmnModel = ref()
/* bpmn容器 */
const bpmnBoardRef = ref()
/* canvas */
let canvas = null
/* 高度 */
const height = ref(null)

/* 创建流程画板 */
const createBoard = () =>  {
  bpmnModel.value = new BpmnViewer({
    container: bpmnBoardRef.value,
    additionalModules: [
      MoveCanvas,
      Touch
    ]
  })
}

/* 获取远端xml渲染 */
const remoteRender = async (xml) => {
  let res = await bpmnModel.value.importXML(xml)
  if (!res.warnings.length) {
    canvas = bpmnModel.value.get("canvas")
    canvas.zoom("fit-viewport", "auto")
    if (index < 0) return
    setStyle()
    setHistoryStyle()
  }
}
/* 放大 */
const plusCanvas = () => {
  if (!canvas._cachedViewbox) return
  const initSize = bpmnModel.value.get("canvas")._cachedViewbox.scale
  canvas.zoom(initSize + 0.2, "auto")
}
/* 缩小 */
const minsCanvas = () => {
  if (!canvas._cachedViewbox) return
  const initSize = canvas._cachedViewbox.scale
  canvas.zoom(initSize - 0.2, "auto")
}
/* 复位 */
const aimCanvas = () => {
  canvas.zoom("fit-viewport", "auto")
}
/* 全屏 */
const isFull = ref(false)
const fullCanvas = () => {
  if (!isFull.value) {
    window.cancelFullScreenEvent = () => {
      isFull.value = !isFull.value
      uni.postMessage({
        data: {
          type: 'fullPage',
          message: 'default'
        }
      })
      height.value = window.innerHeight
      setTimeout(() => {
        canvas.zoom("fit-viewport", "auto")
      }, 1000)
    }
    uni.postMessage({
      data: {
        type: 'fullPage',
        message: 'landscape-primary'
      }
    })
  } else {
    window.cancelFullScreenEvent = null
    uni.postMessage({
      data: {
        type: 'fullPage',
        message: 'default'
      }
    })
  }
  isFull.value = !isFull.value
  nextTick(() => {
    setTimeout(() => {
      canvas.zoom("fit-viewport", "auto")
    }, 1000)
  })
}

/* 设置当前执行节点样式 */
const setStyle = () => {
  if (!statusList[index].id) return
  if (index === statusList.length - 1) {
    canvas.addMarker(statusList[index].id, 'highlightFinish')
    return
  }

  let className = 'highlight'
  if (statusList[index].type == "end") {
    className = 'highlightSuspend'
  }
  canvas.addMarker(statusList[index].id, className)

  const ele = document.getElementsByClassName(className)
  if (ele.length) {
    for(let i = 0; i < ele.length; i++) {
      const item = ele[i]
      const node = item.querySelector('.djs-visual rect')
      if(node) {
        node.setAttribute('stroke-dasharray', '4,4')
      }
    }
  }
}

/* 设置已执行节点样式 */
const setHistoryStyle = () => {
  const list = statusList.slice(0, index)
  list.forEach((item) => {
    /* 中断节点 */
    if (item.type == 'end') {
      // console.log(item.status, statusList[index].status)
      if (item.status != statusList[index].status) {
        return
      }
      // if (item.status == statusList[index].status) {
      //   canvas.addMarker(item.id, 'highlightSuspend')
      //   return
      // }
    }
    canvas.addMarker(item.id, 'highlightFinish')
  })
}

onMounted(() => {
  createBoard()
  remoteRender(typeXmlDict[route.query.type].xml)
})

</script>

<style lang="scss">
.bpmnView{
  width: 100%;
  height: 100%;
  color: black;
  background-color: white;
  background-image: linear-gradient(
      90deg,
      rgba(180, 180, 180, 0.15) 10%,
      rgba(0, 0, 0, 0) 10%
    ),
    linear-gradient(rgba(180, 180, 180, 0.15) 10%, rgba(0, 0, 0, 0) 10%);
  background-size: 10px 10px;
  position: relative;
  .bpmnBoard{
    width: 100%;
    height: 100%;
    // background-color: white;
    box-sizing: border-box;
    overflow: hidden;
  }
  .bjs-powered-by{
    display: none;
  }
  .nodeTipsInfoWrap{
    width: 250px;
    background-color: white;
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: 0 0 5px 2px rgb(228, 228, 228);
    border-radius: 6px;
    padding: 10px;
    box-sizing: border-box;
    &>div{
      height: 30px;
      line-height: 30px;
    }
    .labelWrap{
      color: rgb(185, 185, 185);
    }
  }
  /* svg状态样式 */
  .highlight:not(.djs-connection) .djs-visual > :nth-child(1) {
    fill: rgb(220, 245, 255) !important;
    stroke: #00b7ff !important;
  }

  .highlight-line g.djs-visual >:nth-child(1) {
    stroke: rgba(0, 190, 0, 1) !important;
  }

  .highlightFinish:not(.djs-connection) .djs-visual > :nth-child(1) {
    fill: rgb(220, 255, 246) !important;
    stroke: #00ff88 !important;
  }

  .highlightSuspend:not(.djs-connection) .djs-visual > :nth-child(1) {
    fill: rgb(255, 207, 206) !important;
    stroke: #f53747 !important;
  }

  @keyframes dynamicNode {
    to {
      stroke-dashoffset: 100%;
    }
  }
  .highlight{
    .djs-visual> :nth-child(1){
      animation: dynamicNode 20S linear infinite;
      animation-fill-mode: forwards;
    }
  }
  .highlightSuspend{
    .djs-visual> :nth-child(1){
      animation: dynamicNode 20S linear infinite;
      animation-fill-mode: forwards;
    }
  }
  .operateWrap{
    position: absolute;
    left: 5px;
    top: 5px;
    width: 100px;
    height: 25px;
    background-color: white;
    i{
      margin: 0 5px;
    }
  }
}
.fullPageWrap{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(50% + 36px);
    z-index: 999999;
    box-sizing: border-box;
  }
</style>
