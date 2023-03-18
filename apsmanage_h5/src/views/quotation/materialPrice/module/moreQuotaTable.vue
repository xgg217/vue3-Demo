<template>
  <div class="project-table">
    <LayoutModule title="有多笔”报价物料，系统默认取最低价报价" class="layout-one">
      <template v-slot:main>
        <div class="table-border overflow-x-auto">
          <PxTable :cols="tableCol" :data-source="tableDetailInfo">
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
            <template #arrow="{index}">
              <van-icon name="arrow" color="#1572F9" @click="openQuoteInfoPrompt(index)"/>
            </template>
          </PxTable>
        </div>
      </template>
    </LayoutModule>
    <!--    <RightIcon class="justify-end" text="加载更多" v-else @click="loadMore">-->
    <!--      <van-icon name="arrow-down" color="#1572F9"/>-->
    <!--    </RightIcon>-->
    <!-- 报价物料弹窗-->

  </div>
</template>

<script setup>
import LayoutModule from "@/components/layout/layoutModule.vue"
import PxTable from "@/components/table/table.vue"
import AddIcon from '@components/addIcon.vue'
import RightIcon from '@components/rightIcon.vue'
import {useBusinessStore} from "@/store";
const {cusId} = storeToRefs(useBusinessStore())
const emit = defineEmits(["loadMore", "back","openQuoteInfoPrompt"])
const offerId = inject('offerId')
const props = defineProps({
  tableDetail: {
    type: Array,
    default: () => []
  },
  isDetail: {
    type: Boolean,
    default: false
  },
})
let data = reactive({
  pricePrompt: false,
})
let tableDetailInfo = computed(() => {
  let arr = []
  props.tableDetail.forEach((item) => {
    arr.push({...item.materialOffer})
  })
  return arr
})

const tableCol = computed(() => {
  let table = [
    {label: "物料名称", key: "materialName", width: 90},
    {label: "参数/规格", key: "specModel",width: 90,scope: {customRender: "specModel"}},
    {label: "用量", key: "actualUsage", width: 60},
    {label: "价格", key: "internalOffer", width: 60,scope: {customRender: "internalOffer"}},
    {label: "小计", key: "offerAmount", width: 60,scope: {customRender: "offerAmount"}},
  ]
  if (!props.isDetail) table.push({align: "center", label: "", width: 50, scope: {customRender: "arrow"}})
  return table
})
const openQuoteInfoPrompt = (index) => {
  emit('openQuoteInfoPrompt',index,'more')
}

const loadMore = () => {
  emit('loadMore')
  // 加载更多
}
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

  //删除弹窗
  .delete {

  }
}
</style>
