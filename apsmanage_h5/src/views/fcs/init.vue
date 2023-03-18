<template>
  <div class="init">
    <div class="base pt-10! pb-10!">
      <CustomerQuoteForm :customerDetail="customerDetail">
        <el-form-item label="选择客户" prop="customerId">
          <div class="ui-cell ui-cell-sb w-full">
            <SelectOffer  @getCustomerInfo="getCustomerInfo" cooperateType=""></SelectOffer>
            <div @click="toCustomerDetailInfo(form.businessType,form.businessId)" class="ui-nowrap shrink-0 ml-10" v-if="form.businessId">
              <span style="color: #0076F6;">查看详情</span>
              <van-icon class="ml-5" name="arrow" color="#0076F6"/>
            </div>
          </div>
        </el-form-item>
        <template #map>
          <div class="form pt-10">
            <el-form ref="customerRef1" label-position="left" class="busElInput" label-width="24vw">
              <el-form-item label="发货地点">
                <div class="a-blue-color more address" @click="openMapWindow(1)">
                  <van-icon name="location" color="#1572F9;" class="mr-1"/>
                  {{ form.deliverAddrs || '点击选择地址' }}
                </div>
              </el-form-item>
              <el-form-item label="收货地点">
                <div class="a-blue-color more address" @click="openMapWindow(2)">
                  <van-icon name="location" color="#1572F9;" class="mr-1"/>
                  {{ form.receiptAddrs || '点击选择地址' }}
                </div>
              </el-form-item>
            </el-form>
          </div>
        </template>
      </CustomerQuoteForm>
    </div>
    <layoutModule mini-title="FCS录入">
      <template #right>
        <div class="ui-cell ui-cell down mr-10" @click="getFcsTemplate">
          <img src="@/assets/images/down.png" alt="" >
          <div>下载格式</div>
        </div>
        <van-uploader :accept="xlsAccept" :after-read="afterRead" :preview-image="false" :max-size="1024 * 1024 * 5" @oversize="onOversize">
          <div class="ui-cell down">
            <img src="@/assets/images/down.png" alt="">
            <div>批量导入FCS</div>
          </div>
        </van-uploader>
      </template>
      <template #main>
        <!-- 新增机型-->
        <AddIcon text="机型" class="justify-end height36" @click="handelModel(-1)"></AddIcon>
        <div class="mb-12" v-for="(item,index) in fcsProductInfoList" :key="index">
          <!-- 机型展示-->
          <van-row class="models">
            <van-col span="3" class="ui-cell">{{ item.fcsProduct }}</van-col>
            <van-col span="3" class="ui-cell">{{ item.fcsCategory }}</van-col>
            <van-col span="8" class="ui-cell">{{ dictStore.getDictValue('factory', item.fcsFactoryId) }}</van-col>
            <van-col span="3" class="ui-cell">{{ item.customerItemNo }}</van-col>
            <van-col span="3" class="ui-cell">{{ item.fcsModel }}</van-col>
            <van-col span="4" class="ui-cell">
              <div color="#1572F9" @click="handelModel(index)">编辑</div>
              <div color="#FF3A35" @click="deleteModel(index)">删除</div>
            </van-col>
          </van-row>
          <!-- 报价信息-->
          <div class="busElInput  pt-10! pb-10!" v-if="offerList?.[index]?.offerId">
            <el-form-item label="报价工厂：" class="mb-2!">{{ dictStore.getDictValue('factory', offerList?.[index]?.factoryId) }}</el-form-item>
            <el-form-item label="报价订单量：" class="mb-2!">{{offerList?.[index]?.orderNumber}}</el-form-item>
            <el-form-item label="加工费：" class="mb-2!">{{dictStore.getDictValue('currency',offerList?.[index]?.currency)}} {{offerList?.[index]?.processCost}}</el-form-item>
            <el-form-item label="其它费用：" class="mb-2!">
              <div class="ui-cell ui-cell-sb w-full">
                <div>{{dictStore.getDictValue('currency',offerList?.[index]?.currency)}} {{offerList?.[index]?.otherCost}}</div>
                <div color="#1572F9" @click="toCustomerDetailInfo('2',offerList?.[index]?.offerId)" >
                  报价单详情
                  <van-icon name="arrow"/>
                </div>
              </div>
            </el-form-item>
          </div>
          <!-- 新增FCS-->
          <div class="height36 ui-cell ui-cell-sb">
            <div class="fz-14 font-bold b-gray-color">FCS</div>
            <AddIcon text="新增" class="" @click="handelFcs(-1,index)"></AddIcon>
          </div>
          <!-- FCS table-->
          <div class="table">
            <PxTable :cols="tableCol" :data-source="item.fcsWeekDetailsList">
              <template #produceWeek="{row}">
                {{ row.produceWeek }}
              </template>
              <template #orderNumber="{row}">
                {{ row.orderNumber }}
              </template>
              <template #handel="data">
                <div class="ui-cell">
                  <div color="#1572F9" class="pr-10" @click="handelFcs(data.index,index)">编辑</div>
                  <div color="#FF3A35" @click="deleteFcs(data.index,index)">删除</div>
                </div>
              </template>
            </PxTable>
          </div>
          <div class="total flex ui-cell-sb height36">
            <div>小计</div>
            <div>{{ total(item.fcsWeekDetailsList) }}</div>
          </div>
        </div>

      </template>
    </layoutModule>
    <div class="mt-12">
      <CollectEcharts :weekData="weekData" :detail="fcsProductInfoList"></CollectEcharts>
    </div>
    <LoginInfo></LoginInfo>
    <div class="next">
      <NextButton text="确认" min-text="通知产前准备" @click="saveFcs"></NextButton>
    </div>
  </div>
  <PxtPrompt @cancel="cancel" @confirm="confirmModel" :title="modelIndex===-1?'新增机型':'编辑机型'" v-model:show-prompt="showModel">
    <el-form class="rule-form prompt custom-input busElInput" ref="modelRef" :model="modelData" :rules="ruleFormRules" label-width="18vw" :hideRequiredAsterisk="true"
             label-position="left"
             size="small">
      <el-form-item label="MB" prop="fcsProduct">
        <el-input v-model.trim="modelData.fcsProduct" maxlength="30"/>
      </el-form-item>
      <el-form-item label="品名" prop="fcsCategory">
        <el-input v-model.trim="modelData.fcsCategory" maxlength="30"/>
      </el-form-item>
      <el-form-item label="公司" prop="fcsFactoryId">
        <el-select v-model="modelData.fcsFactoryId" value-key="paramValue">
          <el-option :label="item.paramName" :value="item.paramValue" v-for="item in factory" :key="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="客户料号" prop="customerItemNo">
        <el-input v-model.trim="modelData.customerItemNo" maxlength="30"/>
      </el-form-item>
      <el-form-item label="机型" prop="fcsModel">
        <el-input v-model.trim="modelData.fcsModel" :disabled="modelIndex!==-1" maxlength="30"/>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input v-model.trim="modelData.remarks" maxlength="30"/>
      </el-form-item>
    </el-form>
  </PxtPrompt>
  <PxtPrompt @cancel="cancel" @confirm="confirmFcs" :title="fcsIndex===-1?'新增FCS':'编辑FCS'" v-model:show-prompt="showFcs">
    <el-form class="rule-form prompt custom-input busElInput" ref="fcsRef" :model="fcsData" :rules="ruleFormRules" label-width="18vw" :hideRequiredAsterisk="true"
             label-position="left"
             size="small">
      <el-form-item label="投产数" prop="produceWeek">
        <el-select v-model="fcsData.produceWeek" placeholder="选择投产周数" :disabled="fcsIndex!=-1">
          <el-option :label="item" :value="item" v-for="item in weekData" :key="item"/>
        </el-select>
      </el-form-item>
      <el-form-item label="订单量" prop="orderNumber">
        <el-input v-model.number="fcsData.orderNumber" maxlength="10"/>
      </el-form-item>
    </el-form>
  </PxtPrompt>
  <div class="mapWindow" v-show="mapWindow">
    <Gaodemap @getAddressInfo='getAddressInfo' :lnglat="reAddress" v-model="mapWindow"></Gaodemap>
  </div>
