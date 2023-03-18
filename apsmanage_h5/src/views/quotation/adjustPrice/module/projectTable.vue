<template>
  <div class="project-table">
    <LayoutModule title="工程报价" class="layout-one">
      <template v-slot:main v-if="tableDetail.length">
        <div class="height36 ui-cell">
          <div class="mr-20 e-gray-color">开机费</div>
          <div class="b-gray-color" v-if="detail?.startupFee">{{ detail?.startupFee }}/次</div>
          <div class="b-gray-color" v-else>无</div>
        </div>
        <div class="height36 e-gray-color">治具费</div>
        <div class="table-border">
          <PxTable :cols="tableCol" :data-source="tableDetail">
            <template #parentId="{row}">
              {{ getFixtureValue('fixtureDict', [row.parentId, row.childId]) }}
            </template>
            <template #unit="{row}">
              {{ getDictValue('unit', row.unitId) }}
            </template>
            <template #price="{row}">
              <div v-format-money="row.price"></div>
            </template>
            <template #total="{row}">
              <div v-format-money="roundFun(row.quantity * row.price,4)"></div>
            </template>
          </PxTable>
        </div>
        <div class="total flex ui-cell-sb height36">
          <div>小计</div>
          <div>{{ currency }}</div>
          <div v-format-money="total"></div>
        </div>
        <HandlePeople :time="detail?.createdTime" :name="detail?.createdBy"></HandlePeople>
        <slot></slot>
        <RightIcon v-if="!isDetail" class="justify-end" text="退回  重新报价" @click="()=>emit('openBackPrice',1,detail?.id)"></RightIcon>
      </template>
    </LayoutModule>
  </div>
</template>

<script setup>
import LayoutModule from "@/components/layout/layoutModule.vue"
import PxTable from "@/components/table/table.vue"
import {useDictStore} from "@/store/dict";
import HandlePeople from '@components/handlePeople.vue'
import RightIcon from '@components/rightIcon.vue'
import useCommon from "@/views/quotation/adjustPrice/module/useCommon";
import {roundFun} from "@/utils/utils";

const {logistics_project, unit2, unit, customs_project, getFixtureValue, getDictValue} = useDictStore()
const props = defineProps({
  detail: {
    type: Object,
    default: () => {
    }
  },
})
const {currency, isDetail} = useCommon(props.detail)
const emit = defineEmits(["openBackPrice"])
let tableCol = [
  {label: "治具名称", key: "parentId", width: 90, scope: {customRender: "parentId"}},
  {label: "单位", key: "unitId", width: 60, scope: {customRender: "unit"}},
  {label: "数量", key: "quantity", width: 60,},
  {label: "价格", key: "price", width: 60, scope: {customRender: "price"}},
  {label: "小计", key: "total", scope: {customRender: "total"}, width: 60},
]

let tableDetail = computed(() => {
  return props.detail?.offerFixtureFees || []
})
let total = computed(() => {
  let total = tableDetail.value.reduce((cur, pre) => {
    return cur += pre.quantity * pre.price
  }, 0)
  return roundFun(total, 4)
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
