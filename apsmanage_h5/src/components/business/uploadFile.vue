<template>
  <div class="uploadFile">
    <el-upload
      :show-file-list="false"
      :on-change="getLocationImg"
      :on-exceed="attendLimit"
      :auto-upload="false"
      :limit="5"
      action=""
      ref="uploadFile"
      >
      <el-button type="primary" size="small">{{ props.btnName }}</el-button>
    </el-upload>
  </div>
</template>

<script setup>
  import { upload } from "@/api/business"
  import transUploadFile from "@/utils/transUploadFile"
  import { Notify, Toast } from 'vant';
  import { ElLoading } from 'element-plus'

  const openLoading = () => {
    Toast.loading({
      duration: 0,
      forbidClick: true,
    })
  }
  const closeLoading = () => {
    Toast.clear()
  }

  const fileSizeLimit = 1024 * 1024 * 10
  const uploadFile = ref()
  const emit = defineEmits(["getFileInfo"])
  const props = defineProps({
    btnName: {
      type: String,
      default: "上传文件"
    },
    keys: {
      type: String,
      default: ''
    }
  })
  const getLocationImg = (file) => {
    if (file.size > fileSizeLimit) {
      alert("文件大小超出限制，请重新选择！")
      uploadFile.value.clearFiles()
      return
    }
    openLoading()
    const files = transUploadFile(file.raw)
    upload(files)
      .then((res) => {
        if (res.code === 200) {
          const { data } = res
          emit('getFileInfo', {name: data.name, url: data.url, key: props.keys})
        } else {
          Notify({
            type: 'danger',
            message: res.code + ' - ' + res.msg,
          })
        }
        closeLoading()
      })
      .catch((e) => {
        Notify({ type: 'danger', message: JSON.stringify(e) })
      })
  }

  const attendLimit = () => {
    alert("最多只能上传5份文件！")
  }
  
</script>

<style lang="scss" scoped>

</style>