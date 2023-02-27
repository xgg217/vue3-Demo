<script setup lang="ts">
import { RouterView } from 'vue-router'
import router from './router/index';
import { useUsersStore } from '@/store/route'
import { generateRouter, routerBeforeEach } from '@/router/utils'

const usersStore = useUsersStore()
// console.log(usersStore);

routerBeforeEach(router, useUsersStore())

usersStore.asyncGetRouteListApi().then(() => {
  const routers = generateRouter(usersStore.routeTree)
  // console.log(routers);

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
