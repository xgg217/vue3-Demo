<template>
  <div>
    <PxNavBar :show-bar="showBar"></PxNavBar>
    <!--自定义选人-->
    <teleport to="#teleport-popup">
      <SelectPeople></SelectPeople>
    </teleport>
    <!--升级中心-->
    <Upgrade></Upgrade>
  </div>
</template>

<script setup>
import PxNavBar from '@/components/navBar/index.vue'
import SelectPeople from "@/components/selectPeople.vue";
import Upgrade from "@/components/upgrade.vue";
import useSystem from "@/hooks/useSystem";
useSystem()
let route = useRoute()
let showBar=computed(()=>{
  const noNavBar=['statusError','login','workbench',"pc","share"] //不用title的页面
  return !noNavBar.includes(route.name)
})

</script>

