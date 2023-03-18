<template>
  <div class="px-nav-bar" v-if="showBar">
    <van-nav-bar
        :title="pTitle || title "
        :left-text="leftText"
        :right-text="rightText"
        :left-arrow="showLeft"
        @click-left="onClickLeft"
        @click-right="onClickRight"
        fixed
        safe-area-inset-top/>
  </div>
</template>

<script setup>
import bus from "@/utils/bus";
import {useNavBarStore} from "@/store";
let navBarStore=useNavBarStore()
const props = defineProps(["showBar","pTitle"])
//1、通过bus设置右侧按钮 2、用css定位实现筛选 更加方便一点，不用处理bus和store
// import bus from "@/utils/bus";
// import {useNavBarStore} from "@/store";
// let navBarStore=useNavBarStore()
// onMounted(() => {
//   navBarStore.updateNavBar({rightText:'异常列表'})
//   bus.on("onNavBarClickRight", () => {
//     console.log("异常处理列表")
//   })
// })
// onUnmounted(()=>{
//   bus.off('onNavBarClickRight')
//   navBarStore.updateNavBar({rightText:''})
// })
let route = useRoute()
let router = useRouter()

let {title,showLeft,rightText,leftText}=storeToRefs(navBarStore)

router.afterEach((to, from) => {
  console.log("上级页面",router.options?.history?.state?.back)
  navBarStore.updateNavBar({
    rightText: "",
    showLeft:!!(router.options?.history?.state?.back)
  })
})



const onClickLeft = () => {
  window.imitateNav()
}
const onClickRight = () => {
  if(rightText.value){
    bus.emit("onNavBarClickRight")
  }
}

window.imitateNav = () => {
  if (!router.options?.history?.state?.back) {
    uni.postMessage({
      data: {
        message: 'homePage',
        type: 'out'
      }
    })
  } else {
    if (window.cancelFullScreenEvent) {
      window.cancelFullScreenEvent()
      window.cancelFullScreenEvent = null
      return
    }
    router.back()
  }
}
</script>

<style lang="scss" scoped>
//在navBar.scss里面，方便全局使用
</style>
