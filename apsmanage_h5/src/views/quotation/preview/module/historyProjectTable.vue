<template>
  <!--工程报价历史修改记录-->
  <div class="history">
    <el-collapse v-model="data.activeNames" @change="openHistory">
      <el-collapse-item name="1">
        <template v-slot:title>
          <div class="ui-cell ui-cell-sb wh100">
            <div >
              <BackText v-if="projectOffer?.adoptFlag == 1"></BackText>
            </div>
            <div class="pr-10 fz-14 shrink-0" color="#0076F6">修改记录</div>
          </div>
        </template>
        <div v-for="(item,index) in data.historyList" :key="index">
          <LayoutModule title="工程报价" class="layout-one">
            <template v-slot:main>
              <div class="height36 ui-cell">
                <div  class="mr-20 e-gray-color">开机费</div>
                <div class="b-gray-color">{{ item?.startupFee }}/次</div>
              </div>
              <div class="height36 e-gray-color">治具费</div>
              <div class="table-border">
                <PxTable :cols="tableCol" :data-source="item.offerFixtureFees">
                  <template #parentId="{row}">
                   <div :style="compareColor(row.projectId.status)"> {{ row.projectId.value }}</div>
                  </template>
                  <template #unit="{row}">
                    <div :style="compareColor(row.unitId.status)">{{ row.unitId.value}}</div>
                  </template>
                  <template #quantity="{row}">
                    <div :style="compareColor(row.quantity.status)"> {{ row.quantity.value }}</div>
                  </template>
                  <template #price="{row}">
                    <div :style="compareColor(row.price.status)" v-format-money="row.price.value"></div>
                  </template>
                  <template #total="{row}">
                    <div :style="compareColor(row.total.status)" v-format-money="row.total.value"></div>
                  </template>
                </PxTable>
              </div>
              <div class="total flex ui-cell-sb height36">
                <div>小计</div>
                <div>{{currency}}</div>
                <div v-format-money="total(item.offerFixtureFees,'total')"></div>
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
import { getHttpProjectOfferHistory} from "@/api/business";
import PxTable from "@/components/table/table.vue"
import BackWhy from './backWhy.vue'
import useCommon from "@/views/quotation/preview/module/useCommon";
import {roundFun} from "@/utils/utils";
import {compare,compareColor} from '@/utils/compare'
const {getDictValue,getDictValue2,getFixtureValue} = useDictStore()
let {currency,offerId,total}=useCommon()
const props = defineProps({
  projectOffer: {
    type: Object,
    default: () => {}
  }
})
let tableCol = [
  {label: "治具名称", key: "parentId", width: 90, scope: {customRender: "parentId"}},
  {label: "单位", key: "unitId",width: 60, scope: {customRender: "unit"}},
  {label: "数量", key: "quantity",width: 60,scope: {customRender: "quantity"}},
  {label: "价格", key: "price",scope: {customRender: "price"}},
  {label: "小计", key: "total", scope: {customRender: "total"}},
]

const emit = defineEmits(["handleIcon"])

const data = reactive({
  activeNames: [],
  historyList: []
})

const openHistory = async (value) => {
  if (value.length) {
    getHttpProjectOfferHistory(offerId).then((res) => {
      res.data.forEach(item=>{
        item.offerFixtureFees.forEach((subItem)=>{
          subItem.total=roundFun((subItem.quantity*subItem.price),4)
          //组合一个projectId，方便compare校验
          subItem.projectId=getFixtureValue('fixtureDict',[subItem.parentId,subItem.childId])
          subItem.unitId=getDictValue('unit', subItem.unitId)
        })
      })
      //这个数据需要自己倒叙一下
      data.historyList =  compare( res.data.reverse(), 'projectId', 'offerFixtureFees')
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
