<script setup lang="ts">
import { RouterView } from 'vue-router'
import { getUserRouteList } from '@/api/index'
import { useUsersStore } from '@/store/route'

const usersStore = useUsersStore()
usersStore.asyncGetRouteListApi()

// const asyncGetUserRouteListApi = () => {
//   getUserRouteList(1).then((res) => {
//     console.log(res)
//   }).catch((err) => {
//     console.log(err)
//   })
// }

// asyncGetUserRouteListApi()
</script>

<template>
  <div>app</div>
  <RouterView />
</template>

<style scoped>

</style>
