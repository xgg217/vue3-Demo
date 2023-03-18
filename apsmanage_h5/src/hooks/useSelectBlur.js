//配合v-r-readonly="[0, 0, 0, 0]" 解决elselect远程搜索在ios上的bug
import {ref,nextTick} from 'vue'
export default (value) => {
  let isShow = ref(true)
  watch(value, async () => {
    isShow.value = false
    await nextTick()
    isShow.value = true
  })
  return {
    isShow
  }
}
