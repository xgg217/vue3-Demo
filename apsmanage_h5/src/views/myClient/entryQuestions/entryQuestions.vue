<template>
  <div class="entryQuestions">
    <!-- 问题 -->
    <ul class="questionsListWrap fz-14">
      <li v-for="(item, index) in questionsList" :key="item.createdTime">
        <!-- 问题序列 -->
        <div class="indexWrap">
          <span class="e-gray-color">问题{{ index + 1 }}</span>
          <span style="float: right" class="flex-align-center a-red-color" v-if="userId === item.createdId && state == 9">
            <el-icon><Delete /></el-icon>
            <span style="margin-left: 5px" @click="deleteQuestion(index)">删除</span>
          </span>
        </div>
        <!-- 人物信息 -->
        <div class="askInfoWrap flex-align-center">
          <img style="height: 30px; width: 30px;" src="../../../assets/images/avatar.png">
          <div class="e-gray-color askerWrap">
            <span>{{ item.createdBy }}</span>
            <span class="fz-12">{{ item.createdTime }}</span>
          </div>
        </div>
        <!-- 问题 -->
        <div class="questionWords textAreaTextWrap">
          {{ item.problemContent }}
        </div>
        <!-- 回复 -->
        <div class="answerWrap questionWords" :class="{'showWrap': (!isEdit || (route.name === 'legalAppraise' || route.query.name === 'legalAppraise') || isAsk) && item.response.length}">
          <!-- 回复人物信息 -->
          <!-- 回复列表 -->
          <ul class="answerListWrap" v-if="item.response.length">
            <li v-for="(i, index) in item.response" :key="'answer' + item.askTime + index" class="flex-cul">
              <div class="askInfoWrap flex-align-center" v-if="(!isEdit || (route.name === 'legalAppraise' || route.query.name === 'legalAppraise') || isAsk)">
                <img src="../../../assets/images/avatar.png">
                <div class="e-gray-color askerWrap">
                  <span>{{ i.createdBy }}</span>
                  <span class="fz-12">{{ i.createdTime }}</span>
                </div>
              </div>
              <div class="flex mt-10">
                <span style="color: #B2BAD1; width: 11vw">回复:</span>
                <span class="flex1">{{ i.replyContent }}</span>
              </div>

            </li>
          </ul>
        </div>
        <!-- 回复输入 -->
        <div class="sendInputWrap flex mt-10" v-if="(route.name === 'answerQuestions' || route.query.name === 'answerQuestions') && isEdit">
          <el-input v-model="item.questionWords" :placeholder="'回复'" :maxlength="500" @keyup.enter="addQuestion(index)"></el-input>
          <span class="iconWrap flex-center" @click="addQuestion(index)">
            <img src="../../../assets/images/send.png">
          </span>
        </div>
      </li>
    </ul>
    <!-- 录入问题 -->
    <div class="sendInputWrap flex" v-if="(route.name === 'entryQuestions' || route.query.name === 'entryQuestions') && isEdit">
      <el-input v-model="questionWords" :placeholder="'添加问题'" :maxlength="500" @keyup.enter="addQuestion(false)"></el-input>
      <span class="iconWrap flex-center" @click="addQuestion(false)">
        <img src="../../../assets/images/send.png">
      </span>
    </div>
    <!-- 法务文件上传 -->
    <div v-if="route.name ==='customerDemand'" class="splitWrap"></div>
    <div class="legalFileUplaodWrap" v-if="(route.name === 'legalAppraise' || route.query.name === 'legalAppraise') || state > 11">
      <el-form :model="legalFileList" label-position="left" ref="uploadFileInput" :rules="formRule" :class="{'busCancelEdit': !isEdit}">
        <el-form-item label="修改版协议" prop="modifyVersionFile" class="flex-cul" >
          <div style="margin-left: 4vw; width: 85vw;">
            <uploadFileAndShow :isEdit="isEdit" :getFileInfo="getFile" :fileList="legalFileList.modifyVersionFile" :removeFile="removeFile" :limitNum="1" :keys="'modifyVersionFile'" :limitFormat="['application/pdf']"></uploadFileAndShow>
          </div>
        </el-form-item>

        <el-form-item label="评估报告" prop="assessmentReportFile" class="flex-cul" >
          <div style="margin-left: 4vw; width: 85vw;">
            <uploadFileAndShow :isEdit="isEdit" :getFileInfo="getFile" :fileList="legalFileList.assessmentReportFile" :removeFile="removeFile" :limitNum="1" :keys="'assessmentReportFile'"></uploadFileAndShow>
          </div>
        </el-form-item>

        <el-form-item label="风险汇总" prop="riskSummaryFile" class="flex-cul" >
          <div style="margin-left: 4vw; width: 85vw;">
            <uploadFileAndShow :isEdit="isEdit" :getFileInfo="getFile" :fileList="legalFileList.riskSummaryFile" :removeFile="removeFile" :limitNum="1" :keys="'riskSummaryFile'"></uploadFileAndShow>
          </div>
        </el-form-item>
        <template v-if="state == 11 || route.name ==='customerDemand'">
          <el-form-item label="风险评估会时间" label-width="30vw">
            {{ meetingInfo.meetingTime }}
          </el-form-item>
          <el-form-item label="参与人" label-width="30vw">
            {{ meetingInfo.players }}
          </el-form-item>
        </template>
        <div class="operaterWrap fz-12 d-gray-color" v-if="state > 11 && legalFileList.modifyVersionFile.length">
          {{ legalFileList.modifyVersionFile[0].createdBy || '--' }} {{ legalFileList.modifyVersionFile[0].createdTime }}
        </div>
      </el-form>
    </div>
    <div class="splitWrap" v-if="!isEdit"></div>
  </div>
