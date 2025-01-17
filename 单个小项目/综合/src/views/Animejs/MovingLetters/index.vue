<template>
  <ul>
    <li><ThursdayCmp></ThursdayCmp></li>
    <li>
      <SunnyMorningsCmp></SunnyMorningsCmp>
    </li>
    <li>
      <GreatThinkersCmp></GreatThinkersCmp>
    </li>
    <li>1</li>
  </ul>
</template>

<script setup lang="ts">
import ThursdayCmp from "./cmp/ThursdayCmp.vue";
import SunnyMorningsCmp from "./cmp/SunnyMorningsCmp.vue";
import GreatThinkersCmp from "./cmp/GreatThinkersCmp.vue";
</script>

<style scoped>
ul {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 500px);
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
  /* border: 1px solid #000; */
}
</style>
