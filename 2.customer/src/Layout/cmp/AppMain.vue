<template>
  <Suspense>
    <template #default>
      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.name" mode="out-in">
          <keep-alive>
            <component
              :is="Component"
              :key="route.path"
            />
          </keep-alive>
        </transition>
      </router-view>
    </template>
    <template #fallback>加载中...</template>
  </Suspense>
</template>
