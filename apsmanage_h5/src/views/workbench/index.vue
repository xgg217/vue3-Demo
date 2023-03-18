<template>
  <div class="work">
    <component :is="currentComp"></component>
    <van-tabbar v-model="active" @change="onChange" fixed active-color="#2972FE" inactive-color="#97999B">
      <van-tabbar-item name="home">
        <span>主页</span>
        <template #icon="props">
          <img :src="props.active ? getImage('home_active') : getImage('home')" alt=""/>
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="collection">
        <span>收藏</span>
        <template #icon="props">
          <img :src="props.active ? getImage('collection_active') : getImage('collection')" alt=""/>
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="message">
        <span>消息</span>
        <template #icon="props">
          <img :src="props.active ? getImage('msg_active') : getImage('msg')" alt=""/>
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="my">
        <span>我的</span>
        <template #icon="props">
          <img :src="props.active ? getImage('my_active') : getImage('my')" alt=""/>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import Home from './home/index.vue'
import Collection from './collection/index.vue'
import Message from './message/index.vue'
import My from './my/index.vue'
import {getItem, setItem} from "@/utils/utils";
import {useSystemStore} from "@/store";
let route=useRoute()
let active = ref()
let systemStore=useSystemStore()
onActivated(()=>{
  let tabActive=getItem('tabActive')|| 'home'
  active.value=tabActive
  onChange(tabActive)
})
onMounted(()=>{
  systemStore.updateSystemStore({
    version:route.query?.version+'',
    versionCode:route.query?.versionCode+'',
  })
})
let currentComp = shallowRef(Home)
const onChange = (key) => {
  let obj={
    'home':Home,
    'collection':Collection,
    'message':Message,
    'my':My
  }
  currentComp.value = obj[key]
  setItem('tabActive',key)
}
const getImage=(name)=>{
  const picModules = import.meta.globEager('../../assets/tabbar/*')
  const path = (`../../assets/tabbar/${name}.png`);
  return picModules[path].default
}
</script>

<style lang="scss" scoped>
.work {
  background: #FFFFFF;
  box-sizing: border-box;
  padding-bottom: 80px;
  :deep(.van-tabbar) {
    height: 64px;
    box-shadow: 0px -3px 6px 1px rgba(159,176,191,0.15);
  }

}
</style>
