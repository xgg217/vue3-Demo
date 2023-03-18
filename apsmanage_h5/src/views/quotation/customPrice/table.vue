<template>
  <div class="project-table">
    <LayoutModule title="报关费" class="layout-one">
      <template v-slot:right v-if="!isDetail">
        <AddIcon @handleIcon="rulePrompt.status=true"></AddIcon>
      </template>
      <template v-slot:main>
        <div class="table-border w-full">
          <PxTable :cols="tableCol" :data-source="tableDetail" class="w-full" v-if="tableDetail.length">
            <template #projectId="{row}">
              <div>{{ getDictValue('customs_project', row.projectId) }}</div>
            </template>
            <template #customsCost="{row}">
              <div v-format-money="row.customsCost"></div>
            </template>
            <template #unitId="{row}">
              {{ getDictValue('unit', row.unitId) }}
            </template>
            <template #action="{index}" v-if="!isDetail">
              <div color="#FF3A35" @click="openDel(index)">删除</div>
            </template>
          </PxTable>
        </div>
      </template>
    </LayoutModule>
    <!-- 规则弹窗-->
    <PxtPrompt @confirm="confirmButton" title="报关费" @cancel="resetFields" :show-prompt="rulePrompt.status">
      <el-form class="rule-form custom-input" ref="ruleFormRef" :model="ruleForm" :rules="ruleFormRules" :label-width="100" :hideRequiredAsterisk="true" label-position="left"
               size="small">
        <el-form-item label="报关项目" prop="projectId">
          <el-select v-model="ruleForm.projectId" value-key="paramValue" placeholder="选择报关项目">
            <el-option :label="item.paramName" :value="item.paramValue" v-for="item in customs_project" :key="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="价格" prop="customsCost">
          <el-input v-model="ruleForm.customsCost" placeholder="4位小数，必须填写"  inputmode="numeric" :formatter="(value)=>formatMoney(value)" :parser="(value)=>formatMoneyParser(value)"/>
        </el-form-item>
        <el-form-item label="单位" prop="unitId">
          <el-select v-model="ruleForm.unitId" value-key="paramValue" placeholder="选择单位">
            <el-option :label="item.paramName" :value="item.paramValue" v-for="item in unit2" :key="item.value"/>
          </el-select>
        </el-form-item>
      </el-form>
    </PxtPrompt>
    <!-- 删除弹窗-->
    <PxtPrompt @confirm="del" title="" @cancel="resetFields" min-height="60px" v-model:show-prompt="rulePrompt.delStatus" class="delete">
      <div class="text-center fz-18 mt-10 font-bold">你确定要删除这笔数据吗？</div>
    </PxtPrompt>
  </div>
</template>

<script setup>
import LayoutModule from "@/components/layout/layoutModule.vue"
import PxTable from "@/components/table/table.vue"
import PxtPrompt from '@/components/dialog/prompt.vue'
import AddIcon from '@components/addIcon.vue'
import {fourNumberValidate, projectIdValidate, requiredValidate} from "@/utils/validate";
import {useDictStore} from "@/store/dict";
import {deepClone} from "@/utils/utils";
import {formatMoney,formatMoneyParser} from '@/utils/utils'
const {getDictValue} = useDictStore()
const {unit2, customs_project} = storeToRefs(useDictStore())
const tableCol = computed(() => {
  let table = [
    {label: "报关项目", key: "projectId", scope: {customRender: "projectId"}},
    {label: "价格", key: "customsCost",scope: {customRender: "customsCost"}},
    {label: "单位", key: "unitId", scope: {customRender: "unitId"}},
  ]
  if (!props.isDetail) table.push({align: "center", label: "操作", scope: {customRender: "action"}},)
  return table
})
const emit = defineEmits(["handelTable"])
const props = defineProps({
  tableDetail: {
    type: Array,
    default: () => []
  },
  isDetail: {
    type: Boolean,
    default: false
  }
})
let data = reactive({
  ruleFormRef: '',
  // 弹窗状态
  rulePrompt: {
    delStatus: false,
    index: '',
    status: false,
  },
  ruleForm: {
    projectId: '',//报关项目
    unitId: '',  //单位
    customsCost: '', //customsCost 4位小数
  },
  ruleFormRules: {
    projectId: [requiredValidate('请选择报关项目'), {
      validator: (rule, value, callback) => {
        projectIdValidate(rule, value, callback, props.tableDetail, "projectId")
      }, trigger: 'change'
    }],
    unitId: [requiredValidate('请选择单位类型')],
    customsCost: [requiredValidate('请输入数量'), {validator: fourNumberValidate, trigger: 'blur'}],
  }
})
let {rulePrompt, ruleForm, ruleFormRules, ruleFormRef} = toRefs(data)

//打开删除弹窗
const openDel = (index) => {
  rulePrompt.value.delStatus = !rulePrompt.value.delStatus
  rulePrompt.value.index = index
}

//确认按钮
const confirmButton = () => {
  ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      emit('handelTable', undefined, {...ruleForm.value,customsCost:formatMoneyParser(ruleForm.value.customsCost)})
      resetFields()
    }
  })
}

//重置
const resetFields = () => {
  ruleFormRef.value && ruleFormRef.value?.resetFields()
  ruleForm.value = deepClone({
    projectId: '',
    unitId: '',
    customsCost: '',
  })
  rulePrompt.value.delStatus = false
  rulePrompt.value.status = false
}

//删除数据
const del = () => {
  emit('handelTable', rulePrompt.value.index)
  resetFields()
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
    :deep(.el-select){
      width: 100%;
    }
  }
}
</style>
