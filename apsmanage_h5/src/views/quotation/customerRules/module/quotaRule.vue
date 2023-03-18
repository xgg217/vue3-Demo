<template>
  <!--规则修改弹窗-->
  <PxtPrompt @confirm="confirmButton" :title="title" @cancel="cancelButton">
    <!--基础报价规则-->
    <el-form class="form" ref="ruleFormRef" :model="ruleForm" :rules="rules" :hideRequiredAsterisk="true" label-position="left" size="small" v-if="type===1">
      <el-form-item label="工序" prop="workStage" >
        <!--//修改时，工序不允许修改-->
        <el-input v-model="ruleForm.workStage" placeholder="请输入工序" :disabled="isEdit"/>
      </el-form-item>
      <el-form-item label="单位" prop="unitId">
        <el-select v-model="ruleForm.unitId" value-key="paramValue" placeholder="请选择单位">
          <el-option :label="item.paramName" :value="item.paramValue" v-for="item in unit" :key="item.value"/>
        </el-select>
      </el-form-item>
      <el-row>
        <el-col :span="13">
          <el-form-item label="数量" prop="minQuantity">
            <el-input v-model="ruleForm.minQuantity" placeholder="数字" type="number" inputmode="numeric" />
          </el-form-item>
        </el-col>
        <el-col :span="2" class="text-center" style="line-height: 30PX;color: #999999">
          —
        </el-col>
        <el-col :span="9">
          <el-form-item prop="maxQuantity" label-width="0">
            <el-input v-model="ruleForm.maxQuantity" placeholder="数字" type="number" inputmode="numeric"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="价格" prop="price">
        <el-input v-model="ruleForm.price" placeholder="4位小数" inputmode="decimal" :formatter="(value)=>formatMoney(value)" :parser="(value)=>formatMoneyParser(value)"/>
      </el-form-item>
    </el-form>
    <!-- MOQ规则-->
    <el-form class="form" ref="ruleFormRef" :model="ruleForm" :rules="rules" :hideRequiredAsterisk="true" label-position="left" size="small" v-if="type===2">
      <el-row>
        <el-col :span="13">
          <el-form-item label="数量" prop="minQuantity">
            <el-input v-model="ruleForm.minQuantity" placeholder="数字" type="number" inputmode="numeric"/>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="text-center" style="line-height: 30PX;color: #999999">
          —
        </el-col>
        <el-col :span="9">
          <el-form-item prop="maxQuantity" label-width="0">
            <el-input v-model="ruleForm.maxQuantity" placeholder="数字" type="number" inputmode="numeric"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="倍数" prop="multiple">
        <el-input v-model="ruleForm.multiple" placeholder="4位小数" type="number" inputmode="decimal"/>
      </el-form-item>
    </el-form>
    <!--物料报价规则-->
    <el-form class="form" ref="ruleFormRef" :model="ruleForm" :rules="rules" :hideRequiredAsterisk="true" :label-width="90" label-position="left" size="small" v-if="type===3">
      <el-form-item label="物流项目" prop="projectId">
        <el-select v-model="ruleForm.projectId" value-key="paramValue" placeholder="请选择物流项目">
          <el-option :label="item.paramName" :value="item.paramValue" v-for="item in logistics_project" :key="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="价格" prop="quantity">
        <el-input v-model="ruleForm.quantity" placeholder="4位小数"  inputmode="decimal" :formatter="(value)=>formatMoney(value)" :parser="(value)=>formatMoneyParser(value)"/>
      </el-form-item>
      <el-form-item label="单位" prop="unitId">
        <el-select v-model="ruleForm.unitId" value-key="paramValue" placeholder="请选择单位">
          <el-option :label="item.paramName" :value="item.paramValue" v-for="item in unit2" :key="item.value"/>
        </el-select>
      </el-form-item>
    </el-form>
    <!-- 关务报价-->
    <el-form class="form" ref="ruleFormRef" :model="ruleForm" :rules="rules" :hideRequiredAsterisk="true" :label-width="90" label-position="left" size="small" v-if="type===4">
      <el-form-item label="报关项目" prop="projectId">
        <el-select v-model="ruleForm.projectId" value-key="paramValue" placeholder="请选择报关项目">
          <el-option :label="item.paramName" :value="item.paramValue" v-for="item in customs_project" :key="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="价格" prop="quantity">
        <el-input v-model="ruleForm.quantity" placeholder="4位小数" :formatter="(value)=>formatMoney(value)" :parser="(value)=>formatMoneyParser(value)" inputmode="decimal"/>
      </el-form-item>
      <el-form-item label="单位" prop="unitId">
        <el-select v-model="ruleForm.unitId" value-key="paramValue" placeholder="请选择单位">
          <el-option :label="item.paramName" :value="item.paramValue" v-for="item in unit2" :key="item.value"/>
        </el-select>
      </el-form-item>
    </el-form>
    <!-- 返工单价-->
    <el-form class="form" ref="ruleFormRef" :model="ruleForm" :rules="rules" :hideRequiredAsterisk="true"  label-position="left" size="small" v-if="type===5">
      <el-form-item label="单位" prop="unitId">
        <el-select v-model="ruleForm.unitId" value-key="paramValue" placeholder="请选择单位">
          <el-option :label="item.paramName" :value="item.paramValue" v-for="item in unit" :key="item.value"/>
        </el-select>
      </el-form-item>
      <el-row>
        <el-col :span="13">
          <el-form-item label="数量" prop="minQuantity">
            <el-input v-model="ruleForm.minQuantity" placeholder="数字" type="number" inputmode="numeric"/>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="text-center" style="line-height: 30PX;color: #999999">
          —
        </el-col>
        <el-col :span="9">
          <el-form-item prop="maxQuantity" label-width="0">
            <el-input v-model="ruleForm.maxQuantity" placeholder="数字" type="number" inputmode="numeric"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="单价" prop="unitPrice">
        <el-input v-model="ruleForm.unitPrice" placeholder="4位小数" :formatter="(value)=>formatMoney(value)" :parser="(value)=>formatMoneyParser(value)"  inputmode="decimal"/>
      </el-form-item>
    </el-form>
  </PxtPrompt>
