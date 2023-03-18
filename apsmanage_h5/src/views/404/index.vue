<template>
  <div class="main">
    <img :src="getImage(img || '404')" alt="" v-if="img==='permission'" class="permission">
    <img :src="getImage(img || '404')" alt="" v-else>
    <div class="description">
      {{ description || '404' }}
    </div>
  </div>
</template>

<script setup>
import {useRouteQuery} from "@vueuse/router";
import {setTitle} from "@/utils/ddApi";
import {getImage} from "@/utils/utils";

const description = useRouteQuery('description')
const title = useRouteQuery('title')
const img = useRouteQuery('img')
setTitle(title.value || '404')
</script>
<style scoped lang="scss">
.main {
  height: 100vh;
  width: 100%;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  img{
    margin-top:171px;

  }
  .permission{
    width: 315px;
  }
  .description {
    font-size: 14px;
    font-weight: 500;
    color: #A7A9B7;
    text-align: center;
    margin-top: 32px;
  }

}
</style>
