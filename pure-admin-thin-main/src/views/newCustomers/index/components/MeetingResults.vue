<script setup lang='ts'>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import ElUploadCmp from '@/components/ElUploadCmp.vue'

import type { IRuleForm } from './../types'


// (e: 'change', id: number): void
//     (e: 'update', value: string): void

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', data: IRuleForm): void
}>()

const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive<IRuleForm>({
  meetingResult: -1, // 审批结果
  meetingLog: '', // 会议记录
  fileList: [], // 会议附件
})

// 表单验证
const {
  rules
} = (function () {
    const checkMeetingResult = (rule: any, value: any, callback: any) => {
      if (value === -1) {
        callback(new Error('请选择审批结果'));
      } else {
        callback();
      }
    }

  const rules = reactive<FormRules>({
    meetingResult: [
      { required: true, validator: checkMeetingResult, trigger: 'change' },
    ]
  });

  return {
    rules
  }
})();



// 附件上传
const handleFileList = (data) => {
  ruleForm.fileList = [{...data}]
}

// 提交
const submitForm = (formRef: FormInstance) => {
  formRef.validate((valid: boolean) => {
    // if (valid) {
    //   console.log('submit!');
    // } else {
    //   console.log('error submit!!');
    //   return false;
    // }
    if (!valid) { return false }
    const obj = {
      meetingResult: ruleForm.meetingResult,
      meetingLog: ruleForm.meetingLog,
      fileList: ruleForm.fileList
    }
    emit('save', obj);
  });
}

// 关闭
const handleClose = () => {
  emit('close');
}
</script>

<template>
  <div>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      status-icon
    >
    <el-form-item label="审批结果" prop="meetingResult">
      <el-radio-group v-model="ruleForm.meetingResult">
        <el-radio :value="0" label="通过" />
        <el-radio :value="1" label="不通过" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="会议记录" >
      <el-input type="textarea" v-model="ruleForm.meetingLog" />
    </el-form-item>
    <el-form-item label="会议附件">
      <ElUploadCmp
        :limit="1"
        @input="handleFileList"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">确认</el-button>
      <el-button @click="handleClose">取消</el-button>
    </el-form-item>
  </el-form>

  </div>
</template>

<style scoped>

</style>
