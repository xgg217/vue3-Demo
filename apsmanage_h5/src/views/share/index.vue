<template>
  <div style="text-align: center;margin-top: 40%">
    {{msg}}
  </div>
</template>

<script setup>
import {getSmsUrlConvert} from "@/api/common";
let msg=ref('跳转中……')
let route=useRoute()
let {key}=route.params
getSmsUrlConvert({key}).then((res)=>{
   setTimeout(()=>{
     window.location=res.data
   },1000)
}).catch(()=>{
  msg.value('获取链接失败，请联系管理员')
})

</script>
