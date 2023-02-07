<script setup lang="ts">
import { RouterView } from 'vue-router'
import { getUserRouteList } from '@/api/index'

const asyncGetUserRouteListApi = () => {
  getUserRouteList(1).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
}

asyncGetUserRouteListApi()
</script>

<template>
  <div>app</div>
  <RouterView />
</template>

<style scoped>

</style>
