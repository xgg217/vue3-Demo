<template>
  <div class="init">
    <div class="base pt-10! pb-10!">
      <el-form ref="customerRef1" label-position="left"  class="form busElInput" label-width="24vw">
        <el-form-item label="立项">
          <el-radio-group v-model="projectType" @change="changeProjectType">
            <el-radio :key="item.value" :label="item.value" v-for="item in setProjectType">{{ item.name }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="选择报价单" prop="customerId" v-if="projectType===2">
          <SelectOffer @getCustomerInfo="getCustomerInfo" projectType="2"></SelectOffer>
        </el-form-item>
        <el-form-item label="选择客户" prop="customerId" v-if="projectType===1">
          <SelectOffer @getCustomerInfo="getCustomerInfo" projectType="1"></SelectOffer>
        </el-form-item>
      </el-form>
      <CustomerQuoteForm :customerDetail="customerDetail"></CustomerQuoteForm>
    </div>
    <div class="base busElInput custom-input mt-10 pt-18! remarks">
      <el-form-item label-position="left" label-width="24vw" label="立项备注" >
        <el-input v-model.trim="remark" type="textarea" rows="4" placeholder="" maxlength="200"/>
      </el-form-item>
    </div>
    <LoginInfo></LoginInfo>
    <div class="next">
      <NextButton text="确认" min-text="发起立项申请"  @click="startProject"></NextButton>
    </div>
  </div>
</template>

<script setup>
import CustomerQuoteForm from "./components/customerQuoteForm.vue"
import SelectOffer from "@/views/setProject/components/selectOffer.vue"
import LoginInfo from '@components/loginInfo.vue';
import NextButton from '@components/button/nextButton.vue';
import {Notify, Toast} from 'vant';
import {httpProjectInitiationInfo, httpStartProjInitApproved} from "@/api/business"
import {openLoading, closeLoading} from "@/utils/toastTips"
import { useDictStore} from "@/store";
import {close} from "@/utils/ddApi";

const {setProjectType} = storeToRefs(useDictStore())

const router = useRouter()
let data = reactive({
  id:'',
  projectType: 2,     //1、By业务需求立项 2、By报价单立项
  remark: '',
  customerDetail:{}
})
let {projectType,remark,customerDetail} = toRefs(data)

/* 获取立项详情 */
const getCustomerInfo = async (val) => {
  let {projectType,id}=val
  let params={
    projectType
  }
  params[projectType==1?'customerBaseId':'offerId']=id
  data.id=id
  httpProjectInitiationInfo(params).then((res) => {
    customerDetail.value={...res.data,projectType}
  })
}
//切换重置
const changeProjectType = (val) => {
  data.id=''
  customerDetail.value={}
}

/* 发起报价 */
const startProject =() => {
  let params = {
    projectType:data.projectType,
    businessId:data.id,
    customerId:data.customerDetail.customerId,
    customerName:data.customerDetail.customerName,
    remark:data.remark,
  }
  if(!params.businessId || !data.remark){
    return Notify(`请填写完整`)
  }
  openLoading()
  httpStartProjInitApproved(params)
      .then((res) => {
        Toast("提交成功");
        setTimeout(close, 2000)
      }).finally(closeLoading)

}
</script>

<style scoped lang="scss">
.init {
  margin-bottom: 60px;
  .base {
    background-color: white;
    padding: 0 20px 1px 20px;
  }
  .form{
    :deep(.el-select) {
      width: 100%;
    }
    :deep(.el-form-item) {
      margin-bottom: 0;
      height: 36px;
      line-height: 36px;
    }
    :deep(.el-radio-group) {
      display: flex;
      flex-wrap: nowrap;
      .el-radio{
        margin-right: 10px;
      }
    }
  }
  .remarks{
    :deep(.el-form-item__label) {
      justify-content: left;
    }
  }
  .next{
    position: absolute;
    width: 100%;
    bottom: 0;
    .save{
      padding-top: 10px;
    }
  }
}

</style>
