import { ref } from 'vue'
import { ElLoading } from 'element-plus'

/**
 *
 * @param props {
 *   immediate onMounted执行
 *   ... 覆盖ElLoading参数
 * }
 * @return {{closeLoading: closeLoading, openLoading: openLoading, loading: *}}
 */
export default (props={}) => {
  let config={
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
    ...props
  }
  const loading = ref(false) // loading
  const openLoading = () => {
    loading.value = ElLoading.service(config)
  }
  const closeLoading = () => {
    loading.value.close()
  }
  onMounted(()=>{
    props.immediate && openLoading()
  })

  return {
    loading,
    openLoading,
    closeLoading
  }
}
