<template>
  <div class="offlineBridge">
    <div class="bridgeForm" :class="{'busCancelEdit': !isEdit}">
      <el-form :model="bridgeInfo" label-position="left" ref="bridgeInfoRef" :rules="bridgrRule" :disabled="!isEdit" >
        <el-form-item label="客户沟通结果" prop="status">
          <el-radio-group v-model="bridgeInfo.status" @change="changeStatus">
            <el-radio :label="1">达成一致</el-radio>
            <el-radio :label="2">未达成一致</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="客户沟通备注" prop="customerRemark" :class="{'flex-cul': !isEdit}" :rules="[{ required: bridgeInfo.status === 2 ? true : false, message: '请输入', trigger: 'change' }]">
          <el-input class="noBgBorderShadow" v-if="isEdit" :rows="3" type="textarea" maxlength="200" v-model="bridgeInfo.customerRemark" placeholder="未达成一致时，必须填写"></el-input>
          <div style="width: 100%" v-else v-html="bridgeInfo.customerRemark || '无'" class="textAreaNoEditBg"></div>
        </el-form-item>
      </el-form>
    </div>
    <div class="operaterWrap fz-12 d-gray-color" v-if="state > 12 || bridgeInfo.createdBy">
      {{ bridgeInfo.createdBy }} {{ bridgeInfo.createdTime }}
    </div>
    <div class="splitWrap" v-if="!isEdit || props.offlineBridgeData?.status"></div>
  </div>
</template>

<script setup>
  import { openLoading, closeLoading, failTip, successTip } from "@/utils/toastTips"
  import { useBusinessStore } from "@/store/business"
  import { getYMDHM } from '@/utils/timeFormat'
  import { changeCustomerState, offlineBridgeInput } from "@/api/business"
  import bus from "@/utils/bus"

  const route = useRoute()
  const router = useRouter()

  const businessStore = useBusinessStore()
  const { state, id, businessData, businessProtocolData } = storeToRefs(businessStore)

  const bridgeInfoRef = ref()
  const isEdit = ref(true)

  const emit = defineEmits(["changeEditStatus", "changeStatus"])

  const props = defineProps({
    offlineBridgeData: {
      type: Object
    }
  })

  watch(() => state.value, (newVal) => {
    if (newVal != 12 || props.offlineBridgeData?.status) {
      isEdit.value = false
    } else {
      isEdit.value = true
    }
    emit("changeEditStatus", isEdit.value)
  })

  if (state.value != 12) {
    isEdit.value = false
    emit("changeEditStatus", isEdit.value)
  }

  const bridgeInfo = reactive({
    status: null,
    customerRemark: ""
  })

  if (props.offlineBridgeData?.status) {
    isEdit.value = false
  }

  /* 回填 */
  const setBrigeInfo = () => {
    if (props.offlineBridgeData) {
      const { status, customerRemark } = props.offlineBridgeData
      bridgeInfo.status = status
      bridgeInfo.customerRemark = customerRemark || '无'
      if (props.offlineBridgeData.createdBy) {
        bridgeInfo.createdBy = props.offlineBridgeData.createdBy
        bridgeInfo.createdTime = props.offlineBridgeData.createdTime
      }
    }
  }

  setBrigeInfo()

  // watch(() => businessProtocolData.value, (newVal) => {
  //   if (newVal.processProtocol.status) {
  //     setBrigeInfo(newVal.processProtocol)
  //   }
  // })

  // if (businessProtocolData.value) {
  //   setBrigeInfo(businessProtocolData.value.processProtocol)
  // }

  const bridgrRule = reactive({
    status: [{ required: true, message: '请选择', trigger: 'blur' }],
    // remark: [{ required: bridgeInfo.result === 1 ? true : false, message: '请输入', trigger: 'change' }]
  })

  /* 状态变更 */
  const changeStatus = (value) => {
    if (value == 2) {
      emit("changeStatus", true)
    } else {
      emit("changeStatus", false)
    }
  }

  const offlineBridgeSubmit = () => {
    return new Promise((resolve) => {
      openLoading()
      offlineBridgeInput(bridgeInfo)
        .then((res) => {
          if (res.code === 200) {
            successTip("提交成功！")
            resolve(true)
          } else {
            failTip(res.code + ' - ' + res.msg)
            resolve(false)
          }
        })
        .catch((e) => {
          console.log("offlineBridgeInput", e)
          failTip('网络请求异常，请联系管理员')
          resolve(false)
        })
        .finally(() => {
          closeLoading()
        })
    })
  }
  /* 达成一致提交 */
  const submitForm = () => {
    if (!bridgeInfoRef) return
    bridgeInfoRef.value.validate( async (valid, fields) => {
      if (valid) {
        const res = await offlineBridgeSubmit()
        if (res) {
          bus.emit("refreshData")
        }
      } else {
        failTip("表单未填写完整，请完成后提交！" )
      }
    })
  }

  /* 重新评估 */
  const reappraise = () => {
    if (!bridgeInfoRef) return
    bridgeInfoRef.value.validate(async (valid, fields) => {
      if (valid) {
        const res = await offlineBridgeSubmit()
        if (res) {
          if (!(router.options?.history?.state?.back)) {
            bus.emit("refreshData")
          } else {
            router.back()
          }
        }
        // if (re) {
        //   openLoading()
        //   /* 修改状态 */
        //   changeCustomerState({status: 9})
        //     .then((res) => {
        //       if (res.code === 200) {
        //         /* 创建会议 */
        //         createdConf(id.value)
        //       } else {
        //         failTip(res.code + ' - ' + res.msg)
        //       }
        //     })
        //     .catch((e) => {
        //       failTip('网络请求异常，请联系管理员')
        //     })
        //     .finally(() => {
        //       closeLoading()
        //     })
        // }
      } else {
        failTip("表单未填写完整，请完成后提交！" )
      }
    })
  }

  /* 创建会议 */
  const coopTypeList = ['保税加工', '国内加工', '纯垫资代采']
  const createdConf = (dateUid) => {
    const data = businessData.value
    const title = `${name.value} 邀请你参加 客户 ${data.customerName}（${coopTypeList[+data.cooperateType - 1]} ${data.cooperateType == 3 ? '' : data.purchaseModel == 2 ? '代采' : '客供'}）的 风险评审会议 PX01(${dateUid}-2)`
    createdConference(title)
  }

  defineExpose({
    submitForm,
    reappraise
  })
</script>

<style lang="scss">
.offlineBridge{
  .bridgeForm{
    padding: 10px 0;
    box-sizing: border-box;
    .el-form-item__label{
      color: $e-gray;
    }
    // .el-form-item{
    //   margin-bottom: 20px;
    // }
    .el-textarea__inner{
      background-color: #F6F6FB;
      border: unset;
      box-shadow: unset;
    }
  }
}
</style>
