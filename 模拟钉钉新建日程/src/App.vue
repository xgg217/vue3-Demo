<script setup lang="ts">
import { ref } from "vue";
import asios from "axios";
import DialogDate from "@/components/DialogDate.vue";

const {
  dialogIndex,
  dialogVisible,
  handleOpenDialog
} = (function() {
  const dialogIndex = ref(0);
  const dialogVisible = ref(false);

  const handleOpenDialog = () => {
    dialogIndex.value++;
    dialogVisible.value = true;
  }

  // 发送日程数据
  const asyncSendSchedule = () => {
    return asios.get('/api/schedule').then(res => {
      console.log(res);
    });
  }


  return {
    dialogVisible,
    dialogIndex,
    handleOpenDialog
  }
})();


</script>

<template>
  <button @click="handleOpenDialog">打开日程</button>

  <el-dialog
    v-model="dialogVisible"
    title="新建日程"
    width="800px"
  >
    <DialogDate :index="dialogIndex" />
</el-dialog>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
