<template>
  <div class="pc" ></div>
</template>

<script setup>
//暂时没用到
import {exportFileByUrl} from "@/utils/utils";
let route=useRoute()
let url=route.query.url
let name=route.query.name
if(!name){
  window.open(url)
}else{
  console.log(url,name)
  exportFileByUrl(route.query.url,route.query.name)
}
</script>

