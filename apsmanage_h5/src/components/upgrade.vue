<template>
    <van-overlay :show="show">
      <div class="wrapper" @click.stop>
        <div class="block">
          <div class="title">发现新版本</div>
          <ul>
            <li v-for="item in appInfo.content" :key="item">{{item}}</li>
          </ul>
          <!-- h5更新了 重启，app更新 跳下载  暂时先弄app吧-->
          <PxtButton type="blue-gradient" radius="22px" width="85%" class="button" @click="handleUpdate">立马升级</PxtButton>
        </div>
      </div>
    </van-overlay>
</template>

<script setup>
import PxtButton from '@/components/button/button.vue'
import {useSystemStore} from "@/store";
import {getAppVersion} from "@/api/workbench";
import {uniOpenBrowser} from "@/utils/ddApi";
import bus from "@/utils/bus";
let systemStore=useSystemStore()
let {isApp,versionCode}=storeToRefs(systemStore)
let show=ref(false)
let appInfo=ref({
  content:[],
  fileUrl:''
})

onMounted(() => {
  bus.on("getVersionInfo", (options) => {
    getVersionInfo()
  })
})

const handleUpdate = () => {
  uniOpenBrowser(appInfo.value.fileUrl)
}

const getVersionInfo = () => {
  if (isApp.value){
    getAppVersion().then((res)=>{
      res.data.content=res.data?.content ? JSON.parse(res.data.content) : []
      appInfo.value=res.data
      let newVersion=res.data?.versionNo || 0 //最新版本号
      let currentVersion=versionCode.value || 0//当前版本号
      console.log(newVersion,currentVersion)
      show.value=Number(newVersion)>Number(currentVersion)
    })
  }
}
</script>

<style scoped lang="scss">
.van-overlay{
  z-index: 100;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 292px;
  height: 275px;
  background: #FFFFFF;
  border-radius: 12px;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
}
.title{
  font-size: 18px;
  font-weight: bold;
  color: $b-gray;
  text-align: center;
}
ul{
  font-size: 14px;
  font-weight: 400;
  color: #8D9092;
  line-height: 28px;
  margin-top: 20px;
  li:before{
    content: '·';
    display: inline-block;
    padding-right: 5px;
  }
}

.button{
  position: absolute;
  bottom: 20px;
}
</style>
