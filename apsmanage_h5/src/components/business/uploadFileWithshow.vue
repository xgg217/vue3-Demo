<template>
  <div class="uploadFile&show">
    <div style="width: 100%; margin: 0.5rem 0">
      <vantUpload v-if="props.isEdit" :filesList="props.fileList" @getFileInfo="props.getFileInfo" :btnName="'上传附件'" :limitNum="props.limitNum" :keys="props.keys" :limitFormat="props.limitFormat"></vantUpload>
    </div>
    <businessFileList :fileList="props.fileList" @removeFile="props.removeFile" :showDelete="props.isEdit" :keys="props.keys"></businessFileList>
  </div>
</template>

<script setup>
  import businessFileList from "../businessFileList/index.vue"
  
  const props = defineProps({
    isEdit: {
      type: Boolean,
    },
    getFileInfo: {
      type: Function
    },
    fileList: {
      type: Array
    },
    removeFile: {
      type: Function
    },
    limitNum: {
      type: Number
    },
    keys: {
      type: String,
      default: ''
    },
    limitFormat: {
      type: Array,
      default: () => []
    }
  })

</script>

<style lang="scss" scoped>

</style>