</template>

<script setup>
import SelectOffer from "@/views/fcs/components/selectOffer.vue"
import CustomerQuoteForm from "./components/customerQuoteForm.vue"
import CollectEcharts from "./components/collectEcharts.vue"
import PxtPrompt from '@/components/dialog/prompt.vue'
import PxTable from "@/components/table/table.vue"
import LoginInfo from '@components/loginInfo.vue';
import AddIcon from '@components/addIcon.vue'
import NextButton from '@components/button/nextButton.vue';
import {Notify, Toast} from 'vant';
import {xlsAccept} from '@/constant/fileType';
import {getFcsOfferInfo, getHttpFcsCustomerInfo, getHttpFcsTemplate, getHttpInfoByBusinessId, importHttpFcsInfo, saveHttpFcsInfo, updateHttpFcsInfo} from "@/api/business"
import {openLoading, closeLoading} from "@/utils/toastTips"
import {close, openSaveFile} from "@/utils/ddApi";
import {requiredValidate, repeatValidate, initValidate} from "@/utils/validate";
import transUploadFile from "@/utils/transUploadFile";
import useReviewDetail from "@/views/fcs/useReviewDetail";
import {deepClone} from "@/utils/utils";

let {weekData,toCustomerDetailInfo,factory, dictStore} = useReviewDetail({isGetDetail:false})
const router = useRouter()
const tableCol = [
  {label: "投产周数", key: "produceWeek", scope: {customRender: "produceWeek"},},
  {label: "订单量", key: "orderNumber", scope: {customRender: "orderNumber"}},
  {label: "操作", key: "handel", scope: {customRender: "handel"}},
]

