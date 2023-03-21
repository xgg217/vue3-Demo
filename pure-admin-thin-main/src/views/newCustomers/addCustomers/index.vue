<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
import demandForm from './components/demandForm.vue';
import { useUserStoreHook } from '@/store/modules/user'
import { useBusinessStoreHook } from "@/store/modules/business"
import {getItem} from "@/utils/utils"

import { addCustomerDemand, addCustomer, addProduct, updateCustomer, updataCustomerDemand,putHttpOnRecord } from "@/api/business"
import type { FormInstance, FormRules } from 'element-plus'

const useBusinessStore = useBusinessStoreHook();

const { id, state } = useBusinessStore;

/* 路由 */
const router = useRouter()
const route = useRoute()

const {
  loading,
  formData,
  submit,
  changeFormState,
  submitFormData,
  copyCustomer,
  chenckMettingInfo
} = (function () {
  const coopTypeList = ['保税加工', '国内加工', '纯垫资代采']
  const formData = ref<InstanceType<typeof demandForm> | null>(null)

  const { nickName, userId } = useUserStoreHook();


  const loading = ref(false)

  let params = null



  const changeFormState = () => {
    formData.value.changeState(1, formData.value.demandForm.customerBaseId)
  }

  const copyCustomer = () => {
    // delete formData.value.demandForm.id
    const data = formData.value.demandForm
    data.status = 0
    data.userId = userId
    data.businessName = nickName
    data.createdTime = new Date().getTime()
    formData.value.isEdit = true
    // router.push({name: "addDemand", query: {'type': 'copy'}})
  }


    /* 跳转钉钉会议预约 */
  const createdConf = (dateUid) => {
    // const data = formData.value.demandForm
    // const title = `${nickName.value} 邀请你参加 客户 ${data.customerName}（${coopTypeList[+data.cooperateType - 1]} ${data.cooperateType == 3 ? '' : data.purchaseModel == 2 ? '代采' : '客供'}）的 需求评审会议 PX01(${dateUid}-1)`
    // createdConference(title)
  }

  /* 查看钉钉会议信息 */
  const chenckMettingInfo = () => {
    // const data = formData.value.demandForm
    // /* 获取id */
    // openNewPage(data.meetingLog[0].meetingId)
  }

  const submit = (isBool:boolean) => {
    formData.value.submit(isBool)
  }

  const submitFormData = async (data, flag,extraData={}) => {
    // console.log('提交表单数据');
    console.log('flag',flag)
    params = JSON.parse(JSON.stringify(data.value))
    params.createTime = new Date().getTime()
    params.status = 0

    /* 删除配合字段 */
    delete params.smeltTool
    delete params.otherCheck
    delete params.materialCheck
    delete params.otherAccountCheck
    delete params.processCycleTypeCheck
    delete params.remarksCheck

    /* 修改类型 */
    if (params.materialCost != null) {
      params.materialCost = params.materialCost ? 1 : 2
    }
    if (params.defaultClause != null) {
      params.defaultClause = params.defaultClause ? 1 : 2
    }

    if (params.cooperateType === 3) {
      params.invoiceAskList = [params.invoiceAskListRadio]
    }

    /* 修改数字 */
    const numList = ['advanceQuota', 'advanceQuotaMax', 'advanceQuotaMin', 'registeredCapital']
    numList.forEach(item => {
      params[item] = params[item].replace(/[,]/g, '') * 1
    })

    /* 物品损耗率数据转换 */
    params['lossRateList'] = []
    const l = ['A', 'B', 'C']
    l.forEach(item => {
      const name1 = 'loss' + item
      const name2 = `loss${item}Rate`
      if (params[name1]) {
        params.lossRateList.push(item + ':' + params[name2] + '%')
      }
      delete params[name1]
      delete params[name2]
    })

    /* 入料途径转换 */
    params.material = params.material.join(",")
    params.packageMaterial = params.packageMaterial.join(",")

    if (params.status === 0) {
      params.days = 30
    }

    loading.value = true
    if (params.id) {
      if (route.query.type === 'copy' || state == 6) {
        await formData.value.changeState(0)
      }
      if (params.processInstanceId) {
        sessionStorage.set("taskId", params.processInstanceId)
      } else {
        // failTip('流程id错误，请联系管理员！')

        return
      }
      updataCustomerDemand(params)
        .then((res) => {
          if (!res.success) {
            data.value.customerId = ''
            ElMessage.warning(res.msg)
            return
          }
          ElMessage.success("更新成功")
          // if (flag) {
          //   router.push({path: "/myClient"})
          //   createdConf(params.customerBaseId)
          // } else {
          //   router.push({path: "/myClient"})
          // }
        })
        .catch((e) => {
          data.value.customerId = ''
          // failTip('网络请求异常，请联系管理员')
          ElMessage.error('网络请求异常，请联系管理员')
        }).finally(() => {
          loading.value = false
        })
      return
    }

    addCustomerDemand(params)
      .then(async (res) => {
        if (!res.success) {
          data.value.customerId = '';
          ElMessage.warning(res.msg)
          return
        }

        console.log(res)
        const resData = res.data as any;

        //关联报价单id
        if(extraData?.isOutData){
          let outData = getItem('outData')
          try {
            await putHttpOnRecord({customerOfferId:outData.offerId,customerId:params.customerId,customerBaseId:res.data.customerBaseId})
          } catch (error) {
            ElMessage.success('关联报价单成功')
          }
          // let [err,]=await to()
          // if (!err) {
          //   ElMessage.success('关联报价单成功')
          // }
        }
        ElMessage.success("提交成功")
        if (resData.runProcessResponse?.processInstanceId) {
          sessionStorage.set("taskId", resData.runProcessResponse.processInstanceId)
        }
        if (flag) {
          console.log('flag',flag);

          // router.push({path: "/myClient"})
          // createdConf(resData.customerBaseId)
        } else {
          // router.push({path: "/myClient"})
          console.log('flag',flag);
        }
      })
      .catch((e) => {
        data.value.customerId = ''
      }).finally(() => {
        loading.value = false
      })
  }



    return {
    loading,
    formData,
    submit,
    changeFormState,
    submitFormData,
    copyCustomer,
    chenckMettingInfo
  }
})();

