<template>
  <div class="bom">
    <CustomerQuoteForm :customerDetail="customerDetail"></CustomerQuoteForm>
    <!--    客供BOM详情-->
    <BomFile class="mt-12" :bom-detail="bomDetail"></BomFile>
    <!--     我司BOM，isToCheck区分编辑和详情-->
    <div class="bom-company custom-input">
      <div :class="{'ui-cell':!bomFileList.length}">
        <div class="label">我司BOM</div>
        <div class="file">
          <businessFileList class="mt-6" :showDelete="false" :fileList="bomFileList" keys="bomFileList"></businessFileList>
        </div>
      </div>
      <div :class="{'ui-cell':!otherFileList.length}">
        <div class="label">其它附件</div>
        <div class="file">
          <span class="detail" v-if="!otherFileList.length">无</span>
          <businessFileList class="mt-6" :showDelete="false" keys="otherFile" :fileList="otherFileList"></businessFileList>
        </div>
      </div>
      <div class="ui-cell">
        <div class="label">备注</div>
        <div class="file">
          <span class="detail">{{ bomDetail.companyBomInfo?.[0]?.remark }}</span>
        </div>
      </div>
      <HandlePeople :name="bomDetail.createdBy" :time="bomDetail.createdTime"></HandlePeople>
    </div>
    <!--我司BOM检查-->
    <div class="bom-company">
      <el-form class="custom-input" label-position="left" :model="form" label-width="24vw" ref="customerFormRef" :disabled="!isToCheck">
        <el-form-item label="我司BOM检查" label-width="27vw">
          <el-radio-group v-model="form.checkBom">
            <el-radio :key="item.value" :label="item.value" v-for="item in bomAdjust">{{ item.name }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="检查备注" prop="checkRemark">
          <el-input v-model.trim="form.checkRemark" type="textarea" rows="3" placeholder="文本，BOM有误时必须填写" maxlength="250"/>
        </el-form-item>
      </el-form>
      <LoginInfo class="white-bg" height="36px"></LoginInfo>
    </div>

    <template v-if="isToCheck">
      <NextButton v-if="form.checkBom===0" text="上一步" min-text="上传我司BOM" class="mt-10 pt-10" @click="handleBack"></NextButton>
      <NextButton v-else text="确认" min-text="收集报价" class="mt-10 pt-10" @click="handleBack"></NextButton>
    </template>
  </div>
</template>

<script setup>
import CustomerQuoteForm from "../module/customerQuoteForm.vue"
import LoginInfo from "@components/loginInfo.vue"
import NextButton from "@components/button/nextButton.vue"
import BomFile from "../module/bomFile.vue"
import HandlePeople from '@components/handlePeople.vue'
import BusinessFileList from '@/components/businessFileList/index.vue'
import useCustomerDetail from "../module/useCustomerDetail"
import {useBusinessStore, useDictStore} from "@/store";
import useDict from "@/hooks/useDict";
import {close, setTitle} from "@/utils/ddApi";
import {Notify, Toast} from 'vant';
import {checkHttpBom, getHttpBomUpdateRecord, saveHttpBom} from "@/api/business";
import {closeLoading, openLoading} from "@/utils/toastTips";

useDict()
const route = useRoute()
const businessStore = useBusinessStore()
const {cusId} = storeToRefs(businessStore)
let {offerId, customerDetail} = useCustomerDetail()
const {bomAdjust} = useDictStore()
onMounted(() => {
  getHttpBomUpdateRecord(offerId).then((res) => {
    bomDetail.value = res.data
    setTitle(`${res.data.createdBy}发起的报价申请`)
  })
})
let data = reactive({
  bomDetail: {
    customerBom: "",
    customerBomUrl: "",
    prototypePic: [],
    otherFile: [],
    createdTime: "",
    companyBomInfo: []
  },
  form: {
    checkBom: 0,
    checkRemark: '',
    customerOfferId: offerId,
  },
})
let {form, bomDetail} = toRefs(data)

let bomFileList = computed(() => {
  let name = bomDetail.value.companyBomInfo?.[0]?.companyBom
  let url = bomDetail.value.companyBomInfo?.[0]?.companyBomUrl
  if (!name || !url) {
    return []
  } else {
    return [{name, url}]
  }
})
let otherFileList = computed(() => {
  return bomDetail.value.companyBomInfo?.[0]?.otherFile || []
})

onMounted(() => {
  getHttpBomUpdateRecord(offerId).then((res) => {
    bomDetail.value = res.data
    setTitle(`${res.data.createdBy}发起的报价申请`)
  })
})

let isToCheck = computed(() => {
  return customerDetail.value.status === 2
})

const handleBack = () => {
  if (form.value.checkBom === 0 && !form.value.checkRemark) {
    return Notify(`请填写检查备注`);
  }
  openLoading()
  checkHttpBom(form.value).then((res) => {
    Toast("提交成功");
    setTimeout(close, 2000)
  }).finally(closeLoading)
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