let data = reactive({
  id:'',//fcs基本信息id 编辑用
  isEdit:false, //是否编辑状态
  showModel: false,
  modelIndex: -1, //机型编辑索引 -1为新增
  modelData: {
    fcsProduct: '',
    fcsModel: '',
    fcsCategory: '',
    fcsFactoryId: '',
    customerItemNo: '',
    remarks: ''
  },
  showFcs: false,
  fcsData: {
    produceWeek: '',
    orderNumber: ''
  },
  fcsIndex: -1, //fcs编辑索引 -1为新增
  form: {
    businessId: '',//businessType为1是customerBaseId 为2是offerId
    businessType: '',//业务类型 1 客户业务需求 2 报价
    customerName: '',//客户名称
    customerId: '',//客户id
    deliverAddrs: '', // 发货地址
    deliverAddrsLongitude: '', // 发货地址经度
    deliverAddrsLatitude: '', // 发货地址纬度
    receiptAddrs: '', // 收货地址
    receiptAddrsLongitude: '', // 收货地址经度
    receiptAddrsLatitude: '', // 收货地址纬度
  },
  fcsProductInfoList: [],
  offerList:[],
  customerDetail: {},
  modelRef: null,
  fcsRef: null
})
//机型/fcs校验规则
let ruleFormRules = reactive({
  fcsProduct: [requiredValidate()],
  fcsModel: [requiredValidate(), {validator: (rule, value, callback) => repeatValidate(rule, value, callback, fcsProductInfoList.value, modelIndex.value !== -1, 'fcsModel', "机型已存在"), trigger: 'change'}],
  fcsCategory: [requiredValidate()],
  customerItemNo: [requiredValidate()],
  produceWeek: [requiredValidate(), {validator: (rule, value, callback) => repeatValidate(rule, value, callback, fcsProductInfoList.value[modelIndex.value].fcsWeekDetailsList, fcsIndex.value !== -1, 'produceWeek', "周别已存在"), trigger: 'change'}],
  orderNumber: [requiredValidate(), {validator: initValidate, trigger: 'change'}],
})

let {form, showModel, modelIndex, showFcs, modelData, fcsData, customerDetail, fcsProductInfoList, fcsIndex, modelRef, fcsRef,offerList,isEdit} = toRefs(data)
/* 发起产前准备 */
const saveFcs = () => {
  let fcsProductInfoList=data.fcsProductInfoList
  let params = {
    ...form.value,
    fcsProductInfoList,
    purchaseModel:customerDetail.value.purchaseModel, //采购方式
    cooperateType:customerDetail.value.cooperateType,//合作方式
  }
  //校验
  if(!form.value.businessId){
    return Notify(`请选择客户`);
  }
  if(!form.value.deliverAddrs || !form.value.receiptAddrs){
    return Notify(`请填写发货收货地址`);
  }
  if(fcsProductInfoList.some((item)=>item.fcsWeekDetailsList.length==0)){
    return Notify(`请完善FCS投产信息`);
  }
  for (let i = 0; i < fcsProductInfoList.length; i++) {
    for (let j = 0; j < fcsProductInfoList[i].fcsWeekDetailsList.length; j++) {
      if(!weekData.value.includes(fcsProductInfoList[i].fcsWeekDetailsList[j].produceWeek)){
        return Notify(`当前仅支持+10周的FCS录入`);
      }
    }
  }
  openLoading()
  let fun=updateHttpFcsInfo
  if(!isEdit.value){
    fun=saveHttpFcsInfo
    delete params.id
  }
  fun(params)
      .then((res) => {
        Toast("提交成功");
        setTimeout(close, 2000)
      }).finally(closeLoading)
}

