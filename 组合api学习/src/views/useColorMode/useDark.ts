// light 白天
// dark 夜晚
import { ref } from 'vue'
type Color = 'light' | 'dark'
export default function useColorMode() {
  const colorMode = ref<Color>('light') // light 白天 dark 夜晚

  colorMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

  // 监听系统主题变化
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    console.log(e.matches);
    if(e.matches){
      colorMode.value = 'dark'
    }else{
      colorMode.value = 'light'
    }
    
  })
  return colorMode
  
}