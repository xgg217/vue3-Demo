<template>
  <span class="cover-nav__close"  @click.stop="handelNavBack('spotCheck',{params:{type: route.params.type}})">
      <van-icon name="arrow-left" />
  </span>
  <div class="prod_main flex-cul spoCheckDetailWrap">
    <van-collapse class="mt-10 collapseWrap" v-model="activeNames">
      <!-- 任务信息 -->
      <van-collapse-item title="任务信息" name="1" :border="false" title-class="titleWrap">
        <ul v-if="taskData.taskNo">
          <li v-for="(item) in taskInfoKeyList" :key="item.key" class="flex">
            <span class="mr-20 e-gray-color" style="width: 23vw;" v-if="taskData[item.key]">{{ item.name }}</span>
            <span v-if="item.key == 'taskStatus'" :style="{color: statusList[taskData.taskStatus - 1].color}">{{ statusList[taskData.taskStatus - 1].name }}  </span>
            <!-- <span v-else-if="item.key == 'taskType'">{{ typeList[taskData[item.key] -1] || '--' }}</span> -->
            <moreText v-else-if="item.key == 'receiveUser'" :text="taskData[item.key] || '--'" :style="{flex: 1}"></moreText>
            <span v-else class="flex1 flex" style="overflow: hidden">
              <span class="flex1 valueWrap" v-if="taskData[item.key]">{{  taskData[item.key] || '--' }}</span>
            </span>
          </li>
        </ul>
        <van-skeleton v-else title :row="5" />
      </van-collapse-item>
      <!-- 抽检结果信息 -->
      <van-collapse-item title="抽检结果" name="2" :border="false" title-class="titleWrap">
        <ul v-if="taskData.workOrderNo">
          <li v-for="item in spotCheckKeyList" :key="item.key" class="flex">
            <span class="mr-20 e-gray-color" style="width: 23vw;">{{ item.name }}</span>
            <span class="flex1 flex" style="overflow: hidden"><span class="flex1 valueWrap">{{  taskData[item.key] ?? '--' }}</span></span>
          </li>
        </ul>
        <van-skeleton v-else title :row="5" />
      </van-collapse-item>
      <!-- 抽检处理详情 -->
      <van-collapse-item :title="'抽检处理'+'('+ handleStatusList[handleStatus / 10 - 1].label +')'" name="3" :border="false" title-class="titleWrap">
        <!-- 上级决议 -->
        <div class="flex handleInfoWrap" v-if="leaderResList.length">
          <span class="mr-20 e-gray-color labelWrap" style="width: 16vw;">上级决议</span>
          <ul>
            <li v-for="(item, idx) in leaderResList" :key="item.id" :class="{'mt-36': !idx, 'mt-20': idx}">
              <div class="superiorResWrap">
                <header class="flex relative">
                  <img src="../../../assets/images/avatar.png">
                  <span class="ml-5 e-gray-color">{{ item.createBy }}</span>
                  <span class="absolute a-red-color" style="right: 0" v-if="item.executeTypeName">{{ item.executeTypeName }}</span>
                </header>
                <main>
                  <ul>
                    <li v-if="item.unQualifiedName">不合格原因：{{ item.unQualifiedName }}</li>
                    <li v-if="item.executeScopeName">处理范围：{{ item.executeScopeName }}</li>
                    <li>{{ item.remark }}</li>
                  </ul>
                </main>
                <footer class="relative">
                  <span class="absolute e-gray-color fz-12" style="right: 0">{{ item.createTime }}</span>
                </footer>
              </div>
            </li>
          </ul>
        </div>
        <!-- 小组决议 -->
        <div class="flex handleInfoWrap" v-if="groupResList.length">
          <span class="mr-20 e-gray-color labelWrap " style="min-width: 16vw;">小组决议</span>
          <ul>
            <li v-for="(item, idx) in groupResList" :key="item.id" :class="{'mt-36': !idx, 'mt-20': idx}">
              <div class="superiorResWrap">
                <header class="flex relative">
                  <img src="../../../assets/images/avatar.png">
                  <span class="ml-5 e-gray-color">{{ item.createBy }}</span>
                  <span class="absolute a-red-color" style="right: 0" v-if="item.executeTypeName">{{ item.executeTypeName }}</span>
                </header>
                <main>
                  <ul>
                    <li v-if="item.unQualifiedName">不合格原因：{{ item.unQualifiedName }}</li>
                    <li v-if="item.executeScopeName">处理范围：{{ item.executeScopeName }}</li>
                    <li >{{ item.remark }}</li>
                  </ul>
                </main>
                <footer class="relative">
                  <span class="absolute e-gray-color fz-12" style="right: 0">{{ item.createTime }}</span>
                </footer>
              </div>
            </li>
          </ul>
        </div>
        <!-- <van-skeleton v-else title :row="5" /> -->
      </van-collapse-item>
      <!-- 抽检处理 -->
      <van-collapse-item title="抽检处理" name="4" :border="false" title-class="titleWrap" v-if="route.params.type != 3">
        <ul class="colLabelWrap">
          <template v-for="item in renderList" :key="item.key">
            <li v-if="item.option.length && taskData.taskStatus < 3" class="flex mb-10">
              <span class="mr-20 e-gray-color" style="width: 22vw;"><span class="a-red-color">*</span>{{ item.name }}</span>
              <span class="flex1 flex">
                <el-select v-model="formData[item.key]">
                  <el-option
                    v-for="item in item.option"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
              </span>
            </li>
          </template>
          <li class="flex textAreaLiWrap">
            <span class="mr-20 e-gray-color" style="width: 22vw;"><span class="a-red-color">*</span>留言</span>
            <span class="flex1 flex">
              <van-field
                v-model="formData.remark"
                rows="4"
                type="textarea"
                maxlength="200"
                placeholder=""
              />
            </span>
          </li>
        </ul>
      </van-collapse-item>
    </van-collapse>
    <!-- 底部按钮 -->
    <div class="bottomBtnWrap" v-if="route.params.type != 3">
      <PxtButton type="active" width="100%" @click="submitHandle">
        提交
      </PxtButton>
    </div>
  </div>