</template>

<script setup>
  import uploadProtocol from "../uploadProtocol/uploadProtocol.vue"
  import { Delete } from '@element-plus/icons-vue'
  import { Dialog } from 'vant';
  import { getYMDHM, getYMDHMS } from '@/utils/timeFormat'
  import { createdConference } from '@/utils/ddApi'
  import { useUserStore } from '@/store/user'
  import { useBusinessStore } from "@/store/business"
  import { openLoading, closeLoading, failTip, successTip } from "@/utils/toastTips"
  import uploadFileAndShow from "@/components/business/uploadFileWithshow.vue"
  import { entryQuestionsSave, deleteQuestionById, answerQuestionsSave, saveEvaluateinfo, editEvaluateinfo, updateEvaluateinfo } from "@/api/business"
  import bus from "@/utils/bus"

  const userStore = useUserStore()
  const { nickName, userId } = storeToRefs(userStore)

  const businessStore = useBusinessStore()
  const { cusId, id, state, businessData, protocolId, businessProtocolData } = storeToRefs(businessStore)

  const route = useRoute()

  const isEdit = ref(true)
  const isSave = ref(false)
  const isAsk = ref(true)

  const emit = defineEmits(["changeEditStatus", "changeSaveStatus"])

  watch(() => businessData.value, (newVal) => {
    if (newVal.status != 9 && newVal.status != 11) {
      isEdit.value = false
    } else {
      isEdit.value = true
    }
    emit("changeEditStatus", isEdit.value)
  })

  watch(() => businessProtocolData.value, (newVal) => {
    setQUestions(newVal)
  })

  if (state.value != 9 && state.value != 11) {
    isEdit.value = false
  }

  /* 问题 */
  const questionWords = ref("")

  const questionsList = ref([])
  /* 法务文件 */
  const uploadFileInput = ref()

  const legalFileList = reactive({
    modifyVersionFile: [],
    assessmentReportFile: [],
    riskSummaryFile: []
  })

  const formRule = reactive({
    modifyVersionFile: [ {type: 'array', required: true, message: '请上传修改版协议', trigger: 'change'} ],
    assessmentReportFile: [ {type: 'array', required: true, message: '请上传评估报告', trigger: 'change'} ],
    riskSummaryFile: [ {type: 'array', required: true, message: '请上传风险汇总', trigger: 'change'} ],
  })
  /* 会议信息 */
  const meetingInfo = reactive({
    meetingTime: '',
    players: ''
  })
  /* 回填问题 */
  const setQUestions = (data) => {
    const fileListKey = ["modifyVersionFile", "assessmentReportFile", "riskSummaryFile"]
    questionsList.value = data.problemLogs.map(item => {
      item['response'] = []
      item['questionWords'] = ''
      // if (item.createdId === userid.value) {
      //   isAsk.value = true
      // }
      if (data.replyLogs.length) {
        data.replyLogs.forEach(el => {
          if (el.problemId == item.id) {
            item['response'].push(el)
          }
        })
      }
      return item
    })
    fileListKey.forEach(item => {
      if (data[item].url) {
        if (!isSave.value && state.value != 11) {
          isSave.value = true
          // emit("changeSaveStatus", true)
        }
        legalFileList[item] = [data[item]]
      }
    })

    /* 设置会议信息 */
    if (data.meetingLogInfo.length) {
      let length = data.meetingLogInfo.length
      const { meetingTime, players } = data.meetingLogInfo[0]
      meetingInfo.meetingTime = meetingTime
      meetingInfo.players = players
    }
  }

  if (businessProtocolData.value) {
    setQUestions(businessProtocolData.value)
  }

  /* 删除问题 */
  const deleteQuestion = (index) => {
    Dialog.confirm({
      title: '提示',
      message: '是否确定要删除该问题及其回复！',
    })
      .then(() => {
        if (!questionsList.value[index].id) {
          questionsList.value.splice(index, 1)
          return
        }
        openLoading()
        deleteQuestionById(questionsList.value[index].id)
        .then((res) => {
          if (res.code === 200) {
            successTip("删除成功！")
            questionsList.value.splice(index, 1)
          } else {
            failTip(res.code + ' - ' + res.msg)
          }
        })
        .catch((e) => {
          failTip('网络请求异常，请联系管理员')
        })
        .finally(() => {
          closeLoading()
        })
      })
      .catch(() => {
      })
  }
  /* 添加问题及回复 */
  const addQuestion = (index) => {
    if (index || index === 0) { // 回复
      const words = questionsList.value[index].questionWords
      if (!words) return
      questionsList.value[index].response.push({replyContent: words, createdTime: getYMDHMS(new Date())})
      questionsList.value[index].questionWords = ''
    } else { // 问题
      if (!questionWords.value) return
      questionsList.value.push({
        createdTime: getYMDHMS(new Date()),
        problemContent: questionWords.value,
        response: [],
        questionWords: ''
      })
      questionWords.value = ''
      nextTick(() => {
        window.scroll(0, document.documentElement.scrollTop + 100)
      })
    }
  }

  /* 录入问题点 */
  const entryQuestions = () => {
    if (questionWords.value) {
      addQuestion(false)
    }
    const attrList = ["problemContent", "createdBy", "createdId", "createdTime"]
    const params = []
    for (let i of questionsList.value) {
      if (!i.id) {
        const data = {}
        attrList.forEach(el => {
          data[el] = i[el]
        })
        data["protocolId"] = protocolId.value
        params.push(data)
      }
    }
    if (!params.length) {
      failTip('请添加新问题后提交！')
      return
    }
    openLoading()
    entryQuestionsSave(params)
      .then((res) => {
        if (res.code === 200) {
          successTip("录入成功！")
          bus.emit("refreshData")
        } else {
          failTip(res.code + ' - ' + res.msg)
        }
      })
      .catch((e) => {
        console.log("entryQuestionsSave", e)
        failTip('网络请求异常，请联系管理员')
      })
      .finally(() => {
        closeLoading()
      })
  }
  /* 确认回复 */
  const answerQuestions = () => {
    // alert("确认回复")
    const params = []
    let index = 0
    for (let i of questionsList.value) {
      if (i.questionWords) {
        addQuestion(index)
      }

      if (i.id && i.response.length) {
        for (let t of i.response) {
          if (!t.id) {
            t["problemId"] = i.id
            params.push(t)
          }
        }
      }
      index++
    }

    openLoading()
    answerQuestionsSave(params)
      .then((res) => {
        if (res.code === 200) {
          successTip("录入成功！")
        } else {
          failTip(res.code + ' - ' + res.msg)
        }
      })
      .catch((e) => {
        failTip('网络请求异常，请联系管理员')
      })
      .finally(() => {
        closeLoading()
      })
  }
  /* 法务上传 */

  const getFile = (info) => {
    legalFileList[info.key].push(info)
  }

  const removeFile = (info) => {
    legalFileList[info.key].splice(info.index, 1)
  }

  /* 保存数据稍后预约 */
  /* 确认预约风险评审会 */
  const saveData = (flag) => {
    if (!flag) {
      tempSave(flag)
      return
    }
    console.log(legalFileList)
    if (!uploadFileInput) return
    uploadFileInput.value.validate((valid, fields) => {
      console.log(valid, fields)
      if (valid) {
        const params = {}
        Object.keys(legalFileList).forEach(item => {
          params[item] = legalFileList[item][0]
        })
        if (isSave.value) {
          updateEvaluateData(flag, params)
          return
        }
        console.log(params)
        saveInfo(params, flag)
      } else {
        failTip("表单未填写完整，请完成后提交！")
      }
    })
  }
  /* 暂存 */
  const tempSave = (flag) => {
    const params = {}
    let has = false
    Object.keys(legalFileList).forEach(item => {
      if (!has && legalFileList[item][0]) {
        has = true
      }
      params[item] = legalFileList[item][0] || null
    })
    if (!has) {
      failTip("表单未填写！")
      return
    }
    if (isSave.value) {
      updateEvaluateData(flag, params)
      return
    }
    saveInfo(params, flag)
  }
  /* 保存 */
  const saveInfo = (params, flag) => {
    console.log(params, flag)
    openLoading()
    saveEvaluateinfo(params)
      .then((res) => {
        if (res.code === 200) {
          successTip("保存成功！")
          bus.emit("refreshData")
          if (flag) {
            /* 创建会议 */
            createdConf(id.value)
          }
        } else {
          failTip(res.code + ' - ' + res.msg)
        }
      })
      .catch((e) => {
        failTip('网络请求异常，请联系管理员')
      })
      .finally(() => {
        closeLoading()
      })
  }
  /* 创建会议 */
  const coopTypeList = ['保税加工', '国内加工', '纯垫资代采']
  const createdConf = (dateUid) => {
    const data = businessData.value

    const title = `${nickName.value} 邀请你参加 客户 ${data.customerName}（${coopTypeList[+data.cooperateType - 1]} ${data.cooperateType == 3 ? '' : data.purchaseModel == 2 ? '代采' : '客供'}）的 风险评审会议 PX01(${dateUid}-2)`
    createdConference(title)
  }

  /* 更新风险评估的文件 */
  const updateEvaluateData = (flag, params) => {
    openLoading()
    updateEvaluateinfo(params)
      .then((res) => {
        if (res.code === 200) {
          successTip("保存成功！")
          bus.emit("refreshData")
          if (flag) {
            /* 创建会议 */
            createdConf(id.value)
          }
        } else {
          failTip(res.code + ' - ' + res.msg)
        }
      })
      .catch((e) => {
        failTip('网络请求异常，请联系管理员')
      })
      .finally(() => {
        closeLoading()
      })
  }

  /* 下一步业务线下沟通 */
  const offlineBridge = () => {
    const params = {}
    Object.keys(legalFileList).forEach(item => {
      params[item] = legalFileList[item][0]
    })
    if (!uploadFileInput) return
    uploadFileInput.value.validate((valid, fields) => {
      if (valid) {
        const params = {}
        Object.keys(legalFileList).forEach(item => {
          params[item] = legalFileList[item][0]
        })
        openLoading()
        editEvaluateinfo(params)
          .then((res) => {
            if (res.code === 200) {
              successTip("保存成功！")
              bus.emit("refreshData")
            } else {
              failTip(res.code + ' - ' + res.msg)
            }
          })
          .catch((e) => {
            failTip('网络请求异常，请联系管理员')
          })
          .finally(() => {
            closeLoading()
          })
      } else {
        failTip("表单未填写完整，请完成后提交！")
      }
    })
  }

  defineExpose({
    entryQuestions,
    answerQuestions,
    saveData,
    offlineBridge
  })
