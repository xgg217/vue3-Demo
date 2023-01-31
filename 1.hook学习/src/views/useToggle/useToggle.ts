import { ref } from 'vue'
import type { Ref } from 'vue'

// interface UseToggle {
//   state: Ref<boolean>,

// }


export default function useToggle(defaultValue:boolean = false){
  const state = ref(defaultValue)

  const toggle = (value = !state.value) => {
    state.value = value
  }

  return [
    state,
    toggle
  ] as const
}