<template>
  <div class="about">
    <p>
      品新科技集团专注于物联网终端产品的研发、制造与销售业务，依托于自研的工业互联网4.0平台为全球客户提供智能制造和数字化转型解决方案，公司致力于打造“数字化智能制造+工业互联网4.0”新生态。</p>
    <p>业务板块涵盖：物联网硬件研发、垂直供应链、智能制造、工业互联网平台建设和运营、工业软件及工业APP开发、智能工厂建设及软硬件集成服务等。</p>
    <p>
      扎根电子行业三十余年，品新科技集团一直专注电脑周边及科技类产品的综合服务，在全国20多个主要城市（包括台北、香港）设立物流配送中心；旗下拥有7家子公司，包括3家100%自有工厂及多家控股工厂，公司员工人数超过4000人，为200多家国内外知名企业提供优质的服务。</p>
    <p @click="choseMode">
      未来，公司将继续秉持“以客户为中心，以价值创造为主线，长期坚持艰苦奋斗”的核心价值观，以VIM服务为载体，智能制造为基础，数字化为手段，为全球客户提供电子设计方案、生产制造和产品管理综合服务，满足广大客户需求，实现“持续为客户提供有竞争力的智能硬件产品和综合服务”的企业使命。</p>
    <van-action-sheet v-model:show="showMode" :actions="urlList" @select="onSelect" />
  </div>
</template>

<script setup>
import { Dialog } from 'vant';
import { useUserStore, useSystemStore } from "@/store";
import { removeItem } from "@/utils/utils";
let router = useRouter()
let userStore = useUserStore()

let { isApp }=storeToRefs(useSystemStore())

const urlList = [
  {name: "生产", url: "http://192.168.28.51:31300/"},
  {name: "开发", url: "http://192.168.28.51:30300/"},
  {name: "TAO", url: "http://192.168.9.26:4500/"},
  {name: "LIAO", url: "http://192.168.12.127:4500/"},
]

const onSelect = (item) => {
  Dialog.confirm({
    title: '环境切换提醒',
    message: `是否确定切换成 ${item.name} 环境！`
  })
  .then(() => {
    Dialog.alert({
      title: '',
      message: '修改成功，请重新启动应用！',
    }).then(() => {
      // on close
      userStore.$reset()
      removeItem('tabActive')
      setTimeout(() => {
        uni.postMessage({
          data: {
            message: 'setStorage',
            type: 'save',
            data: item
          }
        })
      }, 1000)
    })
  })
  .catch(() => {
    // on cancel
  });
}



let num = 0
const showMode = ref(false)
const choseMode = () => {
  if (!isApp.value) return
  num++
  if (num > 5) {
    num = 0
    showMode.value = true
  }
}
</script>

<style lang="scss" scoped>
.about{
  padding: 20px;
  box-sizing: border-box;
  background: #FFFFFF;
  height: 100%;
  p{
    font-size: 14px;
    color: #1B2124;
    line-height: 30px;
    text-indent: 30px;
    margin: 0;
  }
}
</style>
