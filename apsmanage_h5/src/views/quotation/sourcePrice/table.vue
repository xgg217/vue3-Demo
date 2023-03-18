<template>
  <div class="project-table">
    <LayoutModule :title="title" class="layout-one">
      <template v-slot:right>
        <div class="fz-12! height36 ui-nowrap e-gray-color">按BOM顺序显示 top5笔</div>
      </template>
      <template v-slot:main>
        <div class="table-border overflow-x-auto">
          <PxTable :cols="tableCol" :data-source="tableDetailInfo">
            <template #specModel="{row}">
              <el-tooltip class="box-item" effect="dark" :content="row.specModel" placement="top-start">
                <div class="ui-nowrap-3">{{ row.specModel }}</div>
              </el-tooltip>
            </template>
          </PxTable>
        </div>
      </template>
    </LayoutModule>
  </div>
</template>

<script setup>
import LayoutModule from "@/components/layout/layoutModule.vue"
import PxTable from "@/components/table/table.vue"
import {useDictStore} from "@/store/dict";
const {logistics_project, unit2, unit, customs_project} = useDictStore()
const props = defineProps({
  tableDetail: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: ''
  },
})

let tableCol = [
  {label: "物料名称", key: "materialName", width: 90},
  {label: "参数/规格", key: "specModel",width: 90,scope: {customRender: "specModel"}},
  {label: "用量", key: "actualUsage", width: 60},
  {label: "价格", key: "internalOffer", width: 60},
  {label: "小计", key: "offerAmount", width: 60},
]

let tableDetailInfo = computed(() => {
  return props.tableDetail.length >= 5 ? props.tableDetail.slice(0, 5) : props.tableDetail
})

</script>

<style scoped lang="scss">
.project-table {
  .layout {
    margin-top: 0;
    padding: 0;
  }

  //规则弹窗
  .rule-form {
    margin-top: 20px;

    :deep(.el-form-item__label) {
      color: #a2a2a2;
      font-size: 14px;
    }
  }

  :deep(.title) {
    font-size: 15px;
  }
}
</style>
