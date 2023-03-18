<template>
  <div class="project">
    <CustomerQuoteForm :customer-detail="customerDetail"></CustomerQuoteForm>
    <!-- BOM详情-->
    <BomDetail class="mt-12"></BomDetail>
    <!--当前登录者没有报价时-->
    <div class="project-from mt-12" v-if="!isOffer">
      <BusinessFileList class="w-70" :showDelete="false" :fileList="form.materialOriginalFile.name ? [form.materialOriginalFile] : []"></BusinessFileList>
      <div class="flex ui-cell down">
        <Down @click="openFileLink(form.materialOriginalFile?.url)"></Down>
        <div>下载 物料清单.xls 填写报价信息</div>
      </div>
    </div>
    <!--有报价的情况-->
    <template v-else>
      <div class="mt-12">
        <SourceTable v-if="form.offerMaterial.length" class="project-from mt-12" key="yes" :title="'你报价的物料，共'+form.offerMaterial.length+'笔'"
                     :table-detail="form.offerMaterial"></SourceTable>
        <SourceTable v-if="form.nonOfferMaterial.length" class="project-from mt-12" key="no" :title="'你没有报价的物料，共'+form.nonOfferMaterial.length+'笔'"
                     :table-detail="form.nonOfferMaterial"></SourceTable>
      </div>
      <div class="project-from mt-12 pb-1!">
        <div class="flex height36">
          <span class="e-gray-color">上次报价时间</span>
          <span class="ml-20 b-gray-color">{{ form.myOfferFile?.createdTime }}</span>
        </div>
        <BusinessFileList key="materialOriginalFile" show-down class="w-55" :showDelete="false"
                          :fileList="form.materialOriginalFile.name ? [form.materialOriginalFile] : []"></BusinessFileList>
        <BusinessFileList key="myOfferFile" show-down class="w-55" :showDelete="false" :fileList="form.myOfferFile.name?[form.myOfferFile]:[]"></BusinessFileList>
      </div>
    </template>
    <!--上传报价-->
    <div class="project-from pt-0!" v-if="!isDetail">
      <vantUpload :is-open-loading="false" btnName="上传报价" keys="up" v-if="!isOffer" @getFileInfo="getFileInfo" :limitNum="1" :limitFormat="[xlsAccept]"></vantUpload>
      <div color="#FF3A35" class="fz-14 pt-6" v-if="uploadError">
        <van-icon name="clear" class="mr-2"/>
        {{ uploadError }}
      </div>
    </div>
    <LoginInfo class="white-bg" height="36px"></LoginInfo>

    <template v-if="!isDetail">
      <!--没有报价时显示的按钮-->
      <NextButton v-if="!isOffer" text="确认" min-text="待采购组长选择" class="mt-10 pt-10" @click="submit"></NextButton>
      <!--有报价显示的按钮-->
      <div class="ui-cell save-btn mt-12" v-else >
        <vantUpload :is-open-loading="false" btnName="" keys="againUp" @getFileInfo="getFileInfo" :limitNum="1" :limitFormat="[xlsAccept]">
          <NextButton text="再次上传报价" min-text="" class="pt-10 save-preview"></NextButton>
        </vantUpload>
        <NextButton text="确认" min-text="待采购组长选择" class="pt-10 save-confirm" @click="submit"></NextButton>
      </div>
    </template>
  </div>
</template>

<script setup>
import CustomerQuoteForm from "../module/customerQuoteForm.vue"
import LoginInfo from "@components/loginInfo.vue"
import NextButton from "@components/button/nextButton.vue"
import Down from "../module/down.vue"
import BomDetail from "../module/bomDetail.vue"
import SourceTable from "./table.vue"
import VantUpload from "@/components/vantUpload.vue"
import BusinessFileList from '@/components/businessFileList/index.vue'
import useCustomerDetail from "@/views/quotation/module/useCustomerDetail";
import {getHttpMaterialSourcingOffer, getHttpMaterialSourcingOfferDetail, setHttpInternalOfferAgainUpload, setHttpInternalOfferUpload} from "@/api/business";
import {useBusinessStore} from "@/store";
import {closeLoading, openLoading} from "@/utils/toastTips";
import {xlsAccept} from '@/constant/fileType';
import to from 'await-to-js'
import {Notify, Toast} from "vant";
import {close, openSaveFile} from "@/utils/ddApi";
import useDict from "@/hooks/useDict";

useDict()
let {customerDetail, offerId} = useCustomerDetail()

let data = reactive({
  uploadError: "",
  form: {
    //我的报价文件
    myOfferFile: {
      name: '',
      createdTime: '',
      url: ''
    },
    //物料清单文件
    materialOriginalFile: {
      name: '',
      createdTime: '',
      url: ''
    },
    nonOfferMaterial: [], //没有报价物料
    offerMaterial: [], //有报价的物料
    isOffer: 0, //是否报价 0 是 1 否
  }
})
let {uploadError, form} = toRefs(data)

onMounted(()=>{
  getMaterialSourcingOfferDetail()
})
//是否报价 0 是 1 否 报价了显示详情
let isDetail = computed(() => {
  // form.value?.sourcingOfferFlag === 0
  return customerDetail.value.status !== 3
})
//控制没有报价时的显示,为false时表示没有报价了
let isOffer = computed(() => {
  return !!form.value?.myOfferFile?.name
})

const getMaterialSourcingOfferDetail = () => {
  getHttpMaterialSourcingOfferDetail(offerId).then((res) => {
    form.value = res.data
  })
}

//待采购组长选择
const submit = () => {
  if (!isOffer.value) return Notify(`请上传报价信息`)
  openLoading()
  getHttpMaterialSourcingOffer({
    customerOfferId: offerId
  }).then(() => {
    Toast("提交成功");
    setTimeout(close, 2000)
  }).finally(closeLoading)
}

const getFileInfo = async (info) => {
  openLoading()
  let isReUpload = info.key === 'againUp'
  let params = {customerOfferId: offerId, offerUrl: info.url, offerName: info.name}
  let up = isReUpload ? setHttpInternalOfferAgainUpload : setHttpInternalOfferUpload
  if (isReUpload) params.isReUpload = 0
  let [upErr,] = await to(up(params))
  if (upErr) {
    uploadError.value = upErr
  } else {
    let [err, data] = await to(getHttpMaterialSourcingOfferDetail(offerId))
    if (!err) {
      form.value = data.data
      uploadError.value = ''
    }
  }
  closeLoading()
}

const openFileLink = (url) => {
  openSaveFile('物料清单.xls',url)
}
</script>

<style scoped lang="scss">
.project {
  &-from {
    background: #FFFFFF;
    padding: 10px 20px;
  }

  :deep(.el-form-item) {
    margin-bottom: 10px;
  }

  :deep(.vantUpload .uploadBtn) {
    height: 36px;
  }

  .down {
    > div:last-of-type {
      font-size: 12px;
      font-weight: 400;
      color: $e-gray;
      margin-left: 7px;
    }
  }

  .save-btn {
    :deep(.save:first-of-type) > div {
      margin-right: 5px;
      background: #E8F3FF;
      color: #1572F9;
    }

    :deep(.save:last-of-type) > div {
      margin-left: 5px;
    }

    :deep(.vantUpload), :deep(.van-uploader), :deep(.van-uploader__input-wrapper) {
      width: 100%;
    }
  }
}
</style>
