<template>
  <div class="project-table">
    <LayoutModule title="加工费报价" class="layout-one">
      <template v-slot:right v-if="isDetail">
        <div class="height36 fz-12! e-gray-color">依据过去3个月历史数据估算</div>
      </template>
      <template v-slot:main>
        <div v-if="tableData.length">
          <!--汇率筛选-->
          <div class="ui-cell ui-cell-sb height36">
            <div class="flex">
              <div color="#FF3A35" class="mr-20">{{ currency }}</div>
              <div>汇率参考</div>
              <div class="ml-10" v-if="isDetail">{{ processFeeOffer?.exchangeRate }}</div>
            </div>
            <template v-if="!isEdit">
              <el-select v-show="!isDetail" v-if="isShow" v-r-readonly="[0, 0, 0, 0]" v-model="selectValue" filterable allow-create :reserve-keyword="false"
                         placeholder="请选择汇率"
                         @change="selectItem">
                <el-option v-for="item in rate" :key="item.value" :value="item.value+''+item.name">
                  {{ item.value }}{{ item.name }}
                </el-option>
              </el-select>
            </template>
          </div>
          <!--加工费报价-->
          <div class="mt-10">
            <el-form class="form custom-input" ref="ruleFormRef" :model="tableData" :hideRequiredAsterisk="true">
              <div v-for="(item,index) in tableData" :key="index" class="mt-20 table">
                <div class="ui-cell ui-cell-sb th height36">
                  <div>{{ item.workStage }}</div>
                  <div class="e-gray-color"> {{ item.unitId }}</div>
                </div>
                <div class="ui-cell ui-cell-sb height36">
                  <div class="dot">数量</div>
                  <div v-if="isEdit">
                    <el-form-item :prop="index + '.quantity'" :rules="[requiredValidate('请输入数量')]">
                      <el-input v-model.number="tableData[index].quantity" maxlength="10" inputmode="numeric" @input="changInput('quantity',index)"/>
                    </el-form-item>
                  </div>
                  <div v-else>
                    {{ item.quantity ?? '-' }}
                  </div>
                </div>
                <div class="ui-cell ui-cell-sb height36">
                  <div class="dot">成本</div>
                  <div v-format-money="item.cost"></div>
                </div>
                <div class="ui-cell ui-cell-sb height36">
                  <div class="dot">成本小计</div>
                  <div v-format-money="roundFun(item.quantity * item.cost,4)"> </div>
                </div>
                <div class="ui-cell ui-cell-sb height36">
                  <div class="dot">价格</div>
                  <div v-if="isEdit">
                    <el-form-item :prop="index + '.price'" :rules="[requiredValidate('请输入价格'),{validator: fourNumberValidate, trigger: 'change'}]">
                      <el-input :formatter="(value)=>formatMoney(value)"
                                :parser="(value)=>formatMoneyParser(value)"
                                v-model="tableData[index].price" maxlength="10" inputmode="decimal" @input="changInput('price',index)"/>
                    </el-form-item>
                  </div>
                  <div v-else v-format-money="item.price"></div>
                </div>
                <div class="ui-cell ui-cell-sb height36">
                  <div class="dot">小计</div>
                  <div v-format-money="roundFun(item.quantity *(formatMoneyParser((item.price))),4)"></div>
                </div>
              </div>
            </el-form>

            <div class="mt-20 mb-20 table" v-if="tableData.length">
              <div class="ui-cell ui-cell-sb th height36">
                <div>总计</div>
                <div></div>
              </div>
              <div class="ui-cell ui-cell-sb height36">
                <div class="dot">成本小计</div>
                <div v-format-money="costSubtotalTotal"></div>
              </div>
              <div class="ui-cell ui-cell-sb height36">
                <div class="dot">价格总计</div>
                <div v-format-money="subtotalTotal"></div>
              </div>
            </div>
          </div>
          <!--来源-->
          <div class="flex ui-cell-sb height36 e-gray-color">
            <div class="ui-cell" v-if="!isEdit">
              <span class="mr-5">FROM</span>
              <span class="b-gray-color" v-if="processFeeOffer.parameterFrom=='系统计算'">系统计算</span>
              <span class="b-gray-color" v-if="processFeeOffer.parameterFrom=='人手调整'">人手调整</span>
              <span color="#1572F9" @click="toCustomerRules" v-if="processFeeOffer.parameterFrom=='加工费报价'">加工费报价</span>
            </div>
            <div v-else></div>
            <div>
              加工费利润率
              <span :style="{color:processFeeProfitRate<25?'#FF3A35':''}" class="mr-5 ml-5">{{ processFeeProfitRate }}</span>
              <span class="b-gray-color">%</span>
            </div>
          </div>
          <RightIcon v-if="!isDetail && !isEdit" class="justify-end" text="手工调价" @click="isEdit=true"></RightIcon>
          <!--备注-->
          <div>
            <div class="height36 e-gray-color">调价备注（内部）</div>
            <div class="fz-14 ml-60 b-gray-color">
              <el-input v-if="isEdit" v-model="processFeeOffer.remark" type="textarea" rows="4" placeholder="备注"/>
              <div v-else>{{ processFeeOffer.remark }}</div>
            </div>
            <div v-if="isEdit" class="btn ui-cell ui-cell-sb">
              <div></div>
              <div class="ui-cell">
                <div @click="isEdit=false" color="FF3A35" class="mr-10">取消</div>
                <div @click="alertProcessingFee">确认</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </LayoutModule>
  </div>
