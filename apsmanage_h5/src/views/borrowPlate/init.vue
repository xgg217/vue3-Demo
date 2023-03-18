<template>
  <div class="init">
    <van-tabs v-model:active="active" color="#0E7EFB" sticky lazy-render @change="changeTab">
      <van-tab title="借板申请" name="init" class="tab-content tab-init ">
        <div>
          <!--其他信息-->
          <layoutModule title="借板信息">
            <template #main>
              <el-form :model="form" ref="ruleFormRef" :rules="rules" label-position="left" label-width="24vw" class="custom-input">
                <el-form-item label="借板工段" prop="sectionCode">
                  <el-select v-model="form.sectionCode" placeholder="选择借板工段">
                    <el-option :label="item" :value="item" v-for="item in sectionCodeDict" :key="item"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="借板原因" prop="reason">
                  <el-select v-model="form.reason" placeholder="选择借板原因">
                    <el-option :label="item" :value="item" v-for="item in reasonDict" :key="item"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="借板去处" prop="toWhere" v-if="!isIPQC">
                  <el-select v-model="form.toWhere" placeholder="选择借板去处">
                    <el-option :label="item" :value="item" v-for="item in toWhereDict" :key="item"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="是否派车" prop="isDispatchCar" v-if="!isIPQC && form.toWhere!=='厂内验证'">
                  <el-select v-model="form.isDispatchCar" value-key="paramValue">
                    <el-option label="是" :value="true"/>
                    <el-option label="否" :value="false"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="归还时间" prop="expectReturnTime">
                  <el-input readonly v-model.trim="form.expectReturnTime" placeholder="请选择归还时间" @click="openShowTime"/>
                </el-form-item>
                <el-form-item label="当线组长" prop="lineLeaderId">
                  <select-customer @getCustomerInfo="getCustomerInfo"></select-customer>
                </el-form-item>
              </el-form>
            </template>
          </layoutModule>
          <layoutModule title="扫码借板">
            <template #right>
              <van-icon name="scan" size="30" badge="" @click="handelScan"/>
            </template>
            <template #main>
              <div>
                <plateInfoItem v-for="(item ,index) in form.serialNumbers" :key="index" :item-info="item">
                  <van-icon name="cross" size="22" @click="delPlateInfo(index)"/>
                </plateInfoItem>
              </div>
            </template>
          </layoutModule>
          <layoutModule title="借板拍照">
            <template #main>
              <div class="flex flex-wrap">
                <VantUpload multiple  :max-count="9" :filesList="form.photos" :btnName="'上传附件'" :limitNum="999" :limitFormat="[imagesAccept]" @getFileInfo="getCheckFileInfo">
                  <img src="@/assets/images/pic.jpg" class="pic" @click="imagePreview">
                </VantUpload>
                <div v-for="(item,index) in form.photos" class="pic" :key="item">
                  <img :src="item" alt="" class="img_100" @click="imagePreview(index)">
                  <div class="close">
                    <van-icon name="cross" color="#fff" @click="removeCheckFile(item)"/>
                  </div>
                </div>
              </div>
            </template>
          </layoutModule>
          <div class="next">
            <nextButton text="确定" min-text="" @click="submit"></nextButton>
          </div>
        </div>
      </van-tab>
      <van-tab title="查看记录" name="record" class="tab-content tab-record">
        <van-list
            class="list"
            v-model:loading="loading"
            :finished="finished"
            inished-text="没有更多了"
            :immediate-check="true"
            @load="getTaskList">
          <TaskInfoItem v-for="(item,index) in taskList" :key="'sub'+index" :item-info="item" @click="goDetail(item)"></TaskInfoItem>
        </van-list>
      </van-tab>
    </van-tabs>
    <!--ipqc角色需要精确到时分秒-->
    <van-popup v-model:show="showTime" position="bottom" round>
      <van-datetime-picker @confirm="handelTimeConfirm" :type="isIPQC?'datetime':'date'" :min-date="data.minDate" @cancel="showTime=false"/>
    </van-popup>
  </div>

</template>

