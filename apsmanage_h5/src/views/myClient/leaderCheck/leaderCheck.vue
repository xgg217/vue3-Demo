<template>
  <div class="leaderCheckWrap">
    <div class="demandForm" :class="{'busCancelEdit': !isEdit}">
      <el-form :model="leaderCheckInfo" label-width="24vw" label-position="left" :rules="formRule" ref="leaderCheckInput" :disabled="!isEdit">
        <el-form-item label="董事长审批">
          <el-radio-group v-if="isEdit" v-model="leaderCheckInfo.approvalResult">
            <el-radio :label="8">通过</el-radio>
            <el-radio :label="6">重谈</el-radio>
            <el-radio :label="7">不合作</el-radio>
          </el-radio-group>
          <span v-else-if="leaderCheckInfo.approvalResult" :style="{color: decisionStatus[leaderCheckInfo.approvalResult - 6].color}">{{ decisionStatus[leaderCheckInfo.approvalResult - 6].name }}</span>
        </el-form-item>

        <el-form-item label="审批备注" label-width="24vw" prop="approvalRemarks">
          <el-input v-if="isEdit" :rows="4" type="textarea" maxlength="200" v-model="leaderCheckInfo.approvalRemarks" placeholder=""></el-input>
          <div v-else v-html="leaderCheckInfo.approvalRemarks" class="textAreaTextWrap"></div>
        </el-form-item>

        <el-form-item label="" label-width="24vw">
          <div class="vantUploadWrap">
            <div style="width: 100%; margin: 0.5rem 0">
              <vantUpload v-if="isEdit && leaderCheckInfo.fileList.length < 5" @getFileInfo="getCheckFileInfo" :btnName="'上传附件'"></vantUpload>
            </div>
            <businessFileList :fileList="leaderCheckInfo.fileList" @removeFile="removeCheckFile" :showDelete="isEdit"></businessFileList>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="operaterWrap fz-12 d-gray-color" v-if="!isEdit && leaderCheckInfo">
      {{ leaderCheckInfo.createdBy || '操作人' }} {{ getYMDHM(new Date(leaderCheckInfo.createdTime), '.') }}
    </div>
    <div class="splitWrap" v-if="!isEdit"></div>
  </div>
</template>

<script setup>
  import { saveApproval, downloadBusiness } from "@/api/business"
  import { openSaveFile } from "@/utils/ddApi"
  import { useBusinessStore } from "@/store/business"
  import { openLoading, closeLoading, failTip, successTip } from "@/utils/toastTips"
  import { getDeviceOSType } from "@/utils/utils"
  import businessFileList from "@/components/businessFileList/index.vue"
  import { getYMDHM } from "@/utils/timeFormat"
  import bus from "@/utils/bus"

  const route = useRoute()
  const router = useRouter()

  const businessStore = useBusinessStore()
  const { businessData } = storeToRefs(businessStore)

  const leaderCheckInput = ref()

  const leaderCheckInfo = ref({
    approvalResult: null, // 会议决议;0 通过 1 不通过
    approvalRemarks: '', // 会议记录
    fileList: [] // 附件信息
  })

  const emit = defineEmits(["changeEditStatus"])

  const props = defineProps({
    checkInfoData: {
      type: Object
    },
    index: {
      type: Number,
      default: 0
    }
  })

  let isEdit = ref(true)

  watch(() => businessData.value, (newVal) => {
    if (newVal.status != 5 || props.checkInfoData?.approvalResult) {
      isEdit.value = false
    } else {
      isEdit.value = true
    }
    emit("changeEditStatus", isEdit.value)
    // setApprovalLog(newVal)
  })

  if ((businessData?.value?.status !== null && (businessData?.value?.status != 5 )) || props.checkInfoData?.approvalResult) {
    isEdit.value = false
  }

  const decisionStatus = [
    {name: "重谈", color: "#FFBF00"},
    {name: "不合作", color: "#FF3A35"},
    {name: "通过", color: "#34C606"},
  ]

  const formRule = reactive({
    approvalRemarks: [{ required: true, message: '请输入会议记录', trigger: 'blur' }],
  })

  const setApprovalLog = (data) => {
    if (props.checkInfoData) {
      leaderCheckInfo.value = JSON.parse(JSON.stringify(props.checkInfoData))
    }
  }

  setApprovalLog()

  const showMore = ref(false)

  const getCheckFileInfo = (info) => {
    leaderCheckInfo.value.fileList.push(info)
  }

  const removeCheckFile = (info) => {
    leaderCheckInfo.value.fileList.splice(info.index, 1)
  }

  const showOrHide = (flag) => {
    showMore.value = flag
  }

  const aveApprovalResult = async () => {
    if (!leaderCheckInput) return
    await leaderCheckInput.value.validate((valid, fields) => {
      if (valid) {
      const params = {
        ...leaderCheckInfo.value,
        customerId: businessData.value.customerId,
        customerBaseId: route.params.id * 1
      }
      openLoading()
      saveApproval(params)
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
          failTip('网络请求异常，请联系管理员')
        })
      } else {
        failTip("表单未填写完整，请完成后提交！" )
      }
    })
  }

  /* 保存文件到钉盘 */
  const saveFileToDD = () => {
    downloadBusiness(route.params.id * 1)
      .then(res => {
        const fileName = businessData.value.customerName + ".docx"
        openSaveFile(fileName, res.data)
      })
  }

  defineExpose({
    saveFileToDD,
    aveApprovalResult
  })
</script>

<style lang="scss">
.leaderCheckWrap{
  padding-top: 10px;
  box-sizing: border-box;
}
</style>
