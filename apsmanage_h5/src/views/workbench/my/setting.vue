<template>
  <div class="setting">
<!--    <div class="border-t border-gray-100"></div>-->
    <div class="ui-cell ui-cell-sb menu" @click="handelMenu('myReset')">
      <div class="ui-cell">
        <img src="@/assets/images/reset.png" alt="">
        <div>修改密码</div>
      </div>
      <img src="@/assets/images/right.png" alt="">
    </div>
    <div class="ui-cell ui-cell-sb menu" v-if="isApp" @click="()=>handelMenu()">
      <div class="ui-cell">
        <img src="@/assets/images/version.png" alt="">
        <div>App</div>
      </div>
      <div >
        <span color="#1B2124" class="fz-14">V{{version}}  </span>
        <img src="@/assets/images/right.png" alt="">
      </div>
    </div>
    <div class="submit">
      <PxtButton width="100%" height="46px" radius="23px" type="default" @click="out">退出</PxtButton>
    </div>
  </div>
</template>

<script setup>
import PxtButton from "@/components/button/button.vue";
import {Toast} from "vant";
import {useUserStore,useSystemStore} from "@/store";
import {removeItem} from "@/utils/utils";
let router=useRouter()
let userStore=useUserStore()
let {version,isApp}=storeToRefs(useSystemStore())
const handelMenu = (name) => {
  if(name){
    router.push({name})
  }else{
    Toast('当前版本V'+version.value);
  }
}
//退出登陆
const out = () => {
  userStore.$reset()
  removeItem('tabActive')
  router.replace({name:'login'})
}
</script>

<style lang="scss" scoped>
.setting{
  background: #FFFFFF;
  margin-top: 0;
  height: 100%;
  width: 375px;
  padding: 10px 20px;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: 500;
  color: #1B2124;
  position: relative;
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
  .submit{
    position: absolute;
    bottom: 20px;
    width: 335px;
  }
}
</style>
