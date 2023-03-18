<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <div class="work">
      <Company class="pd-20"></Company>
      <Banner></Banner>
      <div class="work-menu">
        <ul>
          <template v-for="item in menu" :key="item.name">
            <li v-if="item.name" class="flex-align-center flex-cul" @click="handleMenu(item.url)">
              <div class="dot" v-if="unreadData?.[item.url]">{{  unreadData?.[item.url]>99 ? '99+' : unreadData?.[item.url]   }}</div>
              <img :src="getImage(item.img)" :alt="item.label">
              <span class="fz-12 mt-10">{{ item.name }}</span>
            </li>
            <li v-else></li>
          </template>
        </ul>
      </div>
      <div class="work-notice">
        <div class="work-notice_item ui-cell" v-for="item in 0" :key="item.name">
          <img src="../../../assets/images/notice.png" alt="">
          <div>
            <div color="#8D9092" class="fz-12">董办：</div>
            <div class="ui-nowrap fz-14" color="#1B2124">关于成立单一窗口集控中心关于成立单一窗口集控中心</div>
          </div>
          <div>09-01
            <van-icon name="arrow"/>
          </div>
        </div>
      </div>
      <div class="mini6">
        <img src="@/assets/images/6_2.png" alt=""  class="wh100" @click="()=>handleMenu()">
      </div>
    </div>
  </van-pull-refresh>


</template>

<script setup>
import Company from './module/company.vue'

import {useUserStore} from "@/store";
import Banner from "@/views/workbench/components/banner.vue";
import {openExternalPage} from "@/utils/ddApi";
import {getAppUnread} from "@/api/login";
import useOrgTree from "@/hooks/useOrgTree";
import usePermission from "@/hooks/usePermission";
import bus from "@/utils/bus";
let orgTree = useOrgTree()
let userStore = useUserStore()
let router = useRouter()
let {getPermission}=usePermission()
let {nickName, permissions, saasId, userSource} = storeToRefs(userStore)
let loading = ref(false);
let unreadData=ref({})
let menu = computed(() => {
  let ret = []
  permissions.value.forEach(({menuName, forwardUrl, menuIconUrl}) => {
    if (menuName) {
      ret.push({
        name: menuName,
        img: menuIconUrl,
        url: forwardUrl,
      })
    }
  })
  if (ret.length > 8) {
    ret.length = 8
    ret.push({name: '更多', img: '9', url: 'workbenchMore'})
  }
  return ret
})
//下拉刷新
const onRefresh = () => {
  getPermission().finally(()=>{
    loading.value = false;
  })
};
const getImage = (name) => {
  const picModules = import.meta.globEager('../../../assets/workbench/*')
  const path = (`../../../assets/workbench/${name}.png`);
  return picModules[path].default
}
//点击菜单
const handleMenu = (url) => {
  if (url) {
    if (url.includes('http')) {
      openExternalPage({url})
    } else {
      router.push({name: url})
    }
  } else {
    router.push({name: "404", query: {'description': '你尚未购买该模块，如有需要请联系管理员！', 'title': '暂无权限', 'img': 'permission'}})
  }
}
const getUnread= () => {
  getAppUnread().then((res)=>{
    let obj={}
    res.data.forEach((item,index)=>{
      obj[item.iconType]=item.unRedCount
    })
    unreadData.value=obj
  })
}
onMounted(()=>{
  getUnread()
  bus.emit('getVersionInfo')
})
onActivated(()=>{
  //获取未读信息数量
  getUnread()
  bus.emit('getVersionInfo')
})
</script>

<style lang="scss" scoped>
.work {
  background: #FFFFFF;
  box-sizing: border-box;
  overflow: hidden;
  //height: calc(100vh - 100px);

  &-menu {
     padding: 0 20px;
    .dot {
      min-width: 12px;
      padding: 2px;
      height: 12px;
      line-height: 12px;
      border-radius: 7px;
      background: #FF4C4D;
      font-size: 11px;
      color: #FFFFFF;
      text-align: center;
      position: absolute;
      left: 62px;
      top: 0;
    }
    ul{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 20px 0;
      li{
        margin-bottom: 34px;
        width: 30%;
        position: relative;
        span{
          text-align: center;
        }
        img{
          height: 52px;
          width: 52px;
        }
      }
    }
  }

  &-notice {
    width: 331px;
    box-sizing: border-box;
    margin: 0 auto;
    padding-bottom: 20px;

    &_item {
      height: 80px;
      box-shadow: 0 4px 80px 1px rgba(159, 176, 191, 0.15);
      border-radius: 4px;
      margin-bottom: 14px;
      padding: 0 14px;

      > div {
        flex-shrink: 0;
        font-size: 12px;
        color: #A7A9B7;
        line-height: 20px;
      }

      > div:nth-of-type(1) {
        width: 200px;
      }

      img {
        height: 40px;
        width: 40px;
        margin-right: 14px;
      }
    }
  }

  .mini6 {
    position: fixed;
    height: 50px;
    width:50px;
    top: 82.4%;
    right: 20px;
    z-index: 8;
    animation: rock 2s infinite;
  }
}
</style>
