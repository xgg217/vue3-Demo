<script setup lang="ts">
interface Props {
  name: string; //假日名称
  festival: string; //年月日
  desc: string; //假日描述
  rest: string; //拼假建议
}
// eslint-disable-next-line vue/no-setup-props-destructure
const { name = "", festival = "", desc = "", rest = "" } = defineProps<Props>();
</script>

<template>
  <div class="car">
    <div class="car-name">
      <p class="car-jr">{{ name }}</p>
      <p class="car-date">{{ festival }}</p>
    </div>
    <p class="car-ms">假期描述：{{ desc }}</p>
    <p class="car-jy">拼假建议：{{ rest }}</p>
  </div>
</template>

<style scoped>
.car {
  border-radius: 10px;
  width: 100%;
  border: 1px solid red;
}

.car-name {
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid red;
}

.car-name .car-jr {
  font-size: 30px;
  font-weight: bold;
  color: #ff0000;
}

.car-name .car-date {
  font-size: 20px;
}

.car-ms,
.car-jy {
  padding: 5px;
}
</style>
