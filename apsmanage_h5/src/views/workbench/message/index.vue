<template>
  <div class="collection">
    <div class="tab">
      <div :class="{active:tab===2}" @click="tab=2">消息<div class="dot" v-if="unread[0]">{{unread[0]}}</div></div>
      <div :class="{active:tab===4}" @click="tab=4">督办<div class="dot" v-if="unread[1]">{{unread[1]}}</div></div>
    </div>
<!--    <div v-if="tab===1" class="tip">-->
<!--      4条未处理消息即将推送给上级-->
<!--    </div>-->
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="getQueryWorkTaskList" offset="10" :immediate-check="false" class="msg">
      <div class="msg-item" @click="handleDetail(item)" v-for="item in tabData" :key="item.id">
        <div class="flex">
          <div>
            <img class="mt-10 " src="@/assets/images/6_2.png" alt="">
            <div class="unread" v-if="item.readStatus==1"></div>
          </div>
          <div class="msg-item_title">
            <div color="#1B2124" class="fz-18 pt-9 font-bold">小6</div>
            <div class="ui-nowrap fz-14" color="#8D9092">{{item.title}}</div>
          </div>
        </div>
        <div class="fz-12 pt-9 time" color="#8D9092">{{getYMDHM(new Date(item.createdTime))}}</div>
      </div>
    </van-list>
    <Share v-model:show="showDetail" title="工作审批" :showShare="false">
      <div class="card pd-20 pb-10">
        <div class="fz-14 pb-13" color="#1B2124">
          {{detailInfo?.title}}
        </div>
        <template v-if="detailInfo?.num">
          <div class="button" v-if="detailInfo?.actionTitle1" @click.stop="open(detailInfo?.actionUrl1)">{{detailInfo?.actionTitle1}}</div>
          <div class="button" v-if="detailInfo?.actionTitle2" @click.stop="open(detailInfo?.actionUrl2)">{{detailInfo?.actionTitle2}}</div>
        </template>
      </div>
    </Share>
  </div>
</template>

<script setup>
import {queryUnreadNum, queryWorkTaskList, updateUnresdStatus} from "@/api/workbench";
import {getYMDHM} from "@/utils/timeFormat";
import usePage from "@/hooks/usePage";
import Share from "@/views/workbench/components/share.vue";
import {noticeTip} from "@/utils/toastTips";
import {openExternalPage} from "@/utils/ddApi";
let {pageNum,pageSize,loading,finished}=usePage()
let page=usePage()
let tab = ref(2)  //2是信息，4是督办
let tabData=ref([])
let unread=ref([0,0])
let showDetail=ref(false)
let detailInfo=ref({})
let router=useRouter()
const getQueryWorkTaskList = (isUnread) => {
  queryWorkTaskList({ msgType: [tab.value],pageNum:pageNum.value++,pageSize:pageSize.value}).then((res)=>{
    tabData.value.push(...res.data.records)
    loading.value = false;
    // pages
    if (tabData.value.length >= res.data.total) {
      finished.value = true
    }
  })
  if(isUnread){
    //获取未读信息条数
    queryUnreadNum({ msgType: [2],readStatus:1}).then((res)=>{
      unread.value[0]=res.data
    })
    queryUnreadNum({ msgType: [4],readStatus:1}).then((res)=>{
      unread.value[1]=res.data
    })
  }
}
const handleDetail = (item) => {
  //改为已读
  if(item.readStatus==1){
    item.readStatus=0
    updateUnresdStatus(item.id)
    if(tab.value==2){
      unread.value[0]=unread.value[0]-1
    }else{
      unread.value[1]=unread.value[1]-1
    }
  }
  detailInfo.value=item
  showDetail.value=true
}

onMounted(()=>{
  getQueryWorkTaskList(true)
})

const open = (url) => {
  if (url) {
    if (url.includes('http')) {
      url=url.split('/#')[1]
      console.log('url',url)
      router.push({path:url })
    } else if(url.includes('dingtalk')){
      noticeTip("该版本暂不支持创建钉钉会议，请在钉钉内打开该页面！")
    } else {
      openExternalPage({url})
    }
  }
}

watch(()=>tab.value,()=>{
  pageNum.value=1
  tabData.value=[]
  getQueryWorkTaskList()
})
</script>

<style lang="scss" scoped>
.collection {
  background: #FFFFFF;
  min-height: calc(100vh - 80px);
  width: 100%;
  .tab {
    height: 46px;
    line-height: 46px;
    display: flex;
    padding: 0 20px;
    font-size: 22px;
    color: #8D9092;
    background: #FFFFFF;
    z-index: 2;
    position: sticky;
    top: 0;


    >div {
      width: 100px;
      position: relative;
    }

    .active {
      color: #1B2124;
      font-weight: bold;
    }

    .active:after {
      content: '';
      display: inline-block;
      width: 26px;
      height: 4px;
      background: #2972FE;
      border-radius: 4px;
      position: relative;
      bottom: -12px;
      left: -36px;
    }
  }

  .tip {
    width: 375px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background: #FFEDED;
    font-size: 16px;
    color: #FF4C4D;
    position: relative;
    top: -10px;
  }

  .msg {
    border-top: 10px solid #F5F5F5;
    padding: 10px 20px;
    height: 100%;
    &-item {
      padding-bottom: 10px;
      height: 70px;
      display: flex;
      justify-content: space-between;
      position: relative;
      &_title{
        width: 270px;
        flex-shrink: 0;
        border-bottom: 1px solid #F5F5F5;
        div:last-of-type{
          padding-bottom: 10px;
          height: 36px;
          line-height: 26px;
        }
      }
      .time{
        position:absolute ;
        right: 10px;
      }
      img {
        height: 48px;
        width: 48px;
        margin-right: 10px;
      }

      div {
        flex-shrink: 0;
      }
      .unread{
        width: 10px;
        height: 10px;
        background: #FF4C4D;
        border-radius: 50%;
        border: 1px solid #FFFFFF;
        position: relative;
        top: -46px;
        left: 35px;
      }
    }
  }
  .dot{
    position: absolute;
    min-width: 15px;
    padding: 0 5px;
    line-height: 16px;
    height: 16px;
    text-align: center;
    background: #FF4C4D;
    border-radius: 22px 22px 22px 0;
    font-size: 12px;
    color: #FFFFFF;
    top: 6px;
    left: 45px;
    font-weight: 400;
  }
}
.card{
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
</style>
