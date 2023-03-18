<template>
  <div class="company">
    <div class="ui-cell fz-14" color="#1B2124" @click="showPicker = true">
      <div class="mr-10">{{orgName}}</div>
      <img  v-if="!showPicker" src="@/assets/images/drop-down.png" alt="" style="height: 20px" >
      <img v-else src="@/assets/images/drop-down.png" alt="" style="height: 20px" class="rotate-180">
    </div>
    <div>
      <van-popup v-model:show="showPicker" round position="bottom">
        <van-picker :columns="orgDescribeDict"  @cancel="showPicker = false" @confirm="onConfirm"/>
      </van-popup>
    </div>
  </div>
</template>

<script setup>
import {useDictStore, useUserStore} from "@/store";
let dictStore=useDictStore()
let userStore=useUserStore()
let {getDictValue}=dictStore
let {updateUserInfo}=userStore
let {factory=[]} = storeToRefs(dictStore)
let {orgName,orgDescribe} = storeToRefs(userStore)

const orgDescribeDict=computed(()=>{
  return orgDescribe.value.map((item)=>{
    return item.orgName
  })
})

const showPicker = ref(false);

const onConfirm = (value) => {
  updateUserInfo({orgName:value})
  showPicker.value = false;
};
</script>

<style lang="scss" scoped>
.company{
  background: #FFFFFF;
  position: sticky;
  top: 0;
  z-index: 9;
  margin-top:11px;
  :deep(.van-picker__confirm){
    color: #0096FF;
  }
}
</style>