</template>

<script setup>
import useSelectBlur from "@/hooks/useSelectBlur";
import LayoutModule from "@/components/layout/layoutModule.vue"
import RightIcon from '@components/rightIcon.vue'
import {fourNumberValidate, nineNumberValidate, requiredValidate} from "@/utils/validate";
import {useDictStore} from "@/store";
import useCommon from "@/views/quotation/adjustPrice/module/useCommon";
import {getHttpExchangeRate, getHttpProcessFeeOfferList, postHttpUpdateManualAdjustPrice, postHttpUpdateProcessExchange} from "@/api/business";
import {formatMoney,formatMoneyParser,roundFun} from '@/utils/utils'
const {unit2, unit, customs_project, getDictValue} = useDictStore()
const {currency, isDetail, offerId} = useCommon()
const emit = defineEmits(["getCustomerInfo"])
let router = useRouter()
const props = defineProps({
  customerDetail: {
    type: Object,
    default: () => {}
  },
})
let data = reactive({
  isEdit: false,
  rate: [],
  selectValue: '1当月汇率(人民币)',
  processFeeOffer: {
    remark: '',
  },
  ruleFormRef:''
})
let {isEdit, rate, selectValue, processFeeOffer,ruleFormRef} = toRefs(data)

onMounted(() => {
  getProcessFeeOfferList()
  //汇率字典
  getHttpExchangeRate(offerId).then((res) => {
    rate.value = res.data
  })
})
watch([rate, currency], ([value1, value2]) => {
  if(value1.length && value2){
    let currencyData=value1.filter(item=>item.currency===value2)?.[0]
    if(currencyData){
      selectValue.value= currencyData?.value+''+currencyData?.name
    }
  }
})
const tableData = computed(() => {
  let processFeeList = processFeeOffer.value?.processFeeList
  return processFeeList ? processFeeList : []
})
//成本小计
const costSubtotalTotal = computed(() => {
  return roundFun(tableData.value.reduce((cur, pre) => cur += pre.quantity * pre.cost, 0),4)
})
//价格小计
const subtotalTotal = computed(() => {
  return roundFun(tableData.value.reduce((cur, pre) => {
    return cur += pre.quantity * formatMoneyParser(pre.price)
  }, 0),4)
})

const processFeeProfitRate = computed(() => {
  let ret = (subtotalTotal.value - costSubtotalTotal.value) / costSubtotalTotal.value
  return roundFun((isNaN(ret) ? 0 : ret) * 100,4)
})


let {isShow} = useSelectBlur(selectValue)

//正则匹配下输入的汇率
const selectItem = (v) => {
  if (!v.includes('(')) {
    v = Number(v.replace(/[^0-9.]/ig, ""))
    if (v) {
      selectValue.value = v + '(手动输入)'
    } else {
      selectValue.value = ''
    }
  } else {
    v = Number(v.replace(/[^0-9.]/ig, ""))
  }
  v && postHttpUpdateProcessExchange({exchangeRate: v, id: processFeeOffer.value.id}).then(() => {
    getProcessFeeOfferList()
  })
}
//改变价格的时候，统计计算下小计
const changInput = (key, index) => {
  let cur = processFeeOffer.value?.processFeeList[index]
  cur.costSubtotal = roundFun(cur.quantity * cur.cost,4)
  cur.subtotal = roundFun(cur.quantity * (formatMoneyParser(cur.price)),4)
}
const toCustomerRules = () => {
  router.push({name: "customerRules", params: {id: props.customerDetail.customerId}})
}
const alertProcessingFee = () => {
  ruleFormRef.value.validate((valid, fields) => {
    if (!valid) return
    let {processFeeList, remark, exchangeRate} = processFeeOffer.value
    processFeeList.forEach((item)=>{
      item.price=formatMoneyParser(item.price)
      item.cost=formatMoneyParser(item.cost)
    })
    let params = {customerOfferId: offerId, remark, processFeeList, exchangeRate}
    postHttpUpdateManualAdjustPrice(params).then((res) => {
      isEdit.value = false
      getProcessFeeOfferList()
    })
  })
}

const getProcessFeeOfferList = () => {
  getHttpProcessFeeOfferList(offerId).then((res) => {
    processFeeOffer.value = res.data
  })
}
defineExpose({
  processFeeProfitRate
})
</script>

<style scoped lang="scss">
.form {
  :deep(.el-form-item) {
    margin: 10px 0 0 0;
  }

  :deep(.el-form-item__error) {
    font-size: 10px;
  }
}

.table {
  width: 100%;

  .height36 {
    padding: 0 10px;
  }

  .th {
    background: #EBF5FF;
    padding: 0 10px;
  }

  .dot {
    padding-left: 25px;
    color: $e-gray;
  }

  .dot:before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 3px;
    background: #1572F9;
    display: block;
    position: relative;
    left: -15px;
    top: 20px;

  }
}

.btn {
  width: 100%;
  display: flex;

  div > div {
    width: 77px;
    height: 36px;
    background: #F1F7FF;
    border-radius: 2px;
    font-size: 16px;
    color: #0096FF;
    text-align: center;
    line-height: 36px;
    margin-top: 10px;
  }
}
</style>
