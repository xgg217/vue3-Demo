
/**
 * 将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组。 如果array 无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块
 * @param arr 需要处理的数组
 * @param size 每个数组区块的长度
 * @returns 返回一个包含拆分区块的新数组（注：相当于一个二维数组）
 */
export default function chunk(arr: any[], size = 1) {
  if (size <= 0) {
    return [];
  }

  let start = 0;
  let end = 0;
  const list: any[][] = [];
  const len = arr.length;


  while (end <= len) {
    end = start + size;
    const newArr = arr.slice(start, end);
    list.push(newArr);
    start = end;

  }
  return list;

}