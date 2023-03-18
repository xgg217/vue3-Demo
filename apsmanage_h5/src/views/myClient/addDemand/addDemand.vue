<template>
  <div class="addDemand flex-cul">
    <div class="splitWrap" style="left: 0vw;"></div>
    <div class="formWrap">
      <demandForm ref="formData" :submitForm="submitFormData"></demandForm>
    </div>
    <!-- <div class="RethinkInfoWrap" v-if="state > 5">
      <meetingInput></meetingInput>
      <leaderCheck></leaderCheck>
    </div> -->
    <div class="bottomOperate flex-center" v-if="state < 3 || (state > 5 && state < 7) || route.name == 'addDemand'">
      <div class="bottomOperateWrap flex-center">
        <template v-if="state != 1">
          <el-button v-if="route.name == 'addDemand'" @click="submit(false)" type="primary" plain>暂存，下次审批</el-button>
          <el-button v-if="state == 0 && route.name !== 'addDemand'" @click="changeFormState" type="primary" plain>放弃此数据</el-button>
        </template>

        <el-button v-if="state == 0 || route.name == 'addDemand' || state == 6" type="primary" @click="submit(true)">确认，发起审批</el-button>
        <el-button v-else-if="state == 2" style="width: 90%" type="primary" @click="chenckMettingInfo">查看评审会信息</el-button>
        <el-button v-else-if="state == 1" type="primary" @click="copyCustomer">复制此客户</el-button>
      </div>
    </div>

  </div>
</template>

<script setup>
  import demandForm from "./module/demandForm.vue"
  import { createdConference, openNewPage } from '@/utils/ddApi'
  import { addCustomerDemand, addCustomer, addProduct, updateCustomer, updataCustomerDemand,putHttpOnRecord } from "@/api/business"
  import { useUserStore } from '@/store/user'
  import { useBusinessStore } from "@/store/business"
  import { openLoading, closeLoading, failTip, successTip } from "@/utils/toastTips"
  import sessionStorage from "@/utils/sessionStorage"
  import to from "await-to-js"
  import {getItem} from "@/utils/utils"
  // 获取字典
  import useDict from "@/hooks/useDict";
  useDict()
  // import leaderCheck from "@/views/myClient/leaderCheck/leaderCheck.vue"
  // import meetingInput from "@/views/myClient/meetingInput/meetingInput.vue"
  /* pinia */
  const userStore = useUserStore()
  const { nickName, userId } = storeToRefs(userStore)
  const businessStore = useBusinessStore()
  const { id, state } = storeToRefs(businessStore)

  /* 路由 */
  const router = useRouter()
  const route = useRoute()

  if (route.name == 'addDemand') {
    businessStore.updatePageInfo({id: null, state: null, cusId: null, cusName: null})
  }

  const submit = (flag) => {
    formData.value.submit(flag)
  }

  /* 获取提交表单提交 */
  const formData = ref()
  let params = null
  // submitFormData新增第三个参数，如果是报价预览跳过来的，需要在提交后，再调一个关联报价id的操作，
  const submitFormData = async (data, flag,extraData={}) => {
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

    openLoading()
    if (params.id) {
      if (route.query.type === 'copy' || state.value == 6) {
        await formData.value.changeState(0)
      }
      if (params.processInstanceId) {
        sessionStorage.set("taskId", params.processInstanceId)
      } else {
        failTip('流程id错误，请联系管理员！')
        return
      }
      updataCustomerDemand(params)
        .then((res) => {
          if (res.code == 200) {
            successTip("更新成功")
            // if (res.data.runProcessResponse?.processInstanceId) {
            //   sessionStorage.set("taskId", res.data.runProcessResponse.processInstanceId)
            // }
            if (flag) {
              router.push({path: "/myClient"})
              createdConf(params.customerBaseId)
            } else {
              router.push({path: "/myClient"})
            }
          } else {
            data.value.customerId = ''
            failTip(res.code + ' - ' + res.msg)
          }
          closeLoading()
        })
        .catch((e) => {
          data.value.customerId = ''
          failTip('网络请求异常，请联系管理员')
        })

      return
    }

    addCustomerDemand(params)
      .then(async(res) => {
        if (res.code == 200) {
          console.log(res)
          //关联报价单id
          if(extraData?.isOutData){
            let outData=getItem('outData')
            let [err,]=await to(putHttpOnRecord({customerOfferId:outData.offerId,customerId:params.customerId,customerBaseId:res.data.customerBaseId}))
            if(!err) successTip("关联报价信息成功")
          }
          successTip("提交成功")
          if (res.data.runProcessResponse?.processInstanceId) {
            sessionStorage.set("taskId", res.data.runProcessResponse.processInstanceId)
          }
          if (flag) {
            router.push({path: "/myClient"})
            createdConf(res.data.customerBaseId)
          } else {
            router.push({path: "/myClient"})
          }

        } else {
          data.value.customerId = ''
          failTip(res.code + ' - ' + res.msg)
        }
      })
      .catch((e) => {
        data.value.customerId = ''
      }).finally(closeLoading)
  }

  const changeFormState = () => {
    formData.value.changeState(1, formData.value.demandForm.customerBaseId)
  }

  const copyCustomer = () => {
    // delete formData.value.demandForm.id
    const data = formData.value.demandForm
    data.status = 0
    data.userId = userId.value
    data.businessName = nickName.value
    data.createdTime = new Date().getTime()
    formData.value.isEdit = true
    router.push({name: "addDemand", query: {'type': 'copy'}})
  }

  const coopTypeList = ['保税加工', '国内加工', '纯垫资代采']
  /* 跳转钉钉会议预约 */
  const createdConf = (dateUid) => {
    const data = formData.value.demandForm
    const title = `${nickName.value} 邀请你参加 客户 ${data.customerName}（${coopTypeList[+data.cooperateType - 1]} ${data.cooperateType == 3 ? '' : data.purchaseModel == 2 ? '代采' : '客供'}）的 需求评审会议 PX01(${dateUid}-1)`
    createdConference(title)
  }

  /* 查看钉钉会议信息 */
  const chenckMettingInfo = () => {
    const data = formData.value.demandForm
    /* 获取id */
    openNewPage(data.meetingLog[0].meetingId)
  }
</script>

<style lang="scss">
.addDemand{
  // height: 100%;
  box-sizing: border-box;
  overflow: auto;
  color:$b-gray;
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
