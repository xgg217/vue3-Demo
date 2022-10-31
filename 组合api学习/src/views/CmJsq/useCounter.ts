import { ref, computed } from "vue";

export default function useCounter() {
  const counter = ref(0);
  const increment = () => {
    counter.value++;
  }

  const doubleCounter = computed(() => {
    return counter.value * 2;
  })
  
  const decrement = () => {
    counter.value--;
  }

  return {
    counter,
    doubleCounter,
    increment,
    decrement
  }
}
