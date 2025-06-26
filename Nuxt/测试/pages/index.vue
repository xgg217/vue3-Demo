<template>
  <div>
    <UTable :data="userList" class="flex-1">
      <template #name-cell="{ row }">
        <p>1</p>
      </template>
    </UTable>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/index";

const { userList } = useUserStore();
</script>

<style lang="scss" scoped></style>
