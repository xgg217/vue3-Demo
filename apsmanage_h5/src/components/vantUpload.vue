<template>
  <div v-if="props.filesList.length < props.limitNum" class="vantUpload">
    <van-uploader
      :multiple="multiple"
      v-bind="$attrs"
      :after-read="afterRead"
      :preview-image="false"
      :accept="props.limitFormat.length ? props.limitFormat.join(',') : '*'"
      :max-size="maxSize" @oversize="onOversize"
      :max-count="maxCount"
    >
     <slot>
       <van-button class="uploadBtn" icon="plus" size="small" type="primary" plain>{{ props.btnName }}</van-button>
     </slot>
    </van-uploader>
  </div>
</template>

<script setup>
  import { Toast, Uploader, Notify } from 'vant';
  import {batchUpload, upload, uploadBomFile} from "@/api/business"
  import transUploadFile from "@/utils/transUploadFile"

  const emit = defineEmits(["getFileInfo","getFileError","uploadFun"])
  const props = defineProps({
    //是否是上传bom操作
    isBom: {
      type: Boolean,
      default: false
    },
    //如果外层组件也用了OpenLoading，会被这里的closeLoading关掉
    isOpenLoading:{
      type: Boolean,
      default: true
    },
    //调外部的上传函数
    externalUp: {
      type: Boolean,
      default: false
    },
    // 图片多选
    multiple: {
      type: Boolean,
      default: false
    },
    btnName: {
      type: String,
      default: "上传文件"
    },
    maxCount: {
      type: Number,
      default: 1
    },
    filesList: {
      type: Array,
      default: () => []
    },
    limitNum: {
      type: Number,
      default: 5
    },
    keys: {
      type: String,
      default: ''
    },
    limitFormat: {
      type: Array,
      default: () => []
    },
    maxSize:{
      type: Number,
      default: 1024 * 1024 * 10
    }
  })

  const openLoading = () => {
    Toast.loading({
      duration: 0,
      forbidClick: true,
    })
  }
  const closeLoading = () => {
    Toast.clear()
  }

  /* 上传文件 */
  const afterRead = (file) => {
    props.isOpenLoading && openLoading()
    let files
    // 多文件上传
    if(Array.isArray(file)){
      files = new FormData()
      file.forEach((item)=>{
        files.append('file', item.file)
      })
    }else{
      files = transUploadFile(file.file)
    }
    let uploadFun
    if(props.externalUp){
      emit("uploadFun",files)
      return
    }else if(props.isBom){
      uploadFun=uploadBomFile
    }else if(props.multiple){
      uploadFun=batchUpload
    } else{
      uploadFun=upload
    }
    uploadFun(files)
        .then((res) => {
          if (res.code === 200) {
            const { data } = res
            if (Array.isArray(data)){
              emit('getFileInfo', data)
            }else{
              emit('getFileInfo', {name: data.name, url: data.url, key: props.keys})
            }
            // Toast.success('上传成功');
          }
        }).catch((err)=>{
      emit('getFileError', err)
    }).finally(()=>{
      props.isOpenLoading && closeLoading()
    })
  }
  /* 大小超出 */
  const onOversize = (file) => {
    Toast.fail('文件不能超出'+props.maxSize/1024/1024+'M');
  }
</script>

<style lang="scss">
.vantUpload{
  .uploadBtn{
    background-color: #ecf5ff;
    border: unset;
    height: 30px;
    // padding: 0;
    color: #0096FF;
  }
}

</style>
