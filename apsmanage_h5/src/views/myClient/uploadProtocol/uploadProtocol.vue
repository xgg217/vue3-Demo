<template>
  <div class="uploadProtocol">
    <el-form :model="uploadInfo" label-position="left" ref="uploadInput" :rules="formRule" :disabled="!isEdit" :class="{'busCancelEdit': !isEdit}">
      <el-form-item label="协议编号" label-width="20vw" :rules="[
        { validator: checkUniCode, trigger: 'change' },
      ]" prop="protocolNo">
        <el-input v-model="uploadInfo.protocolNo" placeholder=""></el-input>
      </el-form-item>

      <el-form-item label="初版加工协议" prop="processProtocolFiles" class="flex-cul" >
        <div style="margin-left: 4vw; width: 85vw;">
          <uploadFileAndShow :isEdit="isEdit" :getFileInfo="getProtocalFileInfo" :fileList="uploadInfo.processProtocolFiles" :removeFile="removeProtocalFileInfo" :limitNum="5"></uploadFileAndShow>
        </div>
      </el-form-item>

      <el-form-item label="备注" label-width="14vw">
        <el-input v-if="isEdit" :rows="3" type="textarea" maxlength="200" v-model="uploadInfo.remark" placeholder=""></el-input>
        <div v-else style="width: 100%;background: unset" class="textAreaNoEditBg fz-14">
          {{ uploadInfo.remark }}
        </div>
      </el-form-item>
    </el-form>
    <div class="operaterWrap fz-12 d-gray-color" v-if="!isEdit">
      {{ uploadInfo.createdBy }} {{ uploadInfo.createdTime }}
    </div>
  </div>
  <div class="splitWrap" v-if="!isEdit"></div>
</template>

<script setup>
import uploadFileAndShow from "@/components/business/uploadFileWithshow.vue"
import { openLoading, closeLoading, failTip, successTip } from "@/utils/toastTips"
import { getYMDHM } from '@/utils/timeFormat'
import { useBusinessStore } from "@/store/business"
import { distributeProtocol } from "@/api/business"
import bus from "@/utils/bus"

const route = useRoute()

const businessStore = useBusinessStore()
const { state, businessProtocolData } = storeToRefs(businessStore)

const emit = defineEmits(["changeEditStatus"])

const uploadInfo = reactive({
  protocolNo: "", // 协议编号
  processProtocolFiles: [], // 初版加工协议
  // {name: "测试的没地址的假文件.docx", url: "www.baidu.com"}
  remark: "", // 备注
  customerBaseId: route.params.id * 1,
  createdTime: '',
  createdBy: ''
})

/* 回填 */
watch(() => businessProtocolData.value, (newVal) => {
  setUploadInfo(newVal)
})

const setUploadInfo = (data) => {
  if (state.value === 8 ) return
  Object.keys(uploadInfo).forEach(item => {
    if (data.processProtocol[item]) {
      uploadInfo[item] = data.processProtocol[item]
    } else {
      uploadInfo[item] = data[item]
    }
  })
}

// if (businessProtocolData.value) {
//   setUploadInfo(businessProtocolData.value)
// }

const isEdit = ref(true)

watch(() => state.value, (newVal) => {
  if (newVal != 8) {
    isEdit.value = false
  } else {
    isEdit.value = true
  }
  emit("changeEditStatus", isEdit.value)
})

if (state.value != 8) {
  isEdit.value = false
  emit("changeEditStatus", isEdit.value)
}

/* 文件 */
const getProtocalFileInfo = (info) => {
  uploadInfo.processProtocolFiles.push(info)
}

const removeProtocalFileInfo = (info) => {
  uploadInfo.processProtocolFiles.splice(info.index, 1)
}

/* 表单检查 */
const formRule = {
  processProtocolFiles: [ {type: 'array', required: true, message: '请至少上传一份加工协议', trigger: 'change'} ],
}

const uploadInput = ref()
// let isSubmit = false

/* 协议编号检查 */
const Rex = /^[\d\w-_.]+$/
const checkUniCode = async (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入协议编号！'))
    return
  }
  if (!Rex.test(value)) {
    callback(new Error('只能输入字母、数字和-_.特殊字符'))
    return
  }
  if (value.length > 30) {
    callback(new Error('协议编号必须在30个字符内！'))
    return
  }
  // if (isSubmit) {
  //   const flag = await checkUniCodeReq()
  //   if (flag.code) {
  //     callback(new Error('已存在该协议编号，请重新输入'))
  //     return
  //   }
  // }

  callback()
}

// const checkUniCodeReq = () => {
//   openLoading()
//   return new Promise(res => {
//     setTimeout(() => {
//       closeLoading()
//       isSubmit = false
//       res({code: 0, msg: "sucess"})
//     }, 200)
//   })
// }

/* 提交 */
const submit = async (flag) => {
  // isSubmit = true
  if (!uploadInput) return
  await uploadInput.value.validate((valid, fields) => {
    if (valid) {
      openLoading()
      const params = JSON.parse(JSON.stringify(uploadInfo))
      delete params.createdBy
      distributeProtocol(params)
        .then((res) => {
          if (res.code === 200) {
            successTip("分发成功！")
            setTimeout(() => {
              bus.emit("refreshData")
            }, 500)
          } else {
            failTip(res.code + ' - ' + res.msg)
          }
        })
        // .catch((e) => {
        //   failTip('网络请求异常，请联系管理员')
        // })
        .finally(() => {
          closeLoading()
        })
    } else {
      failTip("表单未填写完整，请完成后提交！")
    }
  })
}

defineExpose({
  submit
})

</script>

<style lang="scss">
.uploadProtocol{
  // margin: 12px 0;
  padding: 0px 0 10px;
  .signBox{
    width: 100%;
    margin-top: 20px;
    text-align: right;
    line-height: 20px;
    font-size: 12px;
    color: $d-gray;
  }
}
</style>
