<template>
  <div class="project-table">
    <LayoutModule title="仅一份报价物料" class="layout-one">
      <template v-slot:main>
        <div class="table-border overflow-x-auto" style="max-height: 300px" v-if="tableDetail.length">
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
            <template #arrow="{index}">
              <van-icon name="arrow" color="#1572F9" @click="openQuoteInfoPrompt(index)"/>
            </template>
          </PxTable>
        </div>
      </template>
    </LayoutModule>
    <RightIcon class="justify-end" text="退回 重新报价" @click="pricePrompt=true" v-if="!isDetail"></RightIcon>
    <!-- 报价物料弹窗-->
    <PxtPrompt @confirm="confirmButton" @cancel="pricePrompt = false" title="仅一份报价物料" :show-prompt="pricePrompt">
      <el-form class="rule-form custom-input" ref="ruleFormRef" :model="ruleForm" :label-width="120" :hideRequiredAsterisk="true" label-position="left"
               size="small">
        <el-form-item label="Sourcing人名" prop="sourcingNameList">
          <el-select v-model="ruleForm.sourcingNameList" multiple collapse-tags value-key="value" placeholder="不选则推送全部">
            <el-option :label="item.name" :value="item.value" v-for="item in sourcingDict" :key="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="退回原因" prop="adoptReason">
          <el-select v-model="ruleForm.adoptReason" value-key="value" placeholder="选择物料 允许多选">
            <el-option :label="item.name" :value="item.value" v-for="item in returnReason" :key="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="ruleForm.remarks" placeholder="备注"/>
        </el-form-item>
      </el-form>
    </PxtPrompt>
    <QuoteInfo v-model:popupShow="quoteInfoPrompt" :quoteInfoData="quoteInfoData" :quoteIndex="quoteInfoIndex"></QuoteInfo>
  </div>
</template>

<script setup>
import LayoutModule from "@/components/layout/layoutModule.vue"
import PxTable from "@/components/table/table.vue"
import PxtPrompt from '@/components/dialog/prompt.vue'
import {useDictStore} from "@/store/dict";
import RightIcon from '@components/rightIcon.vue'
import QuoteInfo from './quoteInfo.vue'
import {putHttpReQuote} from "@/api/business";
const {sourcingDict, unit, returnReason} = storeToRefs(useDictStore())
const emit = defineEmits(["back","openQuoteInfoPrompt"])
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

const tableCol = computed(() => {
  let table = [
    {label: "物料名称", key: "materialName", width: 90},
    {label: "参数/规格", key: "specModel",width: 90,scope: {customRender: "specModel"}},
    {label: "用量", key: "actualUsage", width: 60},
    {label: "价格", key: "internalOffer", width: 60,scope: {customRender: "internalOffer"}},
    {label: "小计", key: "offerAmount", width: 60,scope: {customRender: "offerAmount"}},
  ]
  if (!props.isDetail) table.push({align: "center", label: "", width: 40, scope: {customRender: "arrow"}})
  return table
})
let data = reactive({
  ruleFormRef: '',
  // 弹窗状态
  pricePrompt: false,
  quoteInfoPrompt: false,
  quoteInfoData: {},
  quoteInfoIndex: 0,
  ruleForm: {
    adoptReason: 1,
    sourcingNameList: [],
    remark: ''
  },
})
let {pricePrompt, ruleFormRef, ruleForm, quoteInfoPrompt, quoteInfoData, quoteInfoIndex} = toRefs(data)

//打开选择报价弹窗
const openQuoteInfoPrompt = (index) => {
  emit('openQuoteInfoPrompt',index,'one')
}

//确认按钮
const confirmButton = () => {
  let params={
    ...ruleForm.value, customerOfferId: offerId
  }
  if(!ruleForm.value.sourcingNameList.length) {
    params.sourcingNameList=sourcingDict.value.map((item)=>item.value)
  }
  putHttpReQuote(params).then(() => {
    pricePrompt.value = false
    emit('back')
  })
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