//计算fcs总计
const total = (list) => {
  return list?.reduce((cur, pre) => cur += Number(pre.orderNumber), 0)
}
//重置弹窗
const cancel = () => {
  modelData.value = {fcsModel: '', fcsCategory: '', fcsFactoryId: '', customerItemNo: '', remarks: ''}
  fcsData.value = {produceWeek: '', orderNumber: ''}
  fcsRef.value?.resetFields()
  modelRef.value?.resetFields()
  showFcs.value = false
  showModel.value = false
}
// 操作机型弹窗机型
const handelModel = (index) => {
  modelIndex.value = index
  if (index >= 0) {
    let {fcsProduct, fcsModel, fcsCategory, fcsFactoryId, customerItemNo, remarks} = fcsProductInfoList.value[index]
    modelData.value = {fcsProduct, fcsModel, fcsCategory, fcsFactoryId, customerItemNo, remarks}
  }
  showModel.value = true
}
// 删除机型
const deleteModel = (index) => {
  fcsProductInfoList.value.splice(index, 1)
  offerList.value.splice(index, 1)
}
// 编辑新增机型
const confirmModel = () => {
  modelRef.value.validate(async (valid, fields) => {
    if (!valid) return
    //新增
    if (modelIndex.value == -1) {
      //默认把上一条的fcs信息带进去
      let {customerName,customerId}=form.value
      let materialName=modelData.value.fcsModel
      let firstFcsProductInfoList=deepClone(fcsProductInfoList.value?.[0]?.fcsWeekDetailsList || [])
      let data=await getFcsOfferInfo({materialName, customerName, customerId})
      offerList.value.unshift(data.data) //报价信息
      fcsProductInfoList.value.unshift({...modelData.value,fcsWeekDetailsList:firstFcsProductInfoList})
    } else {
      // 修改
      Object.assign(fcsProductInfoList.value[modelIndex.value],{...modelData.value})
    }
    cancel()
  })
}

// 操作fcs弹窗
const handelFcs = (index, modelIndex) => {
  data.modelIndex = modelIndex
  fcsIndex.value = index
  if (index >= 0) {
    fcsData.value = {...fcsProductInfoList.value[modelIndex].fcsWeekDetailsList[index]}
  }
  showFcs.value = true
}
// 删除fcs
const deleteFcs = (index, modelIndex) => {
  fcsProductInfoList.value[modelIndex].fcsWeekDetailsList.splice(index, 1)
}
// 编辑新增fcs
const confirmFcs = () => {
  fcsRef.value.validate((valid, fields) => {
    if (!valid) return
    //新增
    let fcsWeekDetailsList = fcsProductInfoList.value[modelIndex.value].fcsWeekDetailsList
    if (fcsIndex.value == -1) {
      fcsWeekDetailsList.push({...fcsData.value,})
    } else {
      // 修改
      fcsWeekDetailsList[fcsIndex.value] = {...fcsData.value}
    }
    cancel()
  })
}
// 获取客户信息
const getCustomerInfo = async (value) => {
  Object.assign(form.value,{
    customerId : value.customerId,
    businessType : value.projectType,
    customerName:value.customerName,
    businessId : value.businessId ,
  })
  let {businessType,businessId}=form.value
  getHttpInfoByBusinessId({businessId, businessType}).then((res) => {
    customerDetail.value = res.data
  })
  //查询是否已经有了数据
  getHttpFcsCustomerInfo({businessId,businessType}).then(async (res) => {
    let {deliverAddrs, deliverAddrsLongitude, deliverAddrsLatitude, receiptAddrs, receiptAddrsLongitude, receiptAddrsLatitude, id} = res.data
    //编辑状态
    isEdit.value = !!Object.keys(res.data).length
    fcsProductInfoList.value = res.data.fcsProductInfoList || []
    Object.assign(form.value, {
      deliverAddrs,
      deliverAddrsLongitude,
      deliverAddrsLatitude,
      receiptAddrs,
      receiptAddrsLongitude,
      receiptAddrsLatitude,
      id
    })
    offerList.value=[]
    // 查询报价信息
    for (let i = 0; i < fcsProductInfoList.value.length; i++) {
      //查询报价信息
      let {customerName, customerId} = form.value
      let data = await getFcsOfferInfo({materialName: fcsProductInfoList.value[i].fcsModel, customerName, customerId})
      offerList.value[i] ={...data.data}
    }
  })
}
//下载fcs文件模版
const getFcsTemplate = () => {
  getHttpFcsTemplate().then(res => {
    openSaveFile("fcs录入模版.xls", res.data)
  })
}
// 导入fcs文件
const afterRead = (file) => {
  const files = transUploadFile(file.file)
  openLoading()
  importHttpFcsInfo(files)
      .then(async (res) => {
        fcsProductInfoList.value=res.data
        offerList.value=[]
        for (let i = 0; i < res.data.length; i++) {
          //查询报价信息
          let {customerName,customerId}=form.value
          let data=await getFcsOfferInfo({materialName: res.data[i].fcsModel, customerName, customerId})

          offerList.value[i]=(data.data && Object.keys(data.data)?.length) ? {...data.data} : {}
        }
      }).finally(closeLoading)
}
const onOversize = () => {
  Toast.fail('文件不能超出5M');
}

