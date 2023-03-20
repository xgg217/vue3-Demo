<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { upload } from '@/api/business'

import type { UploadProps, UploadUserFile } from 'element-plus'

const props = defineProps({
  //调外部的上传函数
  // externalUp: {
  //   type: Boolean,
  //   default: false
  // },

  // //是否是上传bom操作
  // isBom: {
  //   type: Boolean,
  //   default: false
  // },
});

const emit = defineEmits(["input"])

const fileList = ref<UploadUserFile[]>([
  // {
  //   name: 'element-plus-logo.svg',
  //   url: 'https://element-plus.org/images/element-plus-logo.svg',
  // },
  // {
  //   name: 'element-plus-logo2.svg',
  //   url: 'https://element-plus.org/images/element-plus-logo.svg',
  // },
])

// 文件上传
const handleUpload: UploadProps['httpRequest'] = (uploadFile) => {
  const formData = new FormData();
  formData.append('file', uploadFile.file);
  return upload(formData).then((res) => {
    console.log(res)
    if (res.success) {
      emit('input', res.data, fileList.value)
      return res.data
    }
    return false
  }).catch((err) => {
    console.log(err)
    // uploadFile.onError(err)
    return false
  });
}

// 文件列表移除文件时的钩子
const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

// 点击文件列表中已上传的文件时的钩子
const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}

// 当超出限制时，执行的钩子函数
const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  )
}

// 删除文件之前的钩子，参数为上传的文件和文件列表， 若返回 false 或者返回 Promise 且被 reject，则停止删除。
const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(`确定删除${uploadFile.name} ?`).then(() => {
    emit('input', uploadFile.response, fileList.value)
    return true
  }).catch(() => {
    return false
  })
}
</script>

<template>
  <el-upload
    v-model:file-list="fileList"
    class="upload-demo"
    action="#"
    :http-request="handleUpload"
    multiple
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :on-exceed="handleExceed"
  >
    <el-button type="primary">上传文件</el-button>
  </el-upload>
</template>

<style lang="scss" scoped>
</style>