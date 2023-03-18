<template>
  <div class="project-table">
    <LayoutModule title="没有报价物料" class="layout-one">
      <template v-slot:main>
        <!-- table-right__sticky-->
        <div class="table-border  overflow-x-auto" style="max-height: 300px" v-if="tableDetail.length">
          <PxTable cla @headerCellStyle="headerCellStyle" :cols="tableCol" :data-source="tableDetail">
            <template #specModel="{row}">
              <el-tooltip class="box-item" effect="dark" :content="row.specModel" placement="top-start">
                <div class="ui-nowrap-3">{{ row.specModel }}</div>
              </el-tooltip>
            </template>
            <template #action="{row}">
              <div class="b-gray-color" v-if="row.isOffer===0">Y</div>
              <div color="#FF3A35" v-else>N</div>
            </template>
          </PxTable>
        </div>
      </template>
    </LayoutModule>
    <RightIcon class="justify-end" @click="open"></RightIcon>
    <!-- 规则弹窗-->
    <PxtPrompt @confirm="confirmButton" @cancel="open" title="没有报价物料" :show-prompt="rulePromptStatus">
      <el-form class="rule-form custom-input" ref="ruleFormRef" :model="ruleForm" :rules="ruleFormRules" :label-width="100" :hideRequiredAsterisk="true" label-position="left"
               size="small">
        <el-form-item label="Sourcing人名" prop="sourcingNameList">
          <el-select v-model="ruleForm.sourcingNameList" multiple collapse-tags value-key="value" placeholder="不选则推送全部">
            <el-option :label="item.name" :value="item.value" v-for="item in sourcingDict" :key="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="选择物料" prop="materialOffersList">
          <el-select multiple collapse-tags v-model="ruleForm.materialOffersList" value-key="value" placeholder="选择物料 允许多选">
            <el-option :label="item.name" :value="item.value" v-for="item in materialDict" :key="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="ruleForm.remark" placeholder="备注"/>
        </el-form-item>
      </el-form>
    </PxtPrompt>
  </div>
</template>

<script setup>
import LayoutModule from "@/components/layout/layoutModule.vue"
import PxTable from "@/components/table/table.vue"
import PxtPrompt from '@/components/dialog/prompt.vue'
import {requiredValidate} from "@/utils/validate";
import {useDictStore} from "@/store/dict";
import RightIcon from '@components/rightIcon.vue'
import {getHttpUrgeOfferMaterial} from "@/api/business";

const {sourcingDict} = storeToRefs(useDictStore())
const emit = defineEmits(["handleHurry"])
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
  materialDict: {
    type: Array,
    default: () => []
  },
})
let tableCol = [
  {label: "物料名称", key: "materialName", width: 90},
  {label: "参数/规格", key: "specModel",width: 90,scope: {customRender: "specModel"}},
  {label: "用量", key: "actualUsage", width: 60},
  {label: "物料类型", key: "subType", width: 90},
  {align: "center", label: "同BOM层是否有报价", width: 100, scope: {customRender: "action"}},
]
let data = reactive({
  // 弹窗状态
  rulePromptStatus: false,
  ruleFormRef: '',
  ruleForm: {
    sourcingNameList: [],
    materialOffersList: [],
    remark: ''
  },
  ruleFormRules: {
    materialOffersList: [requiredValidate('请选择物料')],
  }
})
let {rulePromptStatus, ruleForm, ruleFormRules, ruleFormRef} = toRefs(data)

const headerCellStyle = (callback) => {
  callback({
    height: '60px'
  })
}
//打开规则修改弹窗
const open = () => {
  rulePromptStatus.value = !rulePromptStatus.value
}

//确认按钮
const confirmButton = () => {
  ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      let params={
        ...ruleForm.value, customerOfferId: offerId
      }
      if(!ruleForm.value.sourcingNameList.length){
        params.sourcingNameList=sourcingDict.value.map((item)=>item.value)
      }
      getHttpUrgeOfferMaterial(params).then(() => {
        open()
      })

    }
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
