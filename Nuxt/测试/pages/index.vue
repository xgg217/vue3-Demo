<template>
  <div>
    <UTable :data="data" class="flex-1">
      <UDropdownMenu>
        12
        <!-- <UButton
          label="Columns"
          color="neutral"
          variant="outline"
          trailing-icon="i-lucide-chevron-down"
          class="ml-auto"
          aria-label="Columns select dropdown"
        /> -->
      </UDropdownMenu>
    </UTable>
  </div>
</template>

<script setup lang="ts">
// import { useUserStore } from "~/stores/index";

const { data } = await useFetch("/api/user", { method: "GET" });
</script>

<style lang="scss" scoped></style>