</template>

<script setup>
  /*
    0: 只能留言
    1: 小组
    2：领导
  */
  import PxtButton from "@/components/button/button.vue"
  import { querySpotCheckDetial, submitSpotCheclHandle } from "@/api/prodFow"
  import { openLoading, closeLoading, successTip, failTip } from "@/utils/toastTips"
  import { useUserStore } from "@/store/user"
  import useRouterBack from "@/hooks/useRouterBack";
  const userStore = useUserStore()

  const route = useRoute()
  const router = useRouter()
  const {handelNavBack}=useRouterBack()
  /* 任务key */
  const taskInfoKeyList = [
    {name: "任务编号", key: "taskNo"},
    {name: "接收人", key: "receiveUser"},
    {name: "截止时间", key: "cutOffTime"},
    {name: "执行人", key: "updateBy"},
    {name: "完成时间", key: "finishedTime"},
    {name: "任务状态", key: "taskStatus"}
  ]
  /* 抽检结果key */
  const spotCheckKeyList = [
    {name: "抽检类型", key: "scType"},
    {name: "工单编号", key: "workOrderNo"},
    {name: "机型", key: "modelType"},
    {name: "料号", key: "fnumber"},
    {name: "抽检批号", key: "scBatchNo"},
    {name: "抽检制程", key: "processName"},
    {name: "批号数量", key: "batchQty"},
    {name: "抽检数量", key: "scQty"},
    {name: "良品数量", key: "passQty"},
    {name: "不良数量", key: "failQty"},
    {name: "抽检结果", key: "scResult"},
    {name: "备注", key: "remark"}
  ]
  /* 状态 */
  const statusList = [
    {name: "待执行", color: "#0096FF"},
    {name: "任务超时", color: "#FF3A35"},
    {name: "完成", color: "#34C606"},
    {name: "超时完成", color: "#FFBF00"}
  ]
    /* 表单处理选项 */
    const renderList = ref([
    {
      name: "不合格原因", key: "unQualifiedReason", option: []
    },
    {
      name: "处理范围", key: "executeScope", option: []
    },
    {
      name: "处理方式", key: "executeType", option: []
    },
  ])
  /* 折叠面板 */
  const activeNames = ref(['1','2','3','4'])
  /* 任务列表 */
  const taskData = ref([])
  /* 处理状态 */
  const handleStatus = ref(10)
  /* 上级处理列表 */
  const leaderResList = ref([])
  /* 小组决议 */
  const groupResList = ref([])
  /* 处理状态list */
  const handleStatusList =  [
    {valeu: 10, label: "处理中"},
    {valeu: 20, label: "高层处理中"},
    {valeu: 30, label: "完成"},
    {valeu: 40, label: "已取消"}
  ]
  /* 获取任务列表 */
  const getTaskList = () => {
    leaderResList.value = []
    groupResList.value = []
    openLoading()
    querySpotCheckDetial(route.params.id, route.params.type)
      .then(res => {
        let temp = {}
        const { scResult, taskInfo, unQualified, doTypeList, doScopeList, scSuggest } = res.data
        taskInfoKeyList.forEach(item => {
          temp[item.key] = taskInfo[item.key]
        })
        spotCheckKeyList.forEach(item => {
          temp[item.key] = scResult[item.key]
        })
        handleStatus.value = taskInfo.flowStatus
        /* 任务信息、抽检结果赋值 */
        taskData.value = temp
        /* 处理选项赋值 */
        renderList.value[0].option = unQualified || []
        renderList.value[1].option = doScopeList || []
        renderList.value[2].option = doTypeList || []
        /* 处理结果分发 */
        scSuggest.forEach(item => {
          /* 是上级 */
          if (item.roleType === 2) {
            /* 是上级处理 */
            if (item.unQualifiedReason || item.unQualifiedReason === 0) {
              leaderResList.value.unshift(item)
            } else {
              leaderResList.value.push(item)
            }
          }
          /* 小组 */
          if (item.roleType === 1) {
            /* 是小组处理 */
            if (item.unQualifiedReason || item.unQualifiedReason === 0) {
              groupResList.value.unshift(item)
            } else {
              groupResList.value.push(item)
            }
          }
        })
        console.log(leaderResList.value, groupResList.value)
      })
      .finally(() => {
        closeLoading()
      })
  }
  /* 表单信息 */
  const formData = reactive({
    unQualifiedReason: "",
    executeScope: "",
    executeType: "",
    remark: ""
  })
  /* 提交表单 */
  const submitHandle = () => {
    let params = {
      taskId: route.params.id,
      roleType: route.params.type,
    }
    for(let item of renderList.value) {
      if (!item.option.length || handleStatus.value == 30) continue
      if (!formData[item.key]) {
        failTip("表单未填写完整！")
        return
      }
    }
    if (!formData.remark) {
      failTip("表单未填写完整！")
      return
    }
    Object.keys(formData).forEach(item => {
      if (formData[item]) {
        params[item] = formData[item]
      }
    })
    openLoading()
    submitSpotCheclHandle(params)
      .then(() => {
        successTip("提交成功")
        getTaskList()
        formData.unQualifiedReason = ''
        formData.executeScope = ''
        formData.executeType = ''
        formData.remark = ''

      })
      .finally(() => {
        closeLoading()
      })

    console.log(params)
  }
  onMounted(() => {
    getTaskList()
  })
