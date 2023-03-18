<template>
  <div class="project-table">
    <LayoutModule title="关务报价" class="layout-one">
      <template v-slot:main v-if="tableDetail.length">
        <div class="table-border">
          <PxTable :cols="tableCol" :data-source="tableDetail">
            <template #projectId="{row}">
              <div>{{ getDictValue('customs_project', row.projectId) }}</div>
            </template>
            <template #customsCost="{row}">
              <div v-format-money="row.customsCost"></div>
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
        <RightIcon v-if="!isDetail" class="justify-end" text="退回  重新报价" @click="()=>emit('openBackPrice',2,detail?.id)"></RightIcon>
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

const {unit2, unit, customs_project, getDictValue} = useDictStore()
const props = defineProps({
  showBack: {
    type: Boolean,
    default: true
  },
  detail: {
    type: Object,
    default: () => {
    }
  },
})
const emit = defineEmits(["openBackPrice"])
const {currency, isDetail} = useCommon(props.tableDetail)
let tableCol = [
  {label: "关务项目", key: "projectId", scope: {customRender: "projectId"}},
  {label: "价格", key: "customsCost", scope: {customRender: "customsCost"}},
  {label: "单位", key: "unitId", scope: {customRender: "unitId"}},
]
let total = computed(() => {
  let total=tableDetail.value.reduce((cur, pre) => {
    return cur += pre.customsCost
  }, 0)
  return roundFun(total,4)
})
let tableDetail = computed(() => {
  let customsOffers = props.detail?.customsOffer
  if (customsOffers && customsOffers.length) {
    return JSON.parse(customsOffers)
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
