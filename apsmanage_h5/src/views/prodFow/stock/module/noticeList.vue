<template>
  <div class="noticeListWrap">
    <ul>
      <li v-for="(item, index) in taskList" :key="item.executorId">
        <!-- 执行人 -->
        <div class="examinerWrap flex flex-between">
          <!--   -->
          <span class="flex1 flex" style="overflow: hidden">执行人：<span class="flex1 executorWrap">
            <!-- {{ item.executor }} -->
            <moreText :text="item.executor" :style="{flex: 1}"></moreText>
          </span></span>
          <span style="width: 20vw" class="fz-14 a-blue-color" @click="sendNotice(item)">发送通知 ></span>
        </div>
        <!-- 执行任务 -->
        <taskInfoItem class="mb-14" v-for="i in item.taskList" :key="i.taskId" :itemInfo="i"></taskInfoItem>
        <!-- 占位 -->
        <div class="ocWrap" v-if="index != taskList.length - 1"></div>
      </li>
      <van-empty v-if="!taskList.length" description="任务为空！" />
    </ul>
    <PxPrompt v-model:showPrompt="showPrompt" @confirm="showPrompt = false" height="292">
      <div class="tipsWrap">通知已发送</div>
    </PxPrompt>
  </div>
  </template>

  <script setup>
  import taskInfoItem from "./taskInfoItem.vue"
  import PxPrompt from "@/components/dialog/promptStock.vue"
  import { submitSendNotice } from "@/api/prodFow"
  import { openLoading, closeLoading, successTip, noticeTip } from "@/utils/toastTips"
  import { useUserStore } from "@/store/user"

  const userStore = useUserStore()


  const Props = defineProps({
    taskList: {
      type: Array,
      default: () => []
    }
  })

  /* 通知任务列表 */
  const taskList = ref([])
  /* 获取通知任务列表 */
  const getNoticeList = (list) => {
    taskList.value = list
  }
  /* 发送通知 */
  const showPrompt = ref(false)
  const sendNotice = (item) => {
    const taskIdList = []
    item.taskList.forEach(ele => {
      if (ele.taskStatus < 3) {
        taskIdList.push(ele.taskId)
      }
    })
    if (!taskIdList.length) {
      noticeTip("无须通知任务!")
      return
    }
    const params = {
      executor: item.executorId,
      taskIds: taskIdList
    }
    submitNotice(params)
  }
  /* 提交通知 */
  const submitNotice = (params) => {
    openLoading()
    submitSendNotice(params)
      .then(() => {
        successTip("通知成功")
        showPrompt.value = true
      })
      .finally(() => {
        closeLoading()
      })
  }

  watch(() => Props.taskList, newVal => {
    taskList.value = newVal
  })

  onMounted(() => {
    getNoticeList(Props.taskList)
  })
  </script>

  <style lang="scss" scoped>
  .noticeListWrap{
    flex: 1;
    margin-top: 10px;
    overflow: auto;
    background-color: white;
    .ocWrap{
      height: 10px;
      width: 100vw;
      background-color: $g-gray;
      position: absolute;
      left: 0;
      bottom: 0px;
    }
    .examinerWrap{
      height: 50px;
      color: $e-gray;
      line-height: 44px;
      font-size: 16px;
      .executorWrap{
        white-space: nowrap;
        overflow: hidden;
        margin-right: 10px;
        height: 40px;
        position: relative;
      }
    }
    &>ul{
      li{
        // margin-bottom: 10px;
        background-color: white;
        padding: 10px 16px;
        box-sizing: border-box;
        position: relative;
        overflow-x: hidden;
      }
    }
    .tipsWrap{
      height: 100%;
      text-align: center;
      font-size: 18px;
      color: $b-gray;
      font-weight: bold;
      margin-top: 10px;
    }
  }
  </style>
