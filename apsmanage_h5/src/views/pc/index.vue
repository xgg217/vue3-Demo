<template>
  <div class="pc" ></div>
</template>

<script setup>
import * as dd from "dingtalk-jsapi";
import {isPc} from "@/utils/ddApi";
let route=useRoute()
let base=window.location.origin+"/#/"+route.query.url
console.log("url",base)
dd.ready(function () {
  if(isPc){
    dd.biz.util.openSlidePanel({
      url: base, //打开侧边栏的url
      onSuccess : function(result) {
        console.log(result)
      },
      onFail : function(err) {
        console.log('err',err)
      }
    })
  }else{
    location.href=base
  }
})

</script>

<style scoped lang="scss">
.pc {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  //margin-top: 100PX;
  .iframe {
    height: 100%;
    width: 600PX;
  }
}
</style>
