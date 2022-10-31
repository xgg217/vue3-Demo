import { ref, watchEffect } from "vue";

export default function useTitle(title: string = '默认标题') {
  const titleRef = ref(title);
  watchEffect(() => {
    document.title = titleRef.value;
  })
  return titleRef
}