</script>

<style lang="scss">
.entryQuestions{
  padding-top: 10px;
  box-sizing: border-box;
  .questionsListWrap{
    padding: 5px 0px 0px;
    box-sizing: border-box;
    li{
      margin-bottom: 20px;
      .indexWrap{
        height: 20px;
        line-height: 20px;
      }
    }
  }
  .askInfoWrap{
    height: 36px;
    width: 100%;
    img{
      height: 26px;
      width: 26px;
      border-radius: 18px;
      margin-right: 10px;
    }
    .askerWrap{
      width: calc(100% - 36px);
      &>:nth-child(2){
        float: right;
      }
    }
  }
  .questionWords{
    padding-left: 36px;
    box-sizing: border-box;
  }
  .sendInputWrap{
    padding: 0 36px;
    height: 32px;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 20px;
    .el-input__wrapper{
      box-shadow: none !important;
      background-color: #F6F6FB;
      input::placeholder {
        color: #B2BAD1;
      }
    }
    .iconWrap{
      height: 100%;
      width: 32px;
      background-color: #F6F6FB;
      img{
        height: 12px;
      }
    }
  }
  .answerWrap{
    margin-top: 10px;
    padding-right: 0;
    .answerListWrap{
      li{
        margin-bottom: 10px;
        padding-left: 10px;
        box-sizing: border-box;
      }
    }
    .sendInputWrap{
      padding: 0;
    }
  }
  .showWrap{
    background-color: #F1F7FF;
    padding: 0 10px 10px 52px;
    .answerListWrap{
      margin-top: 8px;
    }
    li{
      padding-left: 3px !important;
    }
  }
  .legalFileUplaodWrap{
    padding: 0 0px 10px;
    box-sizing: border-box;
    .el-form-item__label{
      color: $e-gray;
    }
    .el-form-item{
      margin-bottom: 5px;
    }
  }
}
</style>
