<template>
  <div>
    <!--1.计数器案例  -->
    <div>当前计数: {{counter}}</div>
    <div>当前计数*2: {{doubleCounter}}</div>
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
  </div>
</template>

<script lang="ts">
export default {
  name: '',
  data() {
    return {
      counter: 0
    }
  },

  created() {
    
  },

  computed: {
    doubleCounter() {
      return this.counter * 2
    }
  },

  methods: {
    increment() {
      this.counter++
    },
    decrement() {
      this.counter--
    },
    
  },

}
</script>

<style lang="scss" scoped>
</style>