<template>
  <!-- 登录人-->
  <div class="login-info">
    {{ userStore.nickName }} {{ getYMDHM(new Date()) }}
  </div>
</template>

<script setup>
import {useUserStore} from "@/store";
import {getYMDHM} from "@/utils/timeFormat";

let userStore = useUserStore()

const props = defineProps({
  height: {
    type: String,
    default: '60px'
  },
})
</script>

<style scoped lang="scss">
.login-info {
  box-sizing: border-box;
  height: v-bind(height);
  line-height: v-bind(height);
  width: 100%;
  font-size: 12px;
  color: $d-gray;
  padding-right: 20px;
  text-align: right;
}

</style>
