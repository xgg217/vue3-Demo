<script setup lang="ts"></script>

<template>
  <div class="car">
    <div class="car-name">
      <p class="car-jr">端午节</p>
      <p class="car-date">2020年6月25日</p>
    </div>
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
</style>