<script setup>
import TaskInfoItem from "@/views/borrowPlate/components/taskInfoItem.vue";
import VantUpload from "@/components/vantUpload.vue"
import {imagesAccept} from "@/constant/fileType";
import PlateInfoItem from "@/views/borrowPlate/components/plateInfoItem.vue";
import {ImagePreview, Notify, Toast} from 'vant';
import {formatTime, year} from "@/utils/utils";
import {close, scan} from "@/utils/ddApi";
import {closeLoading, openLoading} from "@/utils/toastTips";
import useReviewDetail from "@/views/borrowPlate/useReviewDetail";
import usePage from "@/hooks/usePage";
import {requiredValidate} from "@/utils/validate";
import SelectCustomer from "@/views/borrowPlate/components/selectCustomer.vue";
import {getBorrowList, getDetailBySnCode, ipqcCreate, otherCreate} from "@/api/borrowPlate";
import to from "await-to-js";
import {getYMD, getYMDHMS} from "@/utils/timeFormat";

let {isIPQC, route, router} = useReviewDetail({isDetail: false})
const toWhereDict = ['送客户', '送厂商', '厂内验证'] //借板去处
const reasonDict = computed(() => {
  return isIPQC.value ? ['首件检测', '抽检', '验证', '其他'] : ['验证', '分析', '委外', '其他']
})

const sectionCodeDict = computed(() => {
  return isIPQC.value ? ['SMT', 'DIP', 'TEST'] : ['DIP', 'TEST', '维修室']
})

let {type, activeTab} = route.params
let {loading, finished, pageSize, pageNum, total} = usePage({pageNum:1})
let ruleFormRef = ref(null)

let rules = reactive({
  sectionCode: [requiredValidate('请选择借板工段')],
  expectReturnTime: [requiredValidate('请选择归还时间')],
  toWhere: [requiredValidate('请选择借板去处')],
  reason: [requiredValidate('请选择借板原因')],
  isDispatchCar: [requiredValidate('请选择是否派车')],
  lineLeaderId: [requiredValidate('请选择当线组长')],
})
let form = reactive({
  sectionCode: '',//工段
  expectReturnTime: '',//归还时间
  toWhere: '',//借板去处
  reason: '', //借板原因
  isDispatchCar: false,//是否派车
  lineLeaderId: '',//线组长Id
  photos: [],//借板照片
  serialNumbers: [
    // {
    //   serialNumber: '1312312321', //SN号
    //   custName: '21312', //客户名称
    //   modelName: '21312', //机型
    //   workOrderNo: 'M2002210339-T', //工单号
    //   assemblyLineName: 'SMT-1', //线别名称
    //   partNo:'JJXM.T.5MB76DS34-00-10E',
    //   nodeName: '2423' //制程点
    // }
  ], //序号列表
})
let data = reactive({
  minDate: new Date(),
  showTime: false,
  taskList: [],
  active: activeTab || 'init',
})
let {showTime, taskList, active} = toRefs(data)

// 第一个板子的工单号，后面必须都一样
const firstWorkOrderNo = computed(()=>{
  return form.serialNumbers?.[0]?.workOrderNo
})

