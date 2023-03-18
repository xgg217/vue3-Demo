<template>
  <div class="project-table">
    <PxtPrompt :title="title" @confirm="confirmButton" v-model:show-prompt="showPrompt" v-bind="$attrs" @cancel="resetFields">
      <el-form class="rule-form custom-input" ref="ruleFormRef" :model="ruleForm" :rules="ruleFormRules" :label-width="100" :hideRequiredAsterisk="true" label-position="left"
               size="small">
        <el-form-item label="退回岗位" prop="jobIdList" v-if="type===5">
          <el-select :teleported="false" class="jobs" v-model="ruleForm.jobIdList" placeholder="" multiple collapse-tags @change='changeSelect' @remove-tag='removeTag'>
            <el-option label='全部退回' value='全部退回' @click='selectAll'></el-option>
            <el-option :label="item.name" :value="item.value" v-for="item in offerType" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="退回原因" prop="adoptReason">
          <el-select v-model="ruleForm.adoptReason" placeholder="">
            <el-option :label="item.name" :value="item.value" v-for="item in returnReason" :key="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="ruleForm.remarks" placeholder="备注"/>
        </el-form-item>
      </el-form>
    </PxtPrompt>
  </div>
</template>

<script setup>
import PxtPrompt from '@/components/dialog/prompt.vue'
import {useDictStore} from "@/store/dict";
import {requiredValidate} from '@/utils/validate'
import {postHttpSuperApproval, putHttpCustomsOffer, putHttpLogisticsOffer, putHttpProjectOffer, setHttpMultiple} from "@/api/business";
import to from 'await-to-js'
import throttle from '@/utils/throttle'
import {close} from "@/utils/ddApi";
const {returnReason, unit} = useDictStore()
const emit = defineEmits(["update:show", "handelBack"])
const offerId = inject('offerId')
let route=useRoute()

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  type: {
    type: Number,
    default: 1
  },
  id: {
    type: Number,
  },
  offerType:{
    type:Array,
    default: () => []
  }
})

let data = reactive({
  ruleFormRef: '',
  ruleForm: {
    jobIdList: [],
    adoptReason: 1,
    remarks: '',
  },
  ruleFormRules: {
    jobIdList: [requiredValidate('请选择退回岗位')],
    adoptReason: [requiredValidate('请选择退回原因')],
    remarks: [requiredValidate('请填写备注')],
  }
})
let {ruleForm, ruleFormRules, ruleFormRef, checked} = toRefs(data)
let showPrompt = computed(() => {
  return props.show
})
const title = computed(() => {
  let obj = {
    1: '工程报价',
    2: '关务报价',
    3: '物流报价',
    4: '物料报价',
    5: '多项报价退回',
  }
  return obj[props.type]
})

const selectAll = () => {
  if (ruleForm.value.jobIdList.length < props.offerType.length) {
    ruleForm.value.jobIdList = []
    props.offerType.forEach((item) => {
      ruleForm.value.jobIdList.push(item.value)
    })
    ruleForm.value.jobIdList.unshift('全部退回')
  } else {
    ruleForm.value.jobIdList = []
  }
}
const changeSelect = (val) => {
  if (!val.includes('全部退回') && val.length === props.offerType.length) {
    ruleForm.value.jobIdList.unshift('全部退回')
  } else if (val.includes('全部退回') && (val.length - 1) < props.offerType.length) {
    ruleForm.value.jobIdList = ruleForm.value.jobIdList.filter((item) => {
      return item !== '全部退回'
    })
  }
}

const removeTag = (val) => {
  if (val === '全部退回') {
    ruleForm.value.jobIdList = []
  }
}

//打开规则修改弹窗
const open = () => {
  emit('update:show', !props.show)
}

//确认按钮

const confirmButton =throttle(()=>{
  ruleFormRef.value.validate((valid, fields) => {
    if (!valid) return
    let jobIdList = ruleForm.value.jobIdList.filter(item => item !== '全部退回')
    let params = {
      ...ruleForm.value,
      jobIdList: jobIdList,
      customerOfferId: offerId,
      adoptFlag: 1,
      id: props.id
    }
    handleBack(params)
  })
})
const handleBack = async (params) => {
  let err, data
  if (props.type !== 5) delete params.jobIdList;
  //现在是分开调不同的接口，其实可以统一调setHttpMultiple，懒得改了
  switch (props.type) {
    case 1:
      [err, data] = await to(putHttpProjectOffer(params))
      break;
    case 2:
      [err, data] = await to(putHttpCustomsOffer(params))
      break;
    case 3:
      [err, data] = await to(putHttpLogisticsOffer(params))
      break;
    case 4:
      [err, data] = await to(setHttpMultiple({...params, offerId, jobIdList: [4]}))
      break;
    case 5:
      // 董事长审批
      if(route.path.includes('/quote/superAudit')){
        [err, data] = await to(postHttpSuperApproval({
          offerId,
          approvalResult:1,
          remarks: params.remarks,
          adoptReason:params.adoptReason,
          jobIdList:[...params.jobIdList]}))
      }else{
        [err, data] = await to(setHttpMultiple({...params, offerId,}))
      }
      break;
  }
  close()
  // resetFields()
  // emit("handelBack")
}
//重置
const resetFields = () => {
  ruleFormRef.value.resetFields()
  open()
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
}

.jobs {
  color: red;

  :deep(.el-select-dropdown__item::after) {
    //display: none;
  }

  :deep(.el-checkbox) {
    height: 34px;
    //padding: 0 20px;
  }

  :deep(.el-select-dropdown__item) {
    //padding: 0;
  }
}
</style>
