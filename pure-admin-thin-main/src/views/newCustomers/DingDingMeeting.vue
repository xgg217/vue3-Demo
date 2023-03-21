<script setup lang='ts'>
import { onMounted, ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DingDingMeetingAppointment from '@/components/DingDingMeetingAppointment.vue'

/* 路由 */
const router = useRouter()
const route = useRoute()

let ids = ref(''); // 会议ID


// 取消预约
const handleClose = () => {
  router.replace({name: 'newCustomers'})
}

onMounted(() => {
  const { query } = route;

  ids.value = query.id as string;
})
</script>

<template>
  <el-card class="box-card">
    <DingDingMeetingAppointment
      :ids="ids"
      @save="handleClose"
      @close="handleClose"
    />
  </el-card>
</template>

<style scoped>

</style>
