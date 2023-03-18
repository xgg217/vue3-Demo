<template>
 <div class="my">
<!--   <PxNavBar :show-bar="true" pTitle="我的"></PxNavBar>-->
    <div class="head ui-cell ui-cell-sb">
      <div class="info">
        <img src="@/assets/images/avatar2.svg" alt="">
        <div>{{nickName}}</div>
        <div>{{orgName}}</div>
      </div>
<!--      <van-icon name="arrow" color="#fff"/>-->
    </div>
   <div class="border-t border-gray-100"></div>
   <div class="ui-cell ui-cell-sb menu" @click="handelMenu('myAbout')">
     <div class="ui-cell">
       <img src="@/assets/images/about.png" alt="">
       <div>关于我们</div>
     </div>
     <img src="@/assets/images/right.png" alt="">
   </div>
   <div class="ui-cell ui-cell-sb menu" @click="handelMenu('mySetting')">
     <div class="ui-cell">
       <img src="@/assets/images/setting.png" alt="">
       <div>设置</div>
     </div>
     <img src="@/assets/images/right.png" alt="">
   </div>
 </div>
</template>

<script setup>
import PxNavBar from '@/components/navBar/index.vue'
import {useDictStore, useUserStore} from "@/store";
let router=useRouter()
let userStore=useUserStore()
let {getDictValue}=useDictStore()
let {updateUserInfo}=userStore
let {nickName,orgName}=storeToRefs(userStore)
const handelMenu = (name) => {
  router.push({name})
}
</script>

<style lang="scss" scoped>
.my{
  margin-top: 0;
  box-sizing: border-box;
  height: calc(100vh - 100px);
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  color: #1B2124;
  background: #fff;
  .head{
    border-radius: 8px;
    background: url("../../../assets/images/myBg.png") no-repeat;
    background-size: 336px 154px;
    font-size: 12px;
    font-weight: 400;
    color: #FFFFFF;
    padding: 19px;
    margin-bottom: 30px;
    .info{
      img{
        height: 44px;
      }
      div:first-of-type{
        font-size: 18px;
        font-weight: bold;
        margin-top:20px ;
      }
      div:last-of-type{
        margin-top:10px ;
      }
    }
  }
  .menu{
    height: 71px;
    border-bottom: 1px solid #F5F5F5;
    .ui-cell{
      img:first-of-type{
        height: 40px;
        margin-right: 12px;
      }
    }
    img{
      height: 18px;
    }
  }
}
</style>
