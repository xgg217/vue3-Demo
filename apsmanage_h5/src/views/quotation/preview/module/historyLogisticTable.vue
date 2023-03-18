<template>
  <!--工程报价历史修改记录-->
  <div class="history">
    <el-collapse v-model="data.activeNames" @change="openHistory">
      <el-collapse-item name="1">
        <template v-slot:title>
          <div class="ui-cell ui-cell-sb wh100">
            <div >
              <BackText v-if="customerDetail?.adoptFlag == 1"></BackText>
            </div>
            <div class="pr-10 fz-14 shrink-0" color="#0076F6">修改记录</div>
          </div>
        </template>
        <div v-for="(item,index) in data.historyList" :key="index">
          <LayoutModule title="物流报价" class="layout-one">
            <template v-slot:main>
              <div class="table-border">
                <PxTable style="width: 100%;" :cols="tableCol" :data-source="item.logisticsOffer">
                  <template #projectId="{row}">
                    <div :style="compareColor(row.projectId.status)">{{ getDictValue('logistics_project', row.projectId.value) }}</div>
                  </template>
                  <template #logisticsCost="{row}">
                    <div :style="compareColor(row.logisticsCost.status)" v-format-money="row.logisticsCost.value"></div>
                  </template>
                  <template #unitId="{row}">
                    <div :style="compareColor(row.unitId.status)">{{ getDictValue('unit', row.unitId.value) }}</div>
                  </template>
                </PxTable>
              </div>
              <div class="total flex ui-cell-sb height36">
                <div>小计</div>
                <div>{{currency}}</div>
                <div v-format-money="total(item.logisticsOffer,'logisticsCost')"></div>
              </div>
              <HandlePeople :time="item.createdTime" :name="item.createdBy"></HandlePeople>
              <BackWhy v-if="item.adoptFlag==1" :text1="getDictValue2('returnReason',item.adoptReason)" :text2="item.remarks"></BackWhy>
              <HandlePeople v-if="item.adoptFlag==1" :time="item.updateTime" :name="item.updateBy"></HandlePeople>
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
import BackText from './backText.vue'
import BackWhy from './backWhy.vue'
import {getHttpLogisticsOfferHistory} from "@/api/business";
import PxTable from "@/components/table/table.vue"
import useCommon from "@/views/quotation/preview/module/useCommon";
import {compare,compareColor} from '@/utils/compare'
let {currency,offerId,total}=useCommon()
const {getDictValue,getDictValue2} = useDictStore()
const props = defineProps({
  logisticsOffers: {
    type: Object,
    default: () => {}
  }
})
let tableCol = [
  {label: "物流项目", key: "projectId", scope: {customRender: "projectId"}},
  {label: "数量", key: "logisticsCost",scope: {customRender: "logisticsCost"}},
  {label: "单位", key: "unitId", scope: {customRender: "unitId"}},
]

const emit = defineEmits(["handleIcon"])

const data = reactive({
  activeNames: [],
  historyList: []
})

const openHistory = async (value) => {
  if (value.length) {
    getHttpLogisticsOfferHistory(offerId).then((res) => {
      res.data.forEach((item)=>{
        item.logisticsOffer=JSON.parse(item.logisticsOffer)
      })
      data.historyList = data.historyList=compare(res.data, 'projectId','logisticsOffer')
    })
  }
}

</script>

<style scoped lang="scss">
.history {
  margin-top: 12px;

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


</style>