</template>

<script setup>
import PxtPrompt from '@/components/dialog/prompt.vue'
import {useDictStore} from "@/store/dict";
import {fourNumberValidate, requiredValidate, nineNumberValidate,spaceValidate, maxNumValidate, workStageValidate, projectIdValidate, notZeroValidate} from '@/utils/validate'
import {deepClone,formatMoney, formatMoneyParser} from "@/utils/utils";
const {logistics_project, unit2, unit, customs_project} = useDictStore()
const emit = defineEmits(["confirm", "cancel"])
const props = defineProps({
  type: {
    type: Number,
    default: 1
  },
  //是否是修改状态，基础报价规则需要
  editData: {
    type: Object,
    default: () => {
    }
  },
  //规则数据，做校验
  ruleData: {
    type: Object,
    default: () => {
    }
  },
  //工序数组
  customerInfo: {
    type: Array,
    default: () => []
  }
})

// 数据
let isEdit = computed(() => {
  return Object.keys(props.editData).length > 0
})

const title = computed(() => {
  let title = ''
  switch (props.type) {
    case 1:
      title = '基础报价规则'
      break
    case 2:
      title = 'MOQ规则'
      break
    case 3:
      title = '物料报价规则'
      break
    case 4:
      title = '关务报价规则'
      break
    case 5:
      title = '返工单价规则'
      break
  }
  return title
})
const ruleForm = reactive({
  workStage: '',//工序
  unitId: '',  //单位
  minQuantity: '',//最大值
  maxQuantity: '', //最小值
  price: '', //基础报价价格，4位小数
  multiple: '', //倍数 4位小数
  projectId: '', //项目id
  quantity: '',//物流、关务价格 4位小数
  unitPrice:'',//返工价格，4位小数
})
//克隆一份基础数据,方便做重置
const initData = deepClone({...ruleForm})

const ruleFormRef = ref()

const rules = reactive({
  workStage: [requiredValidate('请输入工序'), {validator: spaceValidate, trigger: 'change'}, {
    validator: (rule, value, callback) => {
      workStageValidate(rule, value, callback, props.ruleData.baseOfferInfo, isEdit.value)
    }, trigger: 'change'
  }],
  unitId: [requiredValidate('请选择单位类型')],
  minQuantity: [{validator: nineNumberValidate, trigger: 'change'}],
  maxQuantity: [{validator: nineNumberValidate, trigger: 'change'}],
  price: [requiredValidate('请输入价格'), {validator: fourNumberValidate, trigger: 'blur'}],
  multiple: [requiredValidate('请输入倍数'), {validator: fourNumberValidate, trigger: 'blur'}],
  quantity: [requiredValidate('请输入价格'), {validator: fourNumberValidate, trigger: 'blur'}],
  unitPrice: [requiredValidate('请输入价格'), {validator: fourNumberValidate, trigger: 'blur'}],
  projectId: [requiredValidate('请选择项目类型'), {
    validator: (rule, value, callback) => {
      projectIdValidate(rule, value, callback, props.ruleData[props.type === 3 ? 'logisticsRulesInfo' : 'customsRulesInfo'])
    }, trigger: 'change'
  }],
})


// 基础规则修改时，把数据合并到ruleForm
watch(() => props.editData, (value, oldValue) => {
  Object.keys(value).length && Object.assign(ruleForm, {...value})
})

//确认按钮
const confirmButton = () => {
  ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      emit('confirm', {
        ...ruleForm,
        price:formatMoneyParser(ruleForm.price),
        quantity:formatMoneyParser(ruleForm.quantity),
        unitPrice:formatMoneyParser(ruleForm.unitPrice)
      })
      resetFields()
      Object.assign(ruleForm, {...initData})
    } else {
      console.log('error submit!', fields)
    }
  })

}
//取消按钮
const cancelButton = () => {
  resetFields()
  emit('cancel')
}
//重置
const resetFields = () => {
  ruleFormRef.value.resetFields()
  Object.assign(ruleForm, {...initData})
}
</script>

<style scoped lang="scss">
:deep(.el-form-item__label) {
  height: 30PX;
  line-height: 30PX;
}

:deep(.el-select) {
  width: 100%;
}

:deep(.el-form-item__label) {
  font-size: 14px;
  font-weight: 400;
  color: $e-gray;
}

:deep(.el-input__wrapper) {
  height: 30PX;
  background: #F4F5FC;
  border-radius: 2px;
  box-shadow: none;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: none;
}
:deep(.el-input.is-disabled .el-input__inner){
  color: #4a4a4a;
}
.form {
  margin-top: 32PX;
}
</style>
