<template>
  <div class="prod_main main flex-cul">
    <van-collapse class="mt-10 collapseWrap" v-model="activeNames">
      <!-- 任务信息 -->
      <van-collapse-item title="任务信息" name="1" :border="false" title-class="titleWrap">
        <ul v-if="taskData.taskNo">
          <li v-for="(item) in taskInfoKeyList" :key="item.key" class="flex">
            <span class="mr-25 e-gray-color" style="width: 19vw;">{{ item.name }}</span>
            <span v-if="item.key == 'taskStatus'" :style="{color: statusList[taskData.taskStatus - 1].color}">{{ statusList[taskData.taskStatus - 1].name }}  </span>
            <span v-else-if="item.key == 'taskType'">{{ typeList[taskData[item.key] -1] || '--' }}</span>
            <moreText v-else-if="item.key == 'receiveUser'" :text="taskData[item.key] || '--'" :style="{flex: 1}"></moreText>
            <span v-else class="flex1 flex" style="overflow: hidden"><span class="flex1 valueWrap">{{  taskData[item.key] || '--' }}</span></span>
          </li>
        </ul>
        <van-skeleton v-else title :row="5" />
      </van-collapse-item>
      <!-- 工单信息 -->
      <van-collapse-item title="工单信息" name="2" :border="false" title-class="titleWrap">
        <ul v-if="taskData.workOrderNo">
          <li v-for="(item) in orderKeyList" :key="item.key" class="flex">
            <span class="mr-20 e-gray-color" style="width: 23vw;">{{ item.name }}</span>
            <span class="flex1 flex" style="overflow: hidden"><span class="flex1 valueWrap">{{  taskData[item.key] || '--' }}</span></span>
          </li>
        </ul>
        <van-skeleton v-else title :row="5" />
      </van-collapse-item>
      <!-- 备注备料 -->
      <van-collapse-item title="备料备注" name="3" :border="false" title-class="titleWrap" v-if="taskData.taskStatus > 2 || route.params.type == 3">
        <span>备料完成，请取料</span>
      </van-collapse-item>
    </van-collapse>
    <!-- 通知 -->
    <div class="relative tipsWrap" v-if="taskData.taskStatus < 3 && route.params.type == 1">
      <taskBottomTips class="absolute" tips="备料的明细，请查看ERP中对应的模块"></taskBottomTips>
    </div>
    <!-- 底部按钮 -->
    <div class="bottomBtnWrap" v-if="taskData.taskStatus < 3 && route.params.type == 1">
      <PxtButton type="active" width="100%" @click="showPrompt = true">
        备料完成
      </PxtButton>
    </div>
    <!-- 提交弹窗 -->
    <PxPrompt v-model:showPrompt="showPrompt" :showCancelButton="true" height="40px" @confirm="confirm">
      <van-form label-width="20vw" label-align="left" class="promptWrap">
        <van-cell-group>
          <van-field
            v-model="formData.needs"
            label="需求套数"
            readonly
            class="readonlyInput"
          />
          <van-field name="has" label="已备套数" required v-model="formData.has" type="digit" placeholder="请输入数字">
            <!-- <template #input>
              <van-stepper input-width="20vw" button-size="32px" :max="formData.needs" v-model="formData.has" />
            </template> -->
          </van-field>
          <!-- 通过 validator 返回错误提示 -->
          <van-field
            v-model="formData.remark"
            name="remark"
            label="备注"
            rows="4"
            autosize
            type="textarea"
            maxlength="200"
            placeholder="请填写备料的备注，如果已备套数小于需求套数时，备注是必填的！"
          />
        </van-cell-group>
      </van-form>
    </PxPrompt>
  </div>
</template>

<script setup>
import taskBottomTips from "@/views/prodFow/components/taskBottomTips.vue"
import PxtButton from "@/components/button/button.vue"
import PxPrompt from "@/components/dialog/promptOffbeat.vue"
import { queryTaskDetailInof, submitMaterialFinish } from "@/api/prodFow"
import { openLoading, closeLoading, successTip, failTip } from "@/utils/toastTips"
import { useUserStore } from "@/store/user"

const userStore = useUserStore()

const route = useRoute()


/* 折叠面板 */
const activeNames = ref(['1', '2', '3'])
/* 任务信息 */
const taskInfoKeyList = [
  {name: "任务编号", key: "taskNo"}, {name: "任务类型", key: "taskType"}, {name: (route.params.type == 3 ? "领料" : "需求") + "套数", key: "orderNum"},
  {name: "任务接收人", key: "receiveUser"}, {name: "截止时间", key: "cutOffTime"}, {name: "执行人", key: "createBy"},
  {name: "完成时间", key: "finishedTime"}, {name: "任务状态", key: "taskStatus"}
]

/* 工单信息 */
const orderKeyList = [
  {name: "项目名称", key: "projectName"}, {name: "工单编号", key: "workOrderNo"}, {name: "机型", key: "modelType"},
  {name: "料号", key: "fnumber"}, {name: "制程工段", key: "stageName"}, {name: "生产产线", key: "pdlineName"},
  {name: "订单数量", key: "orderNum"}, {name: "产出数量", key: "finishedNum"}, {name: "计划生产时间", key: "planProduceTime"}
]

/* 状态 */
const statusList = [
  {name: "待执行", color: "#0096FF"},
  {name: "任务超时", color: "#FF3A35"},
  {name: "完成", color: "#34C606"},
  {name: "超时完成", color: "#FFBF00"}
]
/* 任务类型 */
const typeList = ["生产物料备料", "生产领料"]

/* 任务信息 */
const taskData = ref({taskStatus: 1})
/* 获取任务信息 */
const getTaskInfo = () => {
  openLoading()
  queryTaskDetailInof(route.params.id)
    .then(res => {
      const { taskInfo, workOrderInfo } = res.data
      taskData.value = Object.assign(taskInfo, workOrderInfo)
      formData.needs = taskInfo.orderNum
    })
    .finally(() => {
      closeLoading()
    })
}

/* 提交备料 */
const showPrompt = ref(false)
const formData = reactive({
  needs: 3000,
  has: null,
  remark: ""
})
/* 确认提交 */
const confirm = () => {
  if (!formData.has) {
    failTip("请输入已备套数！")
    return
  }
  const params = {
    taskId: route.params.id,
    finishedNum: formData.has,
    remark: formData.remark
  }
  submitMaterialFinish(params)
    .then(() => {
      successTip("提交成功")
      showPrompt.value = false
      getTaskInfo()
    })
    .finally(() => {
      closeLoading()
    })
}

onMounted(() => {
  getTaskInfo()
})

</script>

<style lang="scss" scoped>
@import "@/styles/vanMixin.scss";
.main {
  color: $b-gray;
  @include taskDetail;
  .valueWrap{
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    height: 46px;
    user-select: none;
  }
  .tipsWrap{
    height: 42px;
    .bottomTips{
      width: 100vw;
      // left: -20px;
      // bottom: -12px;
    }
  }
  .bottomBtnWrap{
    height: 60px;
    padding: 8px 20px;
    box-sizing: border-box;
    background-color: white;
  }
  .promptWrap{
    :deep(.van-cell){
      padding: 6px 0;
    }
  }
}
</style>



