<template>
  <div class="quota">
    <div class="base" style="padding-top: 10px">
      <el-form :model="form" ref="customerRef1" label-position="left" :rules="formRules" class="busElInput" label-width="24vw">
        <el-form-item label="客户类型">
          <el-radio-group v-model="form.customerType">
            <el-radio :key="item.value" :label="item.value" v-for="item in customerType">{{ item.name }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="客户" prop="customerId" v-if="form.customerType===1">
          <div class="flex ui-cell ui-cell-sb w-full">
            <SelectCustomer @getCustomerInfo="getCustomerInfo" style="width: 160px" cooperateType=""></SelectCustomer>
            <div @click="toCustomerDetailInfo" class="detail">
              <span style="color: #0076F6;">客户详情</span>
              <van-icon class="ml-5" name="arrow" color="#0076F6"/>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="客户" prop="customerName" v-else>
          <el-input class="custom-input" v-model.trim="form.customerName" placeholder="客户名称" maxlength="20"/>
        </el-form-item>
      </el-form>
    </div>
    <!--通用的客户信息-->
    <div class="base">
      <DemandForm :outId="customerBaseId" ref="customerInfoFormRef" v-if="form.customerType === 1 && customerBaseId" key="hasdoc"></DemandForm>
      <DemandForm v-if="form.customerType === 2" ref="customerInfoFormRef" key="hasNotdoc"></DemandForm>
    </div>
    <!--其他信息-->
    <div class="base custom-input">
      <el-form :model="form" ref="customerRef2" :rules="formRules" label-position="left" label-width="24vw">
        <el-form-item label="报价工厂" prop="factoryId">
          <el-select v-model="form.factoryId" value-key="paramValue" placeholder="选择报价工厂">
            <el-option :label="item.paramName" :value="item.paramValue" v-for="item in factory" :key="item.paramValue"/>
          </el-select>
        </el-form-item>
        <el-form-item label="机型" prop="materialCode">
          <el-input v-model.trim="form.materialCode" placeholder="手动输入，最长50" maxlength="50"/>
        </el-form-item>
        <el-form-item label="订单量" prop="orderNumber">
          <el-input v-model.number="form.orderNumber" maxlength="7" placeholder="正整数，上限7位，非必填" inputmode="numeric"/>
        </el-form-item>
        <el-form-item label="备注说明" prop="remarks">
          <el-input v-model.trim="form.remarks" type="textarea" rows="4" placeholder="备注" maxlength="100"/>
        </el-form-item>
        <el-form-item label="客供BOM" class="file">
          <VantUpload keys="bomFileList" :filesList="bomFileList" :btnName="'上传附件'" :limitNum="1" :limitFormat="[xlsAccept]" @getFileInfo="getCheckFileInfo"
                      class="pt-20"></VantUpload>
          <BusinessFileList class="pt-20" keys="bomFileList" :fileList="bomFileList" @removeFile="removeCheckFile"></BusinessFileList>
        </el-form-item>
        <el-form-item label="样机图片" class="file">
          <VantUpload keys="prototypePic" :filesList="form.prototypePic" :btnName="'上传附件'" :limitNum="5" :limitFormat="[imagesAccept]" @getFileInfo="getCheckFileInfo"
                      class="pt-20"></VantUpload>
          <BusinessFileList class="pt-20" keys="prototypePic" :fileList="form.prototypePic" @removeFile="removeCheckFile"></BusinessFileList>
        </el-form-item>
        <el-form-item label="其它附件" class="file">
          <VantUpload keys="otherFile" :filesList="form.otherFile" :btnName="'上传附件'" :limitNum="5" :limitFormat="otherFileType" @getFileInfo="getCheckFileInfo"
                      class="pt-20"></VantUpload>
          <BusinessFileList class="pt-20" keys="otherFile" :fileList="form.otherFile" @removeFile="removeCheckFile"></BusinessFileList>
        </el-form-item>
      </el-form>
    </div>
    <!--未建档客户需要填写联系人-->
    <div class="base busElInput" v-if="form.customerType===2">
      <el-form label-position="left" ref="customerFormRef">
        <el-form-item label="客户联系人" class="flex-cul">
          <CustomerContact :contactsList="form.contactsList" @deleteContact="deleteContact" @confirmContact="confirmContact"></CustomerContact>
        </el-form-item>
      </el-form>
    </div>
    <LoginInfo class="base" height="36px"></LoginInfo>
    <NextButton text="下一步" min-text="上传我司BOM" class="mt-10 pt-10" @click="submitForm" v-if="businessData?.cooperateType!=3"></NextButton>
  </div>
</template>

<script setup>
import SelectCustomer from "../module/selectCustomer.vue"
import CustomerContact from "@/components/business/customerContact.vue"
import DemandForm from "../module/demandForm.vue"
import LoginInfo from '@components/loginInfo.vue';
import NextButton from '@components/button/nextButton.vue';
import VantUpload from "@/components/vantUpload.vue"
import BusinessFileList from '@/components/businessFileList/index.vue'
import {imagesAccept, xlsAccept, otherFileType} from '@/constant/fileType';
import {Notify, Toast} from 'vant';
import {startHttpOffer} from "@/api/business"
import useDict from "@/hooks/useDict";
import {requiredValidate, initValidate} from '@/utils/validate'
import {openLoading, closeLoading} from "@/utils/toastTips"
import {useBusinessStore, useDictStore} from "@/store";
import to from "await-to-js";
import {deepClone} from "@/utils/utils";
import {getHttpInternalOfferBusinessInfo} from "@/api/business"
import {close} from "@/utils/ddApi";
//获取字典
useDict()
const {factory, customerType} = storeToRefs(useDictStore())
const {businessData} = storeToRefs(useBusinessStore())
const router = useRouter()
let data = reactive({
  customerRef1: '',//客户信息1
  customerRef2: '',//客户信息2
  customerInfoFormRef: '',
  formRules: {
    customerId: [requiredValidate('请选择客户')],
    customerName: [requiredValidate('请填写客户名称')],
    materialCode: [requiredValidate('请填写机型')],
    factoryId: [requiredValidate('请选择报价工厂')],
    orderNumber: [{validator: initValidate, trigger: 'change'}],
  },
  customerBaseId: '',
  form: {
    customerId: '', //客户id
    customerType: 1,// 客户类别 1已建档 2未建档
    customerName: "", // 客户名称
    contactsList: [], // 客户联系人
    factoryId: undefined,
    materialCode: undefined,
    customerBom: undefined,
    customerBomUrl: undefined,
    orderNumber: undefined,
    remarks: undefined,
    prototypePic: [],
    otherFile: [],
  }
})
let {form, customerInfoFormRef, customerRef1, customerRef2, formRules, customerBaseId} = toRefs(data)

let bomFileList = computed(() => {
  let name = form.value.customerBom
  let url = form.value.customerBomUrl
  if (!name || !url) {
    return []
  } else {
    return [{name, url}]
  }
})

/* 客户类别修改，清空数据 */
watch(() => form.value.customerType, () => {
  form.value.customerName = ''
  form.value.customerId = ''
  customerBaseId.value = ''
})

// 本期暂不支持纯垫资代采客户
watch(() => businessData.value, (val) => {
  if (val?.cooperateType === 3) {
    Notify("暂不支持纯垫资代采客户")
  }
})

/* 获取客户业务id */
const getCustomerInfo = async (value) => {
  form.value.customerId = value
  getHttpInternalOfferBusinessInfo(value).then((res) => {
    customerBaseId.value = res.data.customerBaseId
  })
}

//跳转详情
const toCustomerDetailInfo = () => {
  router.push({name: "customerDemand", params: {id: customerBaseId.value}})
}

/* 删除联系人 */
const deleteContact = (index) => {
  form.value.contactsList.splice(index, 1)
}
/* 新增联系人 */
const confirmContact = (item) => {
  form.value.contactsList.push(item)
}

/* 发起报价 */
const startOffer = customerBusData => {
  customerBusData = deepClone(customerBusData)
  console.log(customerBusData, customerBusData.officeLongitude)
  let verify = {
    '客供BOM必须上传': !bomFileList.value.length,
    '请填写客户联系人': form.value.customerType === 2 && !form.value.contactsList.length,
    '请选择办公地址': !customerBusData.officeLongitude,
    '请选择合作方式': !customerBusData.cooperateType,
    '暂不支持纯垫资代采客户': customerBusData.cooperateType == 3
  }

  for (const verifyKey in verify) {
    if (verify[verifyKey]) return Notify(verifyKey)
  }

  let params = {
    ...customerBusData,
    ...form.value,
  }
  //删除不用的元素
  let deleteVar = ['approvalLog', 'approvalLog', 'meetingLog', 'supplierFileList', 'fileList',
    'registeredAddress', 'registeredLongitude', 'registeredLatitude', 'id',
    'updatedTime', 'status', 'legalPerson', 'registeredCapital', 'settlementCurrency', 'contractFactoryId', 'companyCredit']
  deleteVar.forEach((item) => {
    delete params[item]
  })
  params.packageMaterial = params.packageMaterial.join(',')
  params.material = params.material.join(',')
  openLoading()
  startHttpOffer(params)
      .then((res) => {
        Toast("提交成功");
        setTimeout(close, 2000)
      }).finally(closeLoading)
}

const submitForm = async () => {
  customerRef1.value.validate(async (valid, fields) => {
    valid && customerRef2.value.validate(async (valid, fields) => {
      if (valid) {
        //去组件里面拿组装好的变量
        const [error, customerBusData] = await to(customerInfoFormRef.value?.dataTrans())
        if(!error){
          await startOffer(customerBusData)
        }
      }
    })
  })
}

const getCheckFileInfo = (info) => {
  if (info.key === 'bomFileList') {
    form.value.customerBom = info.name
    form.value.customerBomUrl = info.url
  } else {
    form.value[info.key].push(info)
  }
}

const removeCheckFile = (info) => {
  if (info.key === 'bomFileList') {
    form.value.customerBom = ''
    form.value.customerBomUrl = ''
  } else {
    form.value[info.key].splice(info.index, 1)
  }
}
</script>

<style scoped lang="scss">
.quota {
  .base {
    background-color: white;
    padding: 0 20px 1px 20px;
  }

  :deep(.el-select) {
    width: 100%;
  }

  :deep(.el-form-item) {
    margin-bottom: 14px;
  }

  :deep(.el-form-item__label) {
    color: $e-gray;
  }


  :deep(.el-radio-group) {
    display: flex;
    flex-wrap: nowrap;
  }

  :deep(.el-radio) {
    margin-right: 10px;
  }

  .contactsListWrap {
    padding: 0 0 0 30px;

    :deep(.el-form-item) {
      margin-bottom: 14px;
    }
  }
}

.file {
  :deep(.el-form-item__content) {
    display: block;
  }

}

</style>
