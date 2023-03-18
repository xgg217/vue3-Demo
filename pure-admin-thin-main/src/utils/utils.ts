/**
 * 获取localStorage
 * @param key localStorage的key
 * @return  格式化之后的localStorage
 */
export function getItem(key) {
  try {
    const local = localStorage.getItem(key)
    if (local) {
      return JSON.parse(local)
    }
    return ''
  } catch (error) {
    console.error(error);
    return ''
  }
}

/**
 * 设置localStorage，会进行JSON.stringify
 * @param key localStorage的key
 * @param obj localStorage的value
 */
export function setItem(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj))
}

/**
 * 删除指定key的localStorage
 * @param key localStorage的key
 */
export function removeItem(key) {
  localStorage.removeItem(key)
}