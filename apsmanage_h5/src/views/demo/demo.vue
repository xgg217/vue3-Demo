<template>
  <div @click="scan">扫码</div>
  <p>{{text}}</p>
  <div @click="chooseImage">拍照</div>
  <div @click="startRecord">开始录音</div>
  <div @click="stopRecord">结束录音</div>
  <div @click="play">播放</div>
  <p>{{localText}}</p>
</template>

<script setup>
import * as dd from 'dingtalk-jsapi'
let text=ref('')
let localAudioId=ref('')
let localText=ref('')
const scan = () => {
  dd.biz.util.scan({
    type: 'all' , // type 为 all、qrCode、barCode，默认是all。
    onSuccess: function(data) {
      text.value=data.text
    },
    onFail : function(err) {
    }
  })
}

const chooseImage = () => {
  dd.biz.util.chooseImage({
    count:1,
    onSuccess: (res) => {
      console.log(JSON.stringify(res))
    },
    onFail:(err) =>{
      console.log(JSON.stringify(err))
    }
  })
}
const startRecord = () => {
  dd.device.audio.startRecord({
    onSuccess : function () {//支持最长为300秒（包括）的音频录制，默认60秒(包括)。
      localText.value='录音中'
    },
    onFail : function (err) {
    }
  });
}
const stopRecord = () => {
  dd.device.audio.stopRecord({
    onSuccess : function(res){
      localAudioId.value=res.mediaId
      localText.value='已结束录音'
    },
    onFail : function (err) {
    }
  });
}
const play = () => {
  dd.device.audio.play({
    localAudioId : localAudioId.value,
    onSuccess : function () {
      localText.value='正在播放'
    },
    onFail : function (err) {
    }
  });
}

</script>

<style scoped>
div {
  /*width: 100px;*/
  height: 50px;
  background: green;
  color: aliceblue;
  text-align: center;
  line-height: 50px;
  font-size: 26px;
  margin: 20px;
}
</style>
