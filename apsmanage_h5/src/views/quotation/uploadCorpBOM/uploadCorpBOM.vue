<template>
  <div class="bom">
    <CustomerQuoteForm :customerDetail="customerDetail"></CustomerQuoteForm>
    <!-- 客供BOM详情-->
    <BomFile class="mt-12" :bom-detail="bomDetail"></BomFile>
    <!-- 我司BOM，isToUpload区分编辑和详情-->
    <div class="bom-company custom-input">
      <div>
        <div class="label">我司BOM</div>
        <div class="file">
          <VantUpload keys="bomFileList" is-bom v-if="isToUpload" :filesList="bomFileList" @getFileError="getFileError" :btnName="'上传附件'" :limitNum="1"
                      :limitFormat="[xlsAccept]"
                      @getFileInfo="getCheckFileInfo"></VantUpload>
          <businessFileList class="mt-6" :showDelete="isToUpload" :fileList="isToUpload ? bomFileList : bomFileListHistory" @removeFile="removeCheckFile"
                            keys="bomFileList"></businessFileList>
          <div color="#FF3A35" class="fz-14 mt-6" v-if="fileErrorMsg">
            <van-icon name="clear" class="mr-2"/>
            {{ fileErrorMsg }}
          </div>
        </div>
      </div>
      <div :class="{'ui-cell':!form.otherFile.length && !isToUpload}">
        <div class="label">其它附件</div>
        <div class="file">
          <VantUpload keys="otherFile" v-if="isToUpload" :filesList="isToUpload? form.otherFile:bomDetail?.companyBomInfo?.[0]?.otherFile" :btnName="'上传附件'" :limitNum="5"
                      :limitFormat="otherFileType"
                      @getFileInfo="getCheckFileInfo"></VantUpload>
          <span class="detail" v-if="!form.otherFile.length && !isToUpload">无</span>
          <businessFileList class="mt-6" :showDelete="isToUpload" keys="otherFile" :fileList="form.otherFile" @removeFile="removeCheckFile"></businessFileList>
        </div>
      </div>
      <div :class="{'ui-cell':!isToUpload}">
        <div class="label">备注</div>
        <div class="file">
          <el-input v-if="isToUpload" placeholder="备注，非必填" v-model="form.remark" type="textarea" rows="4" maxlength="200"/>
          <span class="detail" v-else>{{ isToUpload ? form.remark : bomDetail?.companyBomInfo?.[0]?.remark }}</span>
        </div>
      </div>
    </div>
    <LoginInfo class="white-bg" height="36px"></LoginInfo>
    <NextButton text="下一步" min-text="推送相关人员" class="mt-10 pt-10" v-if="isToUpload" @click="handlePush"></NextButton>
  </div>
</template>

<script setup>
import CustomerQuoteForm from "../module/customerQuoteForm.vue"
import LoginInfo from "@components/loginInfo.vue"
import NextButton from "@components/button/nextButton.vue"
import BomFile from "../module/bomFile.vue"
import HandlePeople from '@components/handlePeople.vue'
import {xlsAccept, otherFileType} from '@/constant/fileType';
import BusinessFileList from '@/components/businessFileList/index.vue'
import VantUpload from "@/components/vantUpload.vue"
import useCustomerDetail from "../module/useCustomerDetail"
import useDict from "@/hooks/useDict";
import {close, setTitle} from "@/utils/ddApi";
import {Notify, Toast} from 'vant';
import {getHttpBomUpdateRecord, saveHttpBom} from "@/api/business";
import {closeLoading, openLoading} from "@/utils/toastTips";

useDict()
const route = useRoute()
let {offerId, customerDetail} = useCustomerDetail()

onMounted(() => {
  getHttpBomUpdateRecord(offerId).then((res) => {
    bomDetail.value = res.data
    setTitle(`${res.data.createdBy}发起的报价申请`)
  })
})

let data = reactive({
  fileErrorMsg: '',//暂时没用
  bomDetail: {
    customerBom: "",
    customerBomUrl: "",
    prototypePic: [],
    otherFile: [],
    createdTime: "",
    companyBomInfo: []
  },
  form: {
    customerOfferId: offerId,
    companyBom: "",
    companyBomUrl: "",
    remark: "",
    otherFile: []
  },
})
let {form, fileErrorMsg, bomDetail} = toRefs(data)

let bomFileList = computed(() => {
  let name = form.value.companyBom
  let url = form.value.companyBomUrl
  if (!name || !url) {
    return []
  } else {
    return [{name, url}]
  }
})
let bomFileListHistory = computed(() => {
  let name = bomDetail.value?.companyBomInfo?.[0]?.companyBom
  let url = bomDetail.value?.companyBomInfo?.[0]?.companyBomUrl
  if (!name || !url) {
    return []
  } else {
    return [{name, url}]
  }
})

//我司BOM，isToUpload区分编辑和详情
let isToUpload = computed(() => {
  return customerDetail.value.status === 1
})

const handlePush = () => {
  let params = {
    customerOfferId: offerId,
    ...form.value
  }
  if (!bomFileList.value.length) return Notify('我司Bom必须上传')
  openLoading()
  saveHttpBom(params).then((res) => {
    Toast("提交成功");
    setTimeout(close, 2000)
  }).finally(closeLoading)
}

const getFileError = (msg) => {
  fileErrorMsg.value = msg
}

const getCheckFileInfo = (info) => {
  if (info.key === 'bomFileList') {
    form.value.companyBom = info.name
    form.value.companyBomUrl = info.url
    fileErrorMsg.value = ''
  } else {
    form.value[info.key].push(info)
  }
}

const removeCheckFile = (info) => {
  if (info.key === 'bomFileList') {
    form.value.companyBom = ''
    form.value.companyBomUrl = ''
    fileErrorMsg.value = ''
  } else {
    form.value[info.key].splice(info.index, 1)
  }
}
</script>

<style scoped lang="scss">
.bom {
  &-company {
    margin-top: 12px;
    padding: 10px 20px 0 20px;
    background: #FFFFFF;

    .label {
      font-size: 14px;
      color: $e-gray;
      height: 36px;
      line-height: 36px;
      width: 24vw;
    }

    .file {
      margin-left: 60px;
      color: #4a4a4a;
      //width: 200px;
    }
  }


  :deep(.el-form-item__label) {
    color: #a2a2a2;
  }

  :deep(.el-radio-group) {
    display: flex;
    flex-wrap: nowrap;
  }

  :deep(.el-radio) {
    margin-right: 10px;
  }

  :deep(.el-radio__label) {
    font-weight: 400;
  }

  :deep(.el-form-item__content) {
    color: #4a4a4a;
  }
}

.detail {
  font-size: 14px;
  margin-left: -45px;
  color: #4a4a4a;
  display: inline-block;
}
</style>