</script>

<style lang="scss" scoped>
  @import "@/styles/vanMixin.scss";
  @import "@/styles/mixins.scss";
  .spoCheckDetailWrap{
    color: $b-gray;
    @include taskDetail;
    .handleInfoWrap{
      flex: 1;
      .labelWrap{
        line-height: 36px;
        flex-shrink: 0;
      }
      ul{
        flex: 1;
        height: auto;
        li{
          height: auto;
          .superiorResWrap{
            word-break: break-all;
            header{
              img{
                width: 32px;
                height: 32px;
              }
            }
            header, footer{
              height: 36px;
            }
          }
          .employeeWrap{
            header{
              margin-top: 0;
            }
          }
        }
      }
    }
  }
  .colLabelWrap{
    .textAreaLiWrap{
      height: auto !important;
      .van-cell{
        padding: 0;
      }
    }
    :deep(.el-select){
      width: 100%;
      background-color: #F6F6FB;
      .el-input__wrapper{
        box-shadow: unset;
        background-color: unset;
        border-radius: 2px;
      }
      input{
        height: 36px;
      }
      @include placeholderColor('#B2BAD1')
    }
  }
  .bottomBtnWrap{
    height: 60px;
    padding: 8px 20px;
    box-sizing: border-box;
    background-color: white;
  }
</style>
