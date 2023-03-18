<template>
  <ul class="businessFileList">
    <li v-for="(item, index) in props.fileList" :key="item.name" class="flex-align-center">
      <div class="iconBox">
        <img :src="getImgSrc(item.name)" alt="">
      </div>
      <div class="nameBox mores2"  @click="openFileLink(item.url)">
        <span>{{item.name}}</span>
      </div>
      <div class="deleteBox" v-if="props.showDelete">
        <van-icon name="cross" color="#707070" @click="deleteFile(index)"/>
      </div>
      <div class="flex ui-cell download" v-if="showDown">
        <img  src="../../assets/images/down.png" alt="">
        <div class="ml-5" color="#0096FF" @click="openFileLink(item.url,item.name)">下载</div>
      </div>
    </li>
  </ul>
</template>

<script setup>
import {openSaveFile} from "@/utils/ddApi";

const props = defineProps({
  fileList: {
    type: Array,
    default: () => { return []
    }
  },
  showDelete: {
    type: Boolean,
    default: true
  },
  showDown: {
    type: Boolean,
    default: false
  },
  keys: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(["removeFile"])

const fileType = ["pdf", "docx", "xlsx","xls"]

const getFileType = (name) => {
  if (name.indexOf('.') < 0) {
    return "other"
  }
  const list = name.split('.')
  const index = list.length - 1
  const type = list[index]
  if ((fileType.findIndex(item => item == type)) > -1) {
    return type
  }
  return "other"
}

const getImgSrc = (url) => {
  const name = getFileType(url)
  const path = `../../assets/fileIcon/${name}.png`
  const modules = import.meta.globEager("../../assets/fileIcon/*.png")
  return modules[path].default
}

const deleteFile = (index) => {
  emit("removeFile", {index: index, key: props.keys})
}

const openFileLink = (url,name) => {
  openSaveFile(name, url)
}

</script>

<style lang="scss" scoped>
.businessFileList{
  li{
    height: 48px;
    font-size: 12px;
    width: 100%;
    margin-bottom: 10px;
    padding: 0 10px;
    box-sizing: border-box;
    position: relative;
    background-color: #F6F6FB;
    .iconBox{
      width: 27px;
      height: 30px;
      img{
        height: 100%;
        width: 100%;
        vertical-align: unset;
      }
    }
    .nameBox{
      flex: 1;
      margin: 0 10px;
      line-height: 12px;
    }
    .deleteBox{
      width: 10px;
      height: 100%;
      line-height: 26px;
      text-align: center;
    }
  }
}
.download{
  width: 86px;
  height: 48px;
  background: #F1F7FF;
  border-radius: 2px;
  text-align: center;
  font-size: 12px;
  position: absolute;
  right: -100px;
  img{
    height: 12px;
    margin-left: 18px;
  }
}
</style>