const goDetail = (item) => {
  router.push({name: 'borrowPlatePreview', params: {id: item.id}})
}
const getTaskList = () => {
  loading.value = false
  openLoading()
  getBorrowList({pageNum: pageNum.value++, pageSize: 10})
      .then((res) => {
        total.value = res.data.total
        taskList.value.push(...res.data.records)
        loading.value = false
        if (taskList.value.length >= total.value) {
          finished.value = true
        }
      }).finally(() => {
    loading.value = false
    closeLoading()
  })
}
const delPlateInfo = (index) => {
  form.serialNumbers.splice(index, 1)
}
const getCustomerInfo = (value) => {
  form.lineLeaderId = value
}
const submit = () => {
  if (!isIPQC.value && form.photos.length < 3) {
    return Notify(`借板拍照至少需要三张照片`)
  }
  if (!form.serialNumbers.length) {
    return Notify(`请使用扫码添加借板`)
  }
  ruleFormRef.value.validate((valid, fields) => {
    if (!valid) return
    if(form.sectionCode!=='维修室'){
      for (let i = 0; i <form.serialNumbers.length; i++) {
        if (form.serialNumbers[i].stageName!==form.sectionCode){
          return Notify(`工段不一致`)
        }
      }
    }
    let fn = isIPQC.value ? ipqcCreate : otherCreate
    let params = {...toRaw(form)}
    if (!isIPQC.value) {
      params.expectReturnTime = params.expectReturnTime + ' 00:00:00'
    }
    openLoading()
    fn(params).then((res) => {
      Toast("提交成功");
      setTimeout(close, 2000)
    }).finally(closeLoading)
  })
}
const changeTab = () => {
  if (active.value==='record'){
    taskList.value=[]
    pageNum.value=1
    getTaskList()
  }
}
// 扫码添加借板
const handelScan = async () => {
  let [err, data] = await to(scan())
  if (!data) return
  console.log('scan', data)
  getDetailBySnCode(data).then((res) => {
    if (!res.data.length) {
      return Notify(`数据不存在`)
    }

    let {customer_name, serial_number, spec1, work_order, process_name, pdline_name,part_no,stage_name} =  res.data[0]
    // 限制工单号必须和第一条的工单号一样
    if (firstWorkOrderNo.value && work_order!==firstWorkOrderNo.value){
      return Notify(`工单号不一致`)
    }
    let isCurrent = form.serialNumbers.findIndex(item => item.serialNumber === serial_number)
    let temp = {
      serialNumber: serial_number, //SN号
      custName: customer_name, //客户名称
      modelName: spec1, //机型
      workOrderNo: work_order, //工单号
      assemblyLineName: pdline_name, //线别名称
      nodeName: process_name, //制程点
      partNo:part_no, //料号
      stageName:stage_name //区段
    }

    if (isCurrent < 0) {
      form.serialNumbers.push({...temp})
    } else {
      form.serialNumbers[isCurrent] = {...temp}
    }
  })
}
// 借板图片预览
const imagePreview = (index) => {
  ImagePreview({
    images: form.photos,
    startPosition: index,
  });
}
// 打开时间选择器
const openShowTime = (val) => {
  showTime.value = true
}
const handelTimeConfirm = (val) => {
  form.expectReturnTime = isIPQC.value ? getYMDHMS(val) : getYMD(val)
  showTime.value = false
}
// 上传图片
const getCheckFileInfo = (info) => {
  info.forEach(({url})=>{
    form.photos.push(url)
  })
}
const removeCheckFile = (info) => {
  form.photos.splice(info.index, 1)
}
// onMounted(() => {
//   getTaskList()
// })
</script>

<style scoped lang="scss">
.init {
  height: 100%;

  .tab-record {
    min-height: calc(100vh - 100px);
    border-top: 10px solid #F4F5FC;
    background: #fff;
  }

  .tab-init {
    padding-bottom: 100px;

    .pic {
      height: 80px;
      width: 80px;
      margin-right: 10px;
      margin-bottom: 10px;
      position: relative;

      .close {
        background: #efefef;
        position: absolute;
        top: 0;
        right: 0;
        width: 14px;
        height: 14px;
        background: rgba(0, 0, 0, .7);
        border-radius: 0 0 0 12px;

        .van-icon-cross {
          position: absolute;
          top: 0px;
          right: 0px;
          font-size: 14px;
          transform: scale(.7) translate(10%, -10%);
        }
      }
    }

  }

  .list {
    min-height: 100%;
    padding: 10px 16px;
    box-sizing: border-box;
    flex: 1;

    .taskInfoItemWrap {
      margin-bottom: 14px;
    }
  }

  .next {
    position: fixed;
    width: 100%;
    bottom: 0;

    .save {
      padding-top: 10px;
    }
  }

  :deep(.el-form-item__content) {
    display: block;
  }

  :deep(.van-picker__confirm) {
    color: $b-blue;
  }
}
</style>
