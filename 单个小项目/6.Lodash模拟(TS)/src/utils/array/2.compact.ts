/**
 * 创建一个新数组，包含原数组中所有的非假值元素。
 * 例如false, null,0, "", undefined, 和 NaN 都是被认为是“假值”
 * @param arr 待处理的数组
 * @returns 返回过滤掉假值的新数组
 */
export default function compact(arr: any[]) {
  return arr.filter(item => {
    return Boolean(item);
    // if(Boolean(item))
  })
}