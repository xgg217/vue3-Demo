<template>
  <div class="meetingInput">
    <div class="splitWrap" v-if="!isEdit && props.index === 0"></div>
    <div class="demandForm busCancelEdit" :class="{'paddingTop10': !isEdit}" :style="{marginBottom: isEdit ? '10px' : 0}">
      <el-form label-width="24vw" label-position="left">

        <el-form-item label="会议时间">
          {{ meetingInfo.meetingTime }}
        </el-form-item>

        <el-form-item v-if="meetingInfo.players" label="参与人" label-width="24vw">
          <div style="width: 100%" v-moreTips="meetingInfo.players"></div>
        </el-form-item>

      </el-form>
    </div>
    <div class="splitWrap" v-if="isEdit"></div>
    <div class="demandForm" :class="{'busCancelEdit': !isEdit, 'paddingTop10': isEdit}">
      <el-form :model="meetingInfo" label-width="24vw" label-position="left" :disabled="!isEdit"  :rules="formRule" ref="meetingInput">
        <el-form-item label="会议决定">
          <el-radio-group v-if="isEdit" v-model="meetingInfo.meetingResult">
            <el-radio :label="0">通过</el-radio>
            <el-radio :label="1">不通过</el-radio>
          </el-radio-group>
          <span v-else-if="meetingInfo.meetingResult || meetingInfo.meetingResult == 0" :style="{color: decisionStatus[meetingInfo.meetingResult].color}">{{ decisionStatus[meetingInfo.meetingResult].name }}</span>

        </el-form-item>

        <el-form-item label="会议记录" label-width="24vw" prop="meetingLog">
          <el-input v-if="isEdit" :rows="5" type="textarea" maxlength="200" v-model="meetingInfo.meetingLog" placeholder=""></el-input>
          <div v-else v-html="meetingInfo.meetingLog" class="textAreaTextWrap"></div>
        </el-form-item>

        <el-form-item label="" label-width="24vw">
          <div class="vantUploadWrap">
            <div style="width: 100%; margin: 0.5rem 0">
              <vantUpload v-if="isEdit && meetingInfo.fileList.length < 5" @getFileInfo="getMeetingFileInfo" :btnName="'上传附件'"></vantUpload>
            </div>
            <businessFileList :fileList="meetingInfo.fileList" @removeFile="removeMeetingFile" :showDelete="isEdit"></businessFileList>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="operaterWrap fz-12 d-gray-color" v-if="!isEdit">
      {{ meetingInfo.createdBy || '操作人' }} {{ getYMDHM(new Date(meetingInfo.createdTime), '.') }}
    </div>
    <div class="splitWrap" v-if="!isEdit"></div>
  </div>
</template>

<script setup>
  import { saveMeeting } from "@/api/business"
  import { useBusinessStore } from "@/store/business"
  import { openLoading, closeLoading, failTip, successTip } from "@/utils/toastTips"
  import { getYMDHM } from "@/utils/timeFormat"
  import businessFileList from "@/components/businessFileList/index.vue"
  import bus from "@/utils/bus"

  const route = useRoute()
  const router = useRouter()

  const businessStore = useBusinessStore()
  const { businessData, state } = storeToRefs(businessStore)

  const meetingInput = ref()

  const emit = defineEmits(["changeEditStatus"])

  const props = defineProps({
    meetingInfoData: {
      type: Object
    },
    index: {
      type: Number,
      default: 0
    }
  })

  const decisionStatus = [
    {name: "通过", color: "#34C606"},
    {name: "不通过", color: "#FF3A35"},
  ]

  watch(() => businessData.value, (newVal) => {
    if (newVal.status != 4 || props.meetingInfoData.meetingResult || props.meetingInfoData.meetingResult === 0) {
      isEdit.value = false
    } else {
      isEdit.value = true
    }
    emit("changeEditStatus", isEdit.value)
  })

  const isEdit = ref(true)
  const showMore = ref(false)


  if (businessData.value?.status !== null && businessData.value?.status != 4) {
    isEdit.value = false
  }

  if (route.name === 'leaderCheck') {
    isEdit.value = false
  }
  /* 如果是已经保存的会议结果 */
  if (props.meetingInfoData?.meetingResult || props.meetingInfoData?.meetingResult === 0) {
    isEdit.value = false
  }

  const meetingInfo = ref({
    meetingResult: null, // 会议决议;0 通过 1 不通过
    meetingLog: '', // 会议记录
    fileList: [] // 附件信息
  })

  /* 设置会议信息 */
  const setMeetingInfo = () => {
    if (props.meetingInfoData) {
      meetingInfo.value = JSON.parse(JSON.stringify(props.meetingInfoData))
      if (!meetingInfo.value.fileList) {
        meetingInfo.value.fileList = []
      }
    }
  }

  setMeetingInfo()

  const formRule = reactive({
    meetingLog: [{ required: true, message: '请输入会议记录', trigger: 'blur' }],
  })

  const getMeetingFileInfo = (info) => {
    meetingInfo.value['fileList'].push(info)
  }

  const removeMeetingFile = (info) => {
    meetingInfo.value.fileList.splice(info.index, 1)
  }

  // /* 同步显示更多 */
  // const emit = defineEmits(["showOrHide"])

  /* 保存会议 */
  const saveMeetingRecord = async () => {
    if (!meetingInput) return
    await meetingInput.value.validate((valid, fields) => {
      if (valid) {
        const params = {
          ...meetingInfo.value,
          customerId: businessData.value.customerId,
          customerBaseId: route.params.id * 1
        }
        openLoading()
        saveMeeting(params)
          .then((res) => {
            if (res.code === 200) {
              successTip("保存成功！")
              setTimeout(() => {
                if (!(router.options?.history?.state?.back)) {
                  bus.emit("refreshData")
                } else {
                  router.back()
                }
              }, 500)
            } else {
              failTip(res.code + ' - ' + res.msg)
            }
            closeLoading()
          })
          .catch((e) => {
            console.log("saveMeeting", e)
            failTip('网络请求异常，请联系管理员')
          })
      } else {
        failTip("表单未填写完整，请完成后提交！" )
      }
    })
  }
  defineExpose({
    isEdit,
    saveMeetingRecord
  })
</script>

<style lang="scss" scoped>
.meetingInput{
  .paddingTop10{
    padding-top: 10px;
    box-sizing: border-box;
  }

}
</style>
