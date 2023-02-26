<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useUsersStore } from '@/store/route'
import { generateRouter } from '@/router/utils'

const usersStore = useUsersStore()
console.log(usersStore);

usersStore.asyncGetRouteListApi().then(() => {
  // useUsersStore.routeTree
  // console.log(usersStore.routeTree);
  const routers = generateRouter(usersStore.routeTree)
  console.log(routers);




}).catch(err => {
  console.error(err);
})

</script>

<template>
  <div>app</div>
  <RouterView />
</template>

<style scoped>

</style>
