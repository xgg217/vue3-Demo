<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useUsersStore } from '@/store/route'

const usersStore = useUsersStore()
usersStore.asyncGetRouteListApi()

</script>

<template>
  <div>app</div>
  <RouterView />
</template>

<style scoped>

</style>
