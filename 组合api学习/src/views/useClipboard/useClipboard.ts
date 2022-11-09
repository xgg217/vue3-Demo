// 参考 文章
// https://blog.51cto.com/u_15490526/5302321

import { ref, computed } from "vue";
export default function useClipboard() {
  const text = ref('') // 是当前从剪切板读取到的文本
  const copied = ref(false) // copied用于判断是否复制成功

  // isSupported用于判断当前浏览器是否支持剪切板API
  const isSupported = computed(() => {
    // console.log('执行');
    return navigator.clipboard ? true : false
  })

  // navigator.permissions.query({
  //   name: 'clipboard-write'
  // }).then(permissionStatus => {
  //   // permissionStatus.state 的值是 'granted'、'denied'、'prompt':
  //   console.log(permissionStatus.state);
  // });

  /**
   * copy方法 将数据写入到剪切板
   * @param str 要写入的数据
   */
  const copy = (str: string) => {
    navigator.clipboard.writeText(str).then(() => {
      // console.log(res);
      text.value = str
      copied.value = true
    }).catch(err => {
      console.error(err);
      copied.value = false
    })
  }

  /**
   * 粘贴 从剪切板读取数据
   * @returns Promise<string | void>
   */
  const paste = () => {
    return navigator.clipboard.readText().then(res => {
      text.value = res
      return res
    }).catch(err => {
      console.error(err);
    })
  }

  return {
    text,
    isSupported,
    copy,
    paste
  }
}