onMounted(() => {
  console.log('route.name', route.name);

  if (route.name == 'addCustomers') {
    useBusinessStore.updatePageInfo({id: null, state: null, cusId: null, cusName: null})
  }
});

const { ruleForm1, rules, ruleFormRef } = (() => {
  const ruleFormRef = ref<FormInstance>()
  const ruleForm1 = reactive({
    name: '',
  })
  const rules = reactive<FormRules>({
    name: [
      { required: true, message: 'Please input Activity name', trigger: 'blur' },
    ],
  });
  return {
    ruleForm1, rules, ruleFormRef
  }
})();


</script>

<template>

  <div class="addDemand flex-cul" v-loading="loading">
    <div class="splitWrap" style="left: 0vw;"></div>
    <div class="formWrap">
      <demandForm ref="formData" :submitForm="submitFormData"></demandForm>
    </div>

    <div class="bottomOperate flex-center" v-if="state < 3 || (state > 5 && state < 7) || route.name == 'addCustomers'">
      <div class="bottomOperateWrap flex-center">
        <template v-if="state != 1">
          <el-button v-if="route.name == 'addCustomers'" @click="submit(false)" type="primary" plain>暂存，下次审批</el-button>
          <el-button v-if="state == 0 && route.name !== 'addCustomers'" @click="changeFormState" type="primary" plain>放弃此数据</el-button>
        </template>

        <el-button v-if="state == 0 || route.name == 'addCustomers' || state == 6" type="primary" @click="submit(true)">确认，发起审批</el-button>
        <el-button v-else-if="state == 2" type="primary" @click="chenckMettingInfo">查看评审会信息</el-button>
        <el-button v-else-if="state == 1" type="primary" @click="copyCustomer">复制此客户</el-button>
      </div>
    </div>



  </div>
</template>

<style scoped lang="scss">
.addDemand{
  // height: 100%;
  box-sizing: border-box;
  overflow: auto;
  color:#4A4A4A;
  background-color: white;
  .formWrap{
    overflow-y: auto;
    overflow-x: hidden;
    flex: 1;
    padding: 16px 20px 0;
  }
  .RethinkInfoWrap{
    box-sizing: border-box;
    padding: 0 20px;
  }
  .bottomOperate{
    height: 60px;
    position: relative;
    .bottomOperateWrap{
      width: 100%;
      height: 60px;
      box-sizing: border-box;
      box-shadow: 0 0 2px 2px rgb(238, 238, 238);
      position: fixed;
      bottom: 0;
      background-color: white;
      z-index: 99;
    }
    .el-button{
      height: 44px;
      border-radius: 2px;
      border: unset;
      width: 40%;
    }
  }
}
</style>
