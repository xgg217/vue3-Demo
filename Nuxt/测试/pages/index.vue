<template>
  <div>
    <UTable :data="userList" class="flex-1">
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

import { ref } from "vue";

// const { userList } = useUserStore();
const userList = ref([]);

const { data } = await useAsyncData("userList", () =>
  $fetch("/api/user", { method: "GET" })
);
console.log(data.value);
userList.value = data.value;

// onMounted(async () => {
//   const { data, pending, refresh } = await useAsyncData("userList", () =>
//     $fetch("/api/user", { method: "GET" })
//   );
//   console.log(data);
//   userList.value = data.value;
// });

// onMounted(async () => {
//   // useAsyncData("/api/user", { method: "GET" })
//   //   .then((res) => {
//   //     console.log(res);
//   //     userList.value = res as any[];
//   //   })
//   //   .catch((err) => {
//   //     console.error(err);
//   //   });
// });
</script>

<style lang="scss" scoped></style>
