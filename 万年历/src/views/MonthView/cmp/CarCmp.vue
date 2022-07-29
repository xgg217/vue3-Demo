<script setup lang="ts"></script>

<template>
  <div class="car">
    <div class="car-name">
      <p class="car-jr">端午节</p>
      <p class="car-date">2020年6月25日</p>
    </div>
    <p class="car-ms">假期描述：</p>
    <p class="car-jy">拼假建议：</p>
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
