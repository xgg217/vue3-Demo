import type {Ref} from 'vue'
import { ref, watchEffect } from 'vue'
export default function useTitle(title?: string | Ref<string> | undefined | null) {
  const titleRef = ref(title)
  // if (title) {
  //   document.title = title
  // }
  // return {
  //   title
  // }

  watchEffect(() => {
    document.title = titleRef.value || ''
  })

  return titleRef
}
