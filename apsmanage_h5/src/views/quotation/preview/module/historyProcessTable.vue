<template>
  <!--加工费历史修改记录-->
  <div class="history">
    <el-collapse v-model="data.activeNames" @change="openHistory">
      <el-collapse-item name="1">
        <template v-slot:title>
          <div class="ui-cell ui-cell-sb wh100">
            <div></div>
            <div class="pr-10 fz-14 shrink-0" color="#0076F6">修改记录</div>
          </div>
        </template>
        <div v-for="(item,index) in data.historyList" :key="index">
          <LayoutModule title="加工费报价" class="layout-one">
            <template v-slot:main>
              <div class="ui-cell ui-cell-sb height36">
                <div class="flex">
                  <div color="#FF3A35" class="mr-20">{{ currency }}</div>
                  <div>汇率参考</div>
                  <div class="ml-10">{{ item?.exchangeRate }}</div>
                </div>
              </div>
              <!--加工费报价-->
                <div v-for="(list,index2) in item.processFeeList" :key="index2" class="mt-20 table">
                  <div class="ui-cell ui-cell-sb th height36">
                    <div>{{ list.workStage.value }}</div>
                    <div class="e-gray-color"> {{ list.unitId.value }}</div>
                  </div>
                  <div class="ui-cell ui-cell-sb height36">
                    <div class="dot">数量</div>
                    <div :style="compareColor(list.quantity.status)">{{ list.quantity.value}}</div>
                  </div>
                  <div class="ui-cell ui-cell-sb height36">
                    <div class="dot">成本</div>
                    <div :style="compareColor(list.cost.status)" v-format-money="list.cost.value"> </div>
                  </div>
                  <div class="ui-cell ui-cell-sb height36">
                    <div class="dot">成本小计</div>
                    <div :style="compareColor(list.costSubtotal.status)" v-format-money="list.costSubtotal.value"></div>
                  </div>
                  <div class="ui-cell ui-cell-sb height36">
                    <div class="dot">价格</div>
                    <div :style="compareColor(list.price.status)" v-format-money="list.price.value"></div>
                  </div>
                  <div class="ui-cell ui-cell-sb height36">
                    <div class="dot">小计</div>
                    <div :style="compareColor(list.subtotal.status)" v-format-money="list.subtotal.value"></div>
                  </div>
                </div>
                <div class="mt-20 mb-20 table">
                  <div class="ui-cell ui-cell-sb th height36">
                    <div>总计</div>
                    <div></div>
                  </div>
                  <div class="ui-cell ui-cell-sb height36">
                    <div class="dot">成本小计</div>
                    <div v-format-money="costSubtotalTotal(item.processFeeList)"></div>
                  </div>
                  <div class="ui-cell ui-cell-sb height36">
                    <div class="dot">价格总计</div>
                    <div v-format-money="subtotalTotal(item.processFeeList)"></div>
                  </div>
                </div>
              <!--来源-->
              <div class="flex ui-cell-sb height36 e-gray-color">
                <div class="ui-cell">
                  <span class="mr-5">FROM</span>
                  <span class="b-gray-color" >{{item?.parameterFrom}}</span>
                  <span color="#1572F9" @click="toCustomerRules" v-if="item.parameterFrom==='加工费报价'">{{item.parameterFrom}}</span>
                </div>
                <div>
                  加工费利润率
                  <span :style="{color:processFeeProfitRate<25?'#FF3A35':''}" class="mr-5 ml-5">{{ processFeeProfitRate(subtotalTotal(item.processFeeList),costSubtotalTotal(item.processFeeList)) }}</span>
                  <span class="b-gray-color">%</span>
                </div>
              </div>
              <!--备注-->
              <div>
                <div class="height36 e-gray-color">调价备注（内部）</div>
                <div  class="fz-14 ml-60 b-gray-color">
                  <div>{{ item.remark }}</div>
                </div>
              </div>
              <HandlePeople :time="item.createdTime" :name="item.createdBy"></HandlePeople>
            </template>
          </LayoutModule>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
import LayoutModule from "@/components/layout/layoutModule.vue";
import {useDictStore} from "@/store";
import HandlePeople from '@components/handlePeople.vue'
import {getHttpProcessFeeOfferRecord} from "@/api/business";
import useCommon from "@/views/quotation/preview/module/useCommon";
import {roundFun} from "@/utils/utils";
import {compare,compareColor} from "@/utils/compare";
let {currency, offerId}=useCommon()
const {getDictValue} = useDictStore()
const emit = defineEmits(["handleIcon"])
const props = defineProps({
  logisticsOffers: {
    type: Object,
    default: () => {}
  }
})
const data = reactive({
  activeNames: [],
  historyList: []
})
//成本小计
const costSubtotalTotal = (data) => {
  return roundFun(data.reduce((cur, pre) => cur += pre.quantity.value * pre.cost.value, 0),4)
}

//价格小计
const subtotalTotal = (data) => {
  return roundFun(data.reduce((cur, pre) => cur += pre.quantity.value * pre.price.value, 0),4)
}

const openHistory = async (value) => {
  if (value.length) {
    getHttpProcessFeeOfferRecord(offerId).then((res) => {
      data.historyList = data.historyList=compare(res.data, 'workStage','processFeeList')
    })
  }
}

const processFeeProfitRate = (subtotalTotal,costSubtotalTotal,) => {
  let ret = (subtotalTotal - costSubtotalTotal) / costSubtotalTotal
  return roundFun((isNaN(ret) ? 0 : ret) * 100,4)
}
const toCustomerRules = () => {
  router.push({name: "customerRules", params: {id: props.customerDetail.customerId}})
}
</script>

<style scoped lang="scss">
.history {
  :deep(.el-collapse-item__wrap),:deep(.el-collapse-item__header) {
    padding-bottom: 0;
    border-bottom: 0;
  }
  :deep(.el-collapse){
    border-top: 0;
    border-bottom: 0;
  }

  .layout {
    padding: 0;
    margin-top: 0;
  }

  .layout:first-of-type {
    padding-top: 0;

  }

  .total {
    background: $a-gray;
    font-size: 14px;
    font-weight: bold;
    color: $b-gray;
    padding: 0 10px;
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

</style>
