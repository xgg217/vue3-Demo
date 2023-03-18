<template>
  <div class="processDetail">
    <!-- 流程进度 -->
    <div class="bpmnViewWrap" :class="{'mb-10': route.query.type === 'quote'}">
      <div class="bpmnViewTitleWrap">远程进度</div>
      <bpmnView></bpmnView>
    </div>
    <!-- 流程详情 -->
    <div>
      <component :is="currentComp"></component>
    </div>
  </div>
</template>

<script setup>
import bpmnView from "@/components/bpmnView/index.vue"
import { setTitle } from "@/utils/ddApi"
import { workTaskBusinessStatusDict, workTaskQuoteStatusDict } from "@/constant/dict"

const compInitDict = {
  bussiness: () => import('@/views/myClient/addDemand/addDemand.vue'),
  quote: () => import('@/views/quotation/preview/preview.vue')
}

const compDict = {
  bussiness: workTaskBusinessStatusDict,
  quote: workTaskQuoteStatusDict
}

const route = useRoute()
/* 设置动态标题 */
setTitle(route.query.title)
/* 进度渲染 */
/* 详情 */
const currentComp = ref(null)

/* 获取渲染的组件 */
const getModule = async () => {
  const {type, status, handle} = route.query
  let component = null
  const currentData = compDict[type][status]
  // console.log(currentData)
  if (route.query.handleId) {
    /* 处理角色页面组件匹配 */
    // route.query.handleId.split(',').forEach(item => {
    //   if (currentData.component[item]) {
    //     component = currentData.component[item]
    //   }
    // })
    if (currentData.component[route.query.handleId]) {
      component = currentData.component[route.query.handleId]
    }
  } else {
    component = currentData.component
  }
  // console.log(component)
  let module = null
  /* 如果没组件或者查看 */
  if (!component || handle == 2) {
    module = await compInitDict[type]()
  /* 组件查看 */
  } else {
    module = await component()
  }
  currentComp.value = markRaw(module.default)
}
getModule()
</script>

<style lang="scss" scoped>
.processDetail{
  height: 100%;
  width: 100%;
  .bpmnViewWrap{
    height: 250px;
    overflow: hidden;
    padding: 10px 20px;
    box-sizing: border-box;
    background-color: white;
    // margin-bottom: 10px;
    .bpmnViewTitleWrap{
      font-size: 14px;
      color: #1B2124;
      font-weight: bold;
      height: 30px;
      line-height: 30px;
    }
  }
}
</style>