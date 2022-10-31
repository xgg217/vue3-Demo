import { ref } from "vue";

export default function useScrollPosition() {
  const scrollX = ref(0)
  const scrollY = ref(0)

  document.addEventListener('scroll', (e) => {
    scrollX.value = window.screenX
    scrollY.value = window.scrollY
  })

  return {
    scrollX,
    scrollY
  }
}