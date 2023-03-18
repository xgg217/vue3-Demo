<template>
  <div class="rules">
    <SelectCustomer @getCustomerInfo="getCustomerInfo" class="search"></SelectCustomer>
    <template v-if="customerBusId">
      <!--客户信息-->
      <CustomerBaseInfo :customerDetail="rulesInfo" class="base-info"></CustomerBaseInfo>
      <template v-for="(item,index) in rulesInfo.materialOfferRulesInfo" :key="item.materialId+''+item.key">
        <div class="models ui-cell-sb">
          <div class="ui-cell models-text">
            <div class="shrink-0 c-font-14" style="width: 45px">机型</div>
            <el-input v-model="item.materialCode" placeholder="手动输入，最长50" maxlength="50"/>
          </div>
          <AddIcon text="其它机型规则" @click="createInitData"></AddIcon>
        </div>
        <layout-module title="基础报价规则" class="layout-one">
          <template v-slot:right>
            <AddIcon @handleIcon="open(1,index)"></AddIcon>
          </template>
          <template v-slot:main>
            <div class="table-border" v-if="item.baseOfferInfo.length">
              <el-table :data="item.baseOfferInfo"  style="width: 100%" :header-cell-style="headerState"
                        :cell-style="(row)=>rowState(row,[],{fontSize:'14px'})">
                <el-table-column prop="workStage" label="工序" min-width="18%"/>
                <el-table-column prop="unitId" label="单位" min-width="17%">
                  <template #default="scope">
                    <div>{{ getDictValue('unit', scope.row.unitId) }}</div>
                  </template>
                </el-table-column>
                <el-table-column label="数量" min-width="20%">
                  <template #default="scope">
                    <div>
                      {{ scope.row.minQuantity }}<span v-if="scope.row.minQuantity">-</span>{{ scope.row.maxQuantity }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="price" label="价格" min-width="20%">
                  <template #default="scope">
                    <div v-format-money="scope.row.price"></div>
                  </template>
                </el-table-column>
                <el-table-column label="操作" min-width="25%">
                  <template #default="scope">
                    <div class="ui-cell c-font-14">
                      <div @click="open(1,index,scope)" color="#1572F9" class="pr-4">编辑</div>
                      <div color="#FF3A35" v-if="!ideaProcess.includes(scope.row.workStage)" @click="del('baseOfferInfo',index,scope.$index)">删除</div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </template>
        </layout-module>
        <layout-module title="MOQ规则">
          <template v-slot:right>
            <AddIcon @handleIcon="open(2,index)"></AddIcon>
          </template>
          <template v-slot:main>
            <div class="table-border" v-if="item.moqOfferInfo.length">
              <el-table  :data="item.moqOfferInfo" style="width: 100%" :header-cell-style="headerState"
                        :cell-style="(row)=>rowState(row,[],{fontSize:'14px'})">
                <el-table-column label="数量">
                  <template #default="scope">
                    <div>
                      {{ scope.row.minQuantity }}<span v-if="scope.row.minQuantity">-</span>{{ scope.row.maxQuantity }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="multiple" label="倍数"/>
                <el-table-column label="操作">
                  <template #default="scope">
                    <div class="ui-cell c-font-14" color="#FF3A35" @click="del('moqOfferInfo',index,scope.$index)">删除</div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </template>
        </layout-module>
        <layout-module title="物流报价规则">
          <template v-slot:right>
            <AddIcon @handleIcon="open(3,index)"></AddIcon>
          </template>
          <template v-slot:main>
            <div class="table-border"  v-if="item.logisticsRulesInfo.length">
              <el-table  :data="item.logisticsRulesInfo" :header-cell-style="headerState" :cell-style="(row)=>rowState(row,[],{fontSize:'14px'})">
                <el-table-column prop="projectId" label="物流项目" min-width="30%">
                  <template #default="scope">
                    <div>{{ getDictValue('logistics_project', scope.row.projectId) }}</div>
                  </template>
                </el-table-column>
                <el-table-column prop="quantity" label="价格" min-width="20%">
                  <template #default="scope">
                    <div v-format-money="scope.row.quantity"></div>
                  </template>
                </el-table-column>
                <el-table-column prop="currency" label="币别" min-width="20%">
                  <template #default>
                    <div>{{getDictValue('currency', rulesInfo.offerCurrency) }}</div>
                  </template>
                </el-table-column>
                <el-table-column prop="unitId" label="单位" min-width="15%">
                  <template #default="scope">
                    <div>{{ getDictValue('unit2', scope.row.unitId) }}</div>
                  </template>
                </el-table-column>
                <el-table-column label="操作" min-width="15%">
                  <template #default="scope">
                    <div class="ui-cell c-font-14" color="#FF3A35" @click="del('logisticsRulesInfo',index,scope.$index)">删除</div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            </template>
        </layout-module>
        <layout-module title="关务报价规则">
          <template v-slot:right>
            <AddIcon @handleIcon="open(4,index)"></AddIcon>
          </template>
          <template v-slot:main>
            <div class="table-border" v-if="item.customsRulesInfo.length">
              <el-table :data="item.customsRulesInfo"  style="width: 100%" :header-cell-style="headerState"
                        :cell-style="(row)=>rowState(row,[],{fontSize:'14px'})">
                <el-table-column prop="projectId" label="报关项目" min-width="30%">
                  <template #default="scope">
                    <div>{{ getDictValue('customs_project', scope.row.projectId) }}</div>
                  </template>
                </el-table-column>
                <el-table-column prop="quantity" label="价格" min-width="20%">
                  <template #default="scope">
                    <div v-format-money="scope.row.quantity"></div>
                  </template>
                </el-table-column>
                <el-table-column prop="currency" label="币别" min-width="20%">
                  <template #default>
                    <div>{{getDictValue('currency', rulesInfo.offerCurrency) }}</div>
                  </template>
                </el-table-column>
                <el-table-column prop="unitId" label="单位" min-width="15%">
                  <template #default="scope">
                    <div>{{ getDictValue('unit2', scope.row.unitId) }}</div>
                  </template>
                </el-table-column>
                <el-table-column label="操作" min-width="15%">
                  <template #default="scope">
                    <div class="ui-cell c-font-14" color="#FF3A35" @click="del('customsRulesInfo',index,scope.$index)">删除</div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </template>
        </layout-module>
        <layout-module title="返工单价规则">
          <template v-slot:right>
            <AddIcon @handleIcon="open(5,index)"></AddIcon>
          </template>
          <template v-slot:main>
            <div class="table-border" v-if="item.reworkPriceRulesInfo.length">
              <el-table :data="item.reworkPriceRulesInfo"  style="width: 100%" :header-cell-style="headerState"
                        :cell-style="(row)=>rowState(row,[],{fontSize:'14px'})">
                <el-table-column prop="unitId" label="单位" min-width="20%">
                  <template #default="scope">
                    <div>{{getDictValue('unit', scope.row.unitId) }}</div>
                  </template>
                </el-table-column>
                <el-table-column label="数量" min-width="25%">
                  <template #default="scope">
                    <div>
                      {{ scope.row.minQuantity }}<span v-if="scope.row.minQuantity">-</span>{{ scope.row.maxQuantity }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="单价" min-width="20%" abel="单价">
                  <template #default="scope">
                    <div v-format-money="scope.row.unitPrice"></div>
                  </template>
                </el-table-column>
                <el-table-column prop="currency" label="币别" min-width="20%">
                  <template #default>
                    <div>{{getDictValue('currency', rulesInfo.offerCurrency) }}</div>
                  </template>
                </el-table-column>
                <el-table-column label="操作" min-width="15%">
                  <template #default="scope">
                    <div class="ui-cell c-font-14" color="#FF3A35" @click="del('reworkPriceRulesInfo',index,scope.$index)">删除</div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </template>
        </layout-module>
        <!-- 历史记录-->
        <History  :materialOfferRulesInfo="item" :offerCurrency="rulesInfo.offerCurrency"></History>
      </template>
      <LoginInfo></LoginInfo>
      <NextButton @click="save"></NextButton>
      <QuotaRule @cancel="cancel" :ruleData="rulePrompt.ruleData" :editData="rulePrompt.editData" :showPrompt="rulePrompt.status" :type="rulePrompt.type"
                 @confirm="confirm"></QuotaRule>
    </template>
    <template v-else>
      <div class="tip">
        <img src="../../../assets/images/notChoose.png" alt="">
        <div>请先选择客户，再针对客户维护报价规则</div>
      </div>
    </template>
  </div>
</template>

<script setup name="customerRules">
import {headerState, rowState} from "@/utils/table";
import CustomerBaseInfo from './module/customerBaseinfo.vue'
import SelectCustomer from '../module/selectCustomer.vue'
import QuotaRule from './module/quotaRule.vue'
import History from './module/history.vue'
import AddIcon from '@components/addIcon.vue'
import LayoutModule from "@/components/layout/layoutModule.vue";
import LoginInfo from '@components/loginInfo.vue';
import NextButton from '@components/button/nextButton.vue';
import {useUserStore, useDictStore} from "@/store";
import {getYMDHMS} from "@/utils/timeFormat";
import {deepClone} from '@/utils/utils'
import {close} from '@/utils/ddApi'
import {getHttpCustomerOfferRules,saveHttpCustomerOfferRules,editHttpCustomerOfferRules} from "@/api/business";
import {Notify,Toast} from "vant";
import {openLoading, closeLoading} from "@/utils/toastTips"
import to from "await-to-js";
import useDict from "@/hooks/useDict";
//获取字典
useDict()
const {unit, getDictValue} = useDictStore()
let route=useRoute()
const userStore = useUserStore()
const customerBusId = ref('')
let {id} = route.params
let data = reactive({
  isAdd:false,
  rulesInfo: {
    officeLongitude: "",
    officeLatitude: "",
    cooperateType: 1,
    purchaseModel: 1,
    productName: "",
    lossRate: "",
    ideaProcess: "",
    materialOfferRulesInfo: [],
  },
  // 弹窗数据
  rulePrompt: {
    status: false,
    editData: {},
    ruleData: [], //materialOfferRulesInfo里面的数据，需要对项目字段做去重校验
    type: 1,
    index: 0 //层次索引
  }
})

let {rulesInfo, rulePrompt,isAdd} = toRefs(data)

watch(customerBusId,(value)=>{
  getCustomerOfferRules(value)
})

onMounted(()=>{
  if(id) customerBusId.value=id
})
// 客户的工序，需要生成默认数据
const ideaProcess = computed(() => {
  return (rulesInfo.value?.ideaProcess || '').split(',')
})

//获取规则数据
const getCustomerOfferRules = (customerId) => {
  openLoading()
  getHttpCustomerOfferRules(customerId).then((res) => {
    rulesInfo.value=res.data
    if (!res.data.materialOfferRulesInfo.length) {
      createInitData()
      isAdd.value=true
    }else{
      deepMaterialOfferRulesInfo=deepClone(res.data.materialOfferRulesInfo)
      isAdd.value=false
    }
  }).finally(()=>{
    closeLoading()
  })
}
//生成初始数据
const createInitData = () => {
  const baseOfferInfo = {
    'SMT': {
      workStage: "SMT",
      unitId: '1',
    },
    'DIP': {
      workStage: "DIP",
      unitId: '1',
    },
    'TEST': {
      workStage: "TEST",
      unitId: '2',
    },
    'PACK': {
      workStage: "PACK",
      unitId: '2',
    },
    'ASM': {
      workStage: "ASM",
      unitId: '2',
    }
  }
  const ret = {
    materialCode: '', //机器名
    key:Math.random(),
    baseOfferInfo: [],
    moqOfferInfo: [],
    logisticsRulesInfo: [],
    customsRulesInfo: [],
    reworkPriceRulesInfo:[],
    createdBy:userStore.nickName
  }
  ideaProcess.value.forEach((item) => {
    ret.baseOfferInfo.push({
      ...baseOfferInfo[item],
      minQuantity: '',
      maxQuantity: '',
      price: '',
    })
  })
  data.rulesInfo.materialOfferRulesInfo.unshift(ret)
}


/* 获取客户业务id */
const getCustomerInfo = async (value) => {
  customerBusId.value = ''// 触发vif 销毁已经存在的数据
  customerBusId.value = value
}


//打开规则修改弹窗
const open = (type = 1, index, editData = '') => {
  rulePrompt.value.status = !rulePrompt.value.status
  rulePrompt.value.type = type
  rulePrompt.value.index = index
  rulePrompt.value.ruleData = rulesInfo.value.materialOfferRulesInfo[index]
  rulePrompt.value.editData = editData ? {...editData.row, index: editData.$index} : {}
}

const confirm = (value) => {
  let {workStage, unitId, minQuantity, maxQuantity, price, multiple, projectId, quantity, index,unitPrice} = value
  let materialOfferRulesInfo = rulesInfo.value.materialOfferRulesInfo[rulePrompt.value.index]
  switch (rulePrompt.value.type) {
    case 1:
      if (Object.keys(rulePrompt.value.editData).length) {
        //修改
        materialOfferRulesInfo.baseOfferInfo[index] = {workStage, unitId, minQuantity, maxQuantity, price}
      } else {
        materialOfferRulesInfo.baseOfferInfo.push({workStage, unitId, minQuantity, maxQuantity, price})
      }
      break
    case 2:
      materialOfferRulesInfo.moqOfferInfo.push({multiple, minQuantity, maxQuantity})
      break
    case 3:
      materialOfferRulesInfo.logisticsRulesInfo.push({projectId, quantity, unitId})
      break
    case 4:
      materialOfferRulesInfo.customsRulesInfo.push({projectId, quantity, unitId})
      break
    case 5:
      materialOfferRulesInfo.reworkPriceRulesInfo.push({unitId, minQuantity, maxQuantity,unitPrice})
      break
  }
  open('')
}
const cancel = () => {
  open('')
}
const save = async () => {
  const materialOfferRulesInfo=rulesInfo.value.materialOfferRulesInfo
  let materialCode=new Set() //校验
  for (let i = 0; i < materialOfferRulesInfo.length; i++) {
    let item= materialOfferRulesInfo[i]
    materialCode.add(item.materialCode)
    if(item.materialCode==='') return Notify(`第${i+1}个机型名不能为空`);
    if(item.baseOfferInfo.length===0) return Notify(`第${i+1}个机型基础报价信息不完善`);
    for (let j = 0; j < item.baseOfferInfo.length; j++) {
      let {maxQuantity,minQuantity,price,unitId,workStage}=item.baseOfferInfo[j]
      if(!maxQuantity ?? !minQuantity ?? !price ?? !unitId ?? !workStage){
        Notify(`机型${item.materialCode}基础报价信息不完善`);
        return false
      }
    }
  }
  if(materialCode.size!==materialOfferRulesInfo.length){
    return Notify(`机型名不能重复`);
  }
  let params={
    materialOfferRulesInfo,
    customerId:customerBusId.value
  }
  let err,sucData
  openLoading()
  if(isAdd.value){
    [err,sucData]=await to(saveHttpCustomerOfferRules(params))
  }else{
    //修改要变更修改人
    deepMaterialOfferRulesInfo.forEach((item,index)=>{
      //新增的在数组前面，可以不用操作
      let poor=index+(materialOfferRulesInfo.length-deepMaterialOfferRulesInfo.length)
      if(JSON.stringify(item)!==JSON.stringify(materialOfferRulesInfo[poor])){
        materialOfferRulesInfo[poor].createdBy=userStore.nickName
        materialOfferRulesInfo[poor].createdTime=getYMDHMS(new Date())
        materialOfferRulesInfo[poor].status=1
      }else{
        materialOfferRulesInfo[poor].status=0
      }
    });
    [err,sucData]=await to(editHttpCustomerOfferRules(params))
  }
  closeLoading()
  !err && Toast(sucData.msg);
  // //请求成功后，关闭页面
  setTimeout(()=>{
    close()
  },2000)
}

//根据对象的key，和两层索引,删除数据
const del = (key, index, delIndex) => {
  rulesInfo.value.materialOfferRulesInfo[index][key].splice(delIndex, 1)
}
let deepMaterialOfferRulesInfo=[]

</script>

<style scoped lang="scss">
.rules {
  position: relative;
  .layout-one {
    margin-top: 0;
  }

  :deep(.el-table__cell .cell) {
    padding: 0 2vw;
  }
}

.search {
  height: 50px;
  background-color: white;
  box-sizing: border-box;
  padding: 0 20px;
  flex-shrink: 0;
}
.base-info{
  margin-top: 12px;
  padding: 18px 20px 1px 20px ;
  background: #FFFFFF;
}

.models {
  display: flex;
  background: #FFFFFF;
  padding: 10px 20px;
  height: 36px;
  margin-top: 12px;

  &-text > div:first-of-type {
    width: 28px;
    line-height: 36px;
    //font-size: 14px;
    font-weight: 400;
    color: $e-gray;
    //padding-right: 12px;
  }

  :deep(.el-input) {
    width: 164px;
  }

  :deep(.el-input__wrapper) {
    flex-grow: 0;
    background: #F6F6FB;
    border-radius: 2px;
    box-shadow: none;
  }
}

.tip{
  text-align: center;
  margin-top: 150px;
  font-size: 14px;
  color: $d-gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img{
    width: 211px;
    height: 157px;
    margin-bottom: 24px;
  }
}
</style>
