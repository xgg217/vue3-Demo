// light 白天
// dark 夜晚
import {ref, computed } from 'vue'
import useDark from "./useDark";
export default function useColorMode() {
//  console.log(useDark());
  const a = ref(useDark())

  const colorMode = computed(() => {
    console.log(a.value);
    
    return useDark().value ? 'dark' : 'light'
  })
  console.log(colorMode.value);
  
 
  
}