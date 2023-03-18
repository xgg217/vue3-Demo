<template>
  <div class="project-table">
    <LayoutModule title="治具报价" class="layout-one">
      <template v-slot:right v-if="!isDetail">
        <AddIcon @handleIcon="open()"></AddIcon>
      </template>
      <template v-slot:main>
        <!--table-right__sticky-->
        <div class="table-border overflow-x-auto">
          <PxTable :cols="tableCol" @cellStyle="cellStyle" :data-source="tableData" v-if="tableData.length">
            <template #parentId="{row}">
              <div class="ui-cell" v-if="row.parentId!=='小计'">
                {{ getFixtureValue('fixtureDict', [row.parentId, row.childId]) }}
              </div>
              <div v-else>小计</div>
            </template>
            <template #unit="{row}">
              <div class="ui-cell" v-if="row.parentId!=='小计'">
                {{ getDictValue('unit', row.unitId) }}
              </div>
            </template>
            <template #price="{row}">
              <div class="ui-cell" v-if="row.parentId!=='小计'" v-format-money="row.price"></div>
              <div v-else v-format-money="row.price"></div>
            </template>
            <template #total="{row}">
              <div class="ui-cell" v-if="row.parentId!=='小计'" v-format-money="row.total"></div>
            </template>
            <template #action="{row,index}" v-if="!isDetail">
              <div class="ui-cell" v-if="row.parentId!=='小计'">
                <div color="#1572F9" class="mr-4" @click="open(row,index)">编辑</div>
                <div color="#FF3A35" @click="openDel(index)">删除</div>
              </div>
            </template>
          </PxTable>
        </div>
      </template>
    </LayoutModule>
    <!-- 规则弹窗-->
    <PxtPrompt @confirm="confirmButton" :title="rulePrompt.isEdit?'修改':'新增'+'治具报价'" @cancel="resetFields" :show-prompt="rulePrompt.status">
      <el-form class="rule-form custom-input" ref="ruleFormRef" :model="rulePrompt.ruleForm" :rules="ruleFormRules" :label-width="80" :hideRequiredAsterisk="true"
               label-position="left" size="small">
        <el-form-item label="治具名称" prop="parentId">
          <el-cascader separator="-" v-model="rulePrompt.ruleForm.parentId" :props="{ value:'id', label:'fixtureName', children:'childList' }" :options="fixtureDict"/>
        </el-form-item>
        <el-form-item label="单位" prop="unitId">
          <el-select v-model="rulePrompt.ruleForm.unitId" value-key="paramValue" placeholder="选择单位">
            <el-option :label="item.paramName" :value="item.paramValue" v-for="item in unit" :key="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="数量" prop="quantity">
          <el-input v-model.number="rulePrompt.ruleForm.quantity" maxlength="10" placeholder="正整数" inputmode="numeric"/>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="rulePrompt.ruleForm.price" maxlength="10" :formatter="(value)=>formatMoney(value)" :parser="(value)=>formatMoneyParser(value)" placeholder="4位小数，必须填" inputmode="decimal"/>
        </el-form-item>
        <el-form-item label="小计">
          <div v-if="rulePrompt.ruleForm.price && rulePrompt.ruleForm.quantity" v-format-money="roundFun(formatMoneyParser(rulePrompt.ruleForm.price) * rulePrompt.ruleForm.quantity,4) "></div>
        </el-form-item>
      </el-form>
    </PxtPrompt>
    <!-- 删除弹窗-->
    <PxtPrompt @confirm="del" title="" min-height="60px" v-model:show-prompt="rulePrompt.delStatus" class="delete">
      <div class="text-center fz-18 mt-10 font-bold">你确定要删除这笔数据吗？</div>
    </PxtPrompt>
  </div>
</template>

