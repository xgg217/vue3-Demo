import { ref, onUnmounted } from 'vue'
import { inBrowser } from '@/utils/browser'


export default function useWindowSize() {
  const width = ref(0)
  const height = ref(0)

  // 已经存在值
  if(width.value) {
    return {
      width,
      height
    }
  }

  // 非浏览器环境
  if(!inBrowser) {
    return {
      width,
      height
    }
  }

  const update = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  update(); // 初始化

  window.addEventListener('resize',update, { passive: true })

  // 页面旋转时触发
  window.addEventListener('orientationchange',update, { passive: true })


  // 页面卸载时移除监听
  onUnmounted(() => {
    window.removeEventListener('resize', update)
    window.removeEventListener('orientationchange', update)
  })


  return {
    width,
    height
  }
}