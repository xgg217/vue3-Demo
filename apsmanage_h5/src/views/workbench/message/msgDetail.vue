<template>
  <div class="msg">
    <div class="msg-time">{{getYMDHM(new Date(query.createdTime))}}</div>
    <div class="flex" @click.stop="open(query?.singleUrl)">
      <img src="@/assets/images/6_2.png" alt="" srcset="" class="head mr-10">
      <div class="card pd-20 pb-10">
        <!--先按赵涛说的，只给一个详情，不区分任务类型-->
        <!--<img src="@/assets/images/notice2.png" alt="" srcset="" class="head mr-10">-->
        <div class="fz-14 pb-13" color="#1B2124">
          {{query.title}}
        </div>
        <template v-if="query?.num">
          <div class="button" v-if="query?.actionTitle1" @click.stop="open(query?.actionUrl1)">{{query?.actionTitle1}}</div>
          <div class="button" v-if="query?.actionTitle2" @click.stop="open(query?.actionUrl2)">{{query?.actionTitle2}}</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import {getYMDHM} from "@/utils/timeFormat";
import {updateUnresdStatus} from "@/api/workbench";

let route=useRoute()
let query=route.query
onMounted(()=>{
  updateUnresdStatus(query.id)
})
const open = (url) => {
  if(url)location.href = url
}
</script>

<style lang="scss" scoped>
.msg {
  padding: 0 20px;
  &-time {
    width: 108px;
    height: 22px;
    line-height: 22px;
    background: #FFFFFF;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 400;
    color: #8D9092;
    text-align: center;
    margin: 22px auto;
  }
  .head{
    height: 40px;
  }
  .card{
    width: 247px;
    background: #FFFFFF;
    border-radius: 14px;
    box-sizing: border-box;
    .button{
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-top: 1px solid #F1F2F4;
      font-size: 14px;
      color: #2972FE;
    }
  }
}
</style>
