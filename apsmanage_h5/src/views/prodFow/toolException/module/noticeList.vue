<template>
  <div class="noticeListWrap">
    <ul>
      <li v-for="(item, index) in [{},{},{}]" :key="item.executorId">
        <!-- 执行人 -->
        <div class="examinerWrap flex flex-between">
          <!--   -->
          <span class="flex1 flex" style="overflow: hidden">执行人：<span class="flex1 executorWrap">
            <!-- {{ item.executor }} -->
            <moreText :text="item.executor || 666" :style="{flex: 1}"></moreText>
          </span></span>
        </div>
        <!-- 执行任务 -->
        <TaskInfoItem class="mb-14" v-for="i in [{},{},{}]" :key="i.taskId" :itemInfo="itemInfo" :deployData="deployData"></TaskInfoItem>
        <!-- 占位 -->
        <div class="ocWrap" v-if="index != taskList.length - 1"></div>
      </li>
      <van-empty v-if="!taskList.length" description="任务为空！" />
    </ul>
  </div>
  </template>

  <script setup>
  import TaskInfoItem from "../../components/taskInfoItem.vue"
  import { useUserStore } from "@/store/user"
  const userStore = useUserStore()

  const Props = defineProps({
    taskList: {
      type: Array,
      default: () => []
    }
  })
  let itemInfo = reactive({
    params1: "123456",
    params1Unit: "不合格",
    params2: "123456",
    params3: "123456",
    params4: "123456",
    params5: "123456",
    params6: "123456",
    status: 1,
    name: "YC202205126321",
    timeStatus: "超时2：58：02"
  })
  let deployData = reactive({
    header: {
      nameKey: "name",
      timeStatusKey: "timeStatus"
    },
    content: [
      {label: "技嘉项目", key: "params1"},
      {label: "发起人", key: "params2"},
      {label: "发起时间", key: "params3"},
      {label: "处理时间", key: "params3"},
    ],
    /* 根据状态下标选择 */
    status: [
      {name: "待执行", color: "#0096FF"},
      {name: "任务超时", color: "#FF3A35"},
      {name: "完成", color: "#34C606"},
      {name: "超时完成", color: "#FF8B00"}
    ],
    statusKey: "status",
    unitColor: {
      "不合格": "#FF3A35"
    }
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
