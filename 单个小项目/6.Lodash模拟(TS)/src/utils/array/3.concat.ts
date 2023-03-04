/**
 * 创建一个新数组，将array与任何数组 或 值连接在一起
 * 如果数组里面的值还是数组，将去掉一层
 * @param arr 被连接的数组
 * @param reg 连接的值
 * @returns
 */
export default function concat(arr: any[], ...reg: any[]) {
  // reg.reduce((pre))
  const newArr = [...arr];
  reg.forEach(item => {
    if (Array.isArray(item)) {
      newArr.push(...item);
      return
    }
    newArr.push(item);
  });
  return newArr;
}