<script setup>
import LayoutModule from "@/components/layout/layoutModule.vue"
import PxTable from "@/components/table/table.vue"
import PxtPrompt from '@/components/dialog/prompt.vue'
import AddIcon from '@components/addIcon.vue'
import {fourNumberValidate, nineNumberValidate, requiredValidate} from "@/utils/validate";
import {useDictStore} from "@/store/dict";
import {formatMoney,formatMoneyParser,roundFun} from '@/utils/utils'
const {getDictValue, getFixtureValue} = useDictStore()
const emit = defineEmits(["del", "handelTable"])
const {unit, fixtureDict} = storeToRefs(useDictStore())
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
  // 弹窗状态
  rulePrompt: {
    isEdit: false,
    delStatus: false,
    status: false,
    ruleForm: {
      parentId: [],
      unitId: '',
      quantity: "",
      price: ""
    },
  },
  ruleFormRules: {
    price: [requiredValidate('请输入价格'), {validator: fourNumberValidate, trigger: 'blur'}],
    unitId: [requiredValidate('请选择单位')],
    parentId: [requiredValidate('请选择治具名称')],
    quantity: [requiredValidate('请输入数量'), {validator: nineNumberValidate, trigger: 'blur'}],
  }
})


const ruleFormRef = ref()
let {rulePrompt, ruleFormRules} = toRefs(data)
const tableCol = computed(() => {
  let table = [
    {label: "治具名称", key: "parentId", width: 100, scope: {customRender: "parentId"}},
    {label: "单位", key: "unitId", width: 70, scope: {customRender: "unit"}},
    {label: "数量", key: "quantity", width: 70,},
    {label: "价格", key: "price", width: 100,scope: {customRender: "price"}},
    {label: "小计", key: "total", width: 100, scope: {customRender: "total"}},
  ]
  if (!props.isDetail) table.push({align: "center", label: "操作", width: 90, scope: {customRender: "action"}})
  return table
})
const tableData = computed(() => {
  let total = 0
  if (props.tableDetail.length === 0) return []
  let data = props.tableDetail.map(item => {
    let {quantity, price} = item
    item.total = quantity * price
    total += item.total
    return item
  })
  // 添加价格总计行
  data.push({
    parentId: "小计",
    unitId: '',
    quantity: '',
    price: roundFun(total,4)
  })
  console.log(data)
  return data
})
const cellStyle = ({row, index}, callback) => {
  if (row.parentId === "小计") {
    callback({
      background: "#F9F9F9",
      fontSize: "14px",
      fontWeight: "bold"
    })
  } else {
    callback({})
  }
}

//打开规则修改弹窗
const open = (row, index) => {
  rulePrompt.value.status = !rulePrompt.value.status
  if (index >= 0) {
    rulePrompt.value.ruleForm = {...row}
    rulePrompt.value.ruleForm.parentId = row.childId ? [row.parentId, row.childId] : [row.parentId]
    rulePrompt.value.index = index
    rulePrompt.value.isEdit = true
  }
}

//打开删除弹窗
const openDel = (index) => {
  rulePrompt.value.delStatus = !rulePrompt.value.delStatus
  rulePrompt.value.index = index
}

//确认按钮
const confirmButton = () => {
  ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      let {isEdit, index, ruleForm} = rulePrompt.value
      let params={...ruleForm,price:formatMoneyParser(ruleForm.price)}
      if (isEdit) {
        emit('handelTable',params , index)
      } else {
        emit('handelTable', params)
      }
      resetFields()
    } else {
      console.log('error submit!', fields)
    }
  })
}

//重置
const resetFields = () => {
  ruleFormRef.value.resetFields()
  rulePrompt.value.ruleForm = {
    parentId: [],
    unitId: '',
    quantity: "",
    price: ""
  }
  rulePrompt.value.delStatus = false
  rulePrompt.value.status = false
  rulePrompt.value.isEdit = false
}

//删除数据
const del = () => {
  rulePrompt.value.delStatus = false
  emit('del', rulePrompt.value.index)
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
    :deep(.el-select),:deep(.el-cascader){
      width: 100%;
    }
  }
}
</style>
