<template>
  <div class="work">
    <Company class="pd-20"></Company>
    <div class="work-menu">
      <div class="work-menu_title">公司/工厂运营</div>
      <ul>
        <template v-for="item in menu" :key="item.name">
          <li v-if="item.name" class="flex-align-center flex-cul" @click="handelMenu(item.url)">
            <img :src="getImage(item.img)" :alt="item.label">
            <span class="fz-12 mt-10">{{ item.name }}</span>
          </li>
          <li v-else></li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script setup>
import Company from './module/company.vue'
import {useUserStore} from "@/store";
import {openExternalPage} from "@/utils/ddApi";
let userStore = useUserStore()
let {permissions}=storeToRefs(useUserStore())
// let constMenu = [
//   {name: '品新工作台', img: '10'},
//   {name: '生产管理', img: '11'},
//   {name: '仓储管理系统', img: '12'},
//   {name: '资产管理', img: '13'},
//   {name: '数据看板', img: '14'},
//   {name: '集控中心', img: '15'},
//   {name: '组织成员', img: '16'},
// ]
let router = useRouter()

let menu=computed(()=>{
  let ret=[]
  permissions.value.forEach(({menuName,forwardUrl,menuIconUrl})=>{
    if(menuName){
      ret.push({name:menuName, img:menuIconUrl, url:forwardUrl, dot:0,})
    }
  })
  if(ret.length>8){
    // 长度大于8 ，只显示最后8之后的
    ret.splice(0,8)
  }
  return ret
})

const getImage = (name=16) => {
  const picModules = import.meta.globEager('../../../assets/workbench/*')
  const path = (`../../../assets/workbench/${name}.png`);
  return picModules[path].default
}
const handelMenu = (url) => {
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
</script>

<style lang="scss" scoped>
.work {
  background: #FFFFFF;
  height: 100%;
  &-menu {
    background: #FFFFFF;
    border-radius: 14px;
    padding: 20px;
    padding-top: 9px;
    &_title {
      font-size: 16px;
      font-weight: bold;
      color: #1B2124;
    }
    ul{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 31px 0;
      li{
        margin-bottom: 34px;
        width: 30%;
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
}
</style>
