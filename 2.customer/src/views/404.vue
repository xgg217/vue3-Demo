<template>
  <div class="system">
    <img :src="img404">
    <div class="title">
      <h2>页面走丢了...</h2>
      <h4>远方的朋友你好！非常抱歉，您所请求的页面不存在！</h4>
      <h4>请仔细检查您输入的网址是否正确。</h4>
    </div>
  </div>
</template>

<script lang="ts" setup>
import img404 from '@/assets/404.png';

</script>

<style scoped lang="scss">
.system {
  background: #7395ff;
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    padding-top: 140px;
    text-align: center;
    width: 500px;
  }
}

.title {
  h2 {
    color: #fff;
    font-size: 36px;
    letter-spacing: 4px;
    text-align: center;
    line-height: 120px;


  }

  h4 {
    color: #fff;
    font-size: 18px;
    /* font-weight: bold; */
    line-height: 38px;
    text-align: center;
  }
}
</style>
