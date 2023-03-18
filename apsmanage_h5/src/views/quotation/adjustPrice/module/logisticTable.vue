<template>
  <div class="project-table">
    <LayoutModule title="物流报价" class="layout-one">
      <template v-slot:main v-if="tableDetail.length">
        <div class="table-border">
          <PxTable :cols="tableCol" :data-source="tableDetail">
            <template #projectId="{row}">
              <div>{{ getDictValue('logistics_project', row.projectId) }}</div>
            </template>
            <template #logisticsCost="{row}">
              <div v-format-money="row.logisticsCost"></div>
            </template>
            <template #unitId="{row}">
              {{ getDictValue('unit', row.unitId) }}
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
        <RightIcon v-if="!isDetail" class="justify-end" text="退回  重新报价" @click="()=>emit('openBackPrice',3,detail?.id)"></RightIcon>
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
import useCommon from "./useCommon";
import {roundFun} from "@/utils/utils";
const {currency, isDetail} = useCommon()
const emit = defineEmits(["openBackPrice"])
const props = defineProps({
  detail: {
    type: Object,
    default: () => {
    }
  },
})
const {logistics_project, unit2, unit, getDictValue} = useDictStore()

let tableCol = [
  {label: "物流项目", key: "projectId", scope: {customRender: "projectId"}},
  {label: "数量", key: "logisticsCost", scope: {customRender: "logisticsCost"}},
  {label: "单位", key: "unitId", scope: {customRender: "unitId"}},
]

let total = computed(() => {
  let total=tableDetail.value.reduce((cur, pre) => {
    return cur += pre.logisticsCost
  }, 0)
  return roundFun(total,4)
})

let tableDetail = computed(() => {
  let logisticsOffer = props.detail?.logisticsOffer
  if (logisticsOffer && logisticsOffer.length) {
    return JSON.parse(logisticsOffer)
  }
  return []
})

</script>

<style scoped lang="scss">
.project-table {
  .layout {
    margin-top: 0;
    padding: 0;
  }

  //删除弹窗
  .total {
    background: $a-gray;
    font-size: 14px;
    font-weight: bold;
    color: $b-gray;
    padding: 0 10px;
  }
}
</style>
