<script setup lang="ts">
import { ref } from "vue";
// import { useClipboard } from '@vueuse/core'

// const source = ref('Hello')
// // text是当前从剪切板读取到的文本
// // isSupported用于判断当前浏览器是否支持剪切板API
// // copy是将文本写入到剪切板的方法。
// const { text, copy, copied, isSupported } = useClipboard({ source })


import useClipboard from "./useClipboard";

const {
  copy: myCopy,
  text:myText,
  isSupported:myIsSupported,
  paste:myPaste,
} = useClipboard();
const strC = ref('123')
const strV = ref('123')

const handleCopy = () => {
  myCopy(strC.value)
}

const handleV = () => {
  // myCopy(str.value)
  // strV.value = myText.value
  myPaste().then(res => {
    // strV.value = res
    console.log(res);
    
  })
}

</script>

<template>
  <div>使用粘贴板</div>
  <div class="">
    {{ myIsSupported }}
    <input type="text" v-model="strC">
    <button @click="handleCopy">复制</button>
    <input type="text" v-model="strV" />
    <button @click="handleV">粘贴</button>
    <div>----------VueUse库------</div>
    <!-- <div>{{ text }}{{ isSupported }}</div>
    <input type="text" v-model="text">
    <button @click='copy()'>
      <span v-if='!copied'>Copy</span>
      <span v-else>Copied!</span>
    </button> -->
  </div>
</template>

<style lang="scss" scoped>
</style>