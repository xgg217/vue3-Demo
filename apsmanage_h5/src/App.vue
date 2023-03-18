<template>
  <div class="app-main">
    <el-config-provider :locale="zhCn">
      <Index class="app-main_nav"></Index>
      <div class="app-main_view">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" :key="$route.path" v-if="$route.meta.keepAlive"/>
          </keep-alive>
          <component :is="Component"  v-if="!$route.meta.keepAlive"/>
        </router-view>
      </div>
    </el-config-provider>
  </div>
</template>

<script setup>
import { ElConfigProvider } from 'element-plus'
import Index from "./views/index.vue"
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import useEruda from "@/hooks/useEruda";
useEruda()

// const onClickLeft = () => {
//   /* 返回 */
//   window.imitateNav()
// }
// const onClickRight = () => Toast('按钮')

// const route = useRoute()
// const router = useRouter()

// /* 模拟导航 */
// window.imitateNav = () => {
//   if (route.name === "myClient") {
//     uni.postMessage({
//       data: {
//         message: 'homePage',
//         type: 'out'
//       }
//     })
//   } else {
//     router.back()
//   }
// }
/* 判断是否uniapp-plus */
const isPlus = ref(false)
// onMounted(() => {
//   document.addEventListener('UniAppJSBridgeReady', function() {
//     uni.getEnv(function(res) {
//       console.log('当前环境：' + JSON.stringify(res));
//       isPlus.value = res.plus
//     })
//   })
// })

</script>

<style lang="scss">
html, body{
  background-color: #F4F5FC;
}
html, body, #app{
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
.app-main{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  &_view{
    width: 100%;
    flex: 1;
    overflow: auto;
  }
}
</style>
