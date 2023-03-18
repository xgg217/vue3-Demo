<template>
  <div class="project-table">
    <LayoutModule title="物料报价" class="layout-one">
      <template v-slot:right v-if="tableDetail.length">
        <div class="fz-12! height36 e-gray-color" >按小计排序，显示top5，其余归入 Others 行</div>
      </template>
      <template v-slot:main v-if="tableDetail.length && tableDetail?.[0]?.materialName!=='Others'">
        <div class="table-border overflow-x-auto">
          <PxTable :cols="tableCol" :data-source="tableDetail">
            <template #specModel="{row}">
              <el-tooltip class="box-item" effect="dark" :content="row.specModel" placement="top-start">
                <div class="ui-nowrap-3">{{ row.specModel }}</div>
              </el-tooltip>
            </template>
            <template #internalOffer="{row}">
              <div class="ui-nowrap-3" v-format-money="row.internalOffer"></div>
            </template>
            <template #offerAmount="{row}">
              <div class="ui-nowrap-3" v-format-money="row.offerAmount"></div>
            </template>
          </PxTable>
          <div class="total flex ui-cell-sb height36">
            <div>小计</div>
            <div>{{ currency }}</div>
            <div v-format-money="total"></div>
          </div>
        </div>
        <slot></slot>
      </template>
    </LayoutModule>
  </div>
</template>

<script setup>
import LayoutModule from "@/components/layout/layoutModule.vue"
import PxTable from "@/components/table/table.vue"
import {useDictStore} from "@/store/dict";
import useCommon from "./useCommon";
import {roundFun} from "@/utils/utils";
const {logistics_project, unit2, unit, customs_project} = useDictStore()
const {currency} = useCommon(props.tableDetail)
const props = defineProps({
  tableDetail: {
    type: Array,
    default: () => []
  },
})

let tableCol = [
  {label: "物料名称", key: "materialName", width: 90},
  {label: "参数/规格", key: "specModel",width: 90,scope: {customRender: "specModel"}},
  {label: "用量", key: "actualUsage", width: 60},
  {label: "价格", key: "internalOffer", width: 60,scope: {customRender: "internalOffer"}},
  {label: "小计", key: "offerAmount", width: 60,scope: {customRender: "offerAmount"}},

]
let total = computed(() => {
  let total=props.tableDetail.reduce((cur, pre) => {
    return cur += pre.offerAmount
  }, 0)
  return roundFun(total,4)
})
</script>

<style scoped lang="scss">
.project-table {
  .layout {
    margin-top: 0;
    padding: 0;
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