//地图相关
let mapWindow = ref(false)
let addressType = ref(0)
let reAddress = reactive({lng: 113.94027, lat: 22.512353})

const openMapWindow = (type) => {
  window.openMap = () => {
    mapWindow.value = false
  }
  mapWindow.value = true
  addressType.value = type
  if (addressType.value == 1 && form.value.deliverAddrs) {
    reAddress.lng = form.value.deliverAddrsLongitude
    reAddress.lat = form.value.deliverAddrsLatitude
  }
  if (addressType.value == 2 && form.value.receiptAddrs) {
    reAddress.lng = form.value.receiptAddrsLongitude
    reAddress.lat = form.value.receiptAddrsLatitude
  }
}

const getAddressInfo = (info) => {
  const {name, lnglat} = info
  if (addressType.value == 1) {
    form.value.deliverAddrs = name
    form.value.deliverAddrsLongitude = lnglat.lng
    form.value.deliverAddrsLatitude = lnglat.lat
  } else {
    form.value.receiptAddrs = name
    form.value.receiptAddrsLongitude = lnglat.lng
    form.value.receiptAddrsLatitude = lnglat.lat
  }

}
</script>

<style scoped lang="scss">
.init {
  margin-bottom: 60px;
  overflow-x: hidden;

  .base {
    background-color: white;
    padding: 0 20px 1px 20px;
  }

  .next {
    position: absolute;
    width: 100%;
    bottom: 0;

    .save {
      padding-top: 10px;
    }
  }

  .down {
    min-width: 98px;
    height: 36px;
    box-sizing: border-box;
    background: #F1F7FF;
    border-radius: 2px;
    font-size: 14px;
    color: #0096FF;
    padding: 0 10px;
    cursor: pointer;

    img {
      width: 17px;
      margin-right: 5px;
    }
  }

  .models {
    width: 335px;
    min-height: 70px;
    box-sizing: border-box;
    border: 1px solid #EBF1F7;
    display: flex;

    .van-col {
      text-align: center;
      word-break: break-word;
      padding: 10px 5px;
    }

    .van-col:last-of-type {
      line-height: 25px;
    }
  }

  :deep(.el-form-item__label) {
    justify-content: flex-start;
    width: 26vw;
  }

  .total {
    background: $a-gray;
    font-size: 14px;
    font-weight: bold;
    color: $b-gray;
    padding: 0 10px;
    margin-bottom: 10px;
  }
}

.prompt {
  margin-top: 30px;

  :deep(.el-form-item--small) {
    margin-bottom: 16px;
  }
}
.address {
  background-color: #F6F6FB;
  border-radius: 2px;
  width: 100%;
  padding-left: 10px;
  box-sizing: border-box;
}

.mapWindow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
}
</style>
