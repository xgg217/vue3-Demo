import type { IDate } from './types'
import dayjs from 'dayjs'
import Big from 'big.js'

const len = 60

// 根据时间计算时长
export const getDateLen = (arr1: IDate, arr2: IDate, arr3: IDate) => {
  // 下午
  const a = getLen(arr1)
  // 晚上
  const b = getLen(arr1)
  // 上午
  const c = getLen(arr1)

  return [a, b, c].reduce((acc, item) => {
    return new Big(acc).plus(item)
  }, 0)
}

// 计算两个区间的时长
export const getLen = (arr: IDate) => {
  const [s, e] = arr
  // console.log(arr)
  // return 0

  if (s && e) {
    const s1 = dayjs(`2020-01-01 ${s}:00`)
    const e1 = dayjs(`2020-01-01 ${e}:00`)
    const a = e1.diff(s1, 'm')

    // console.log(s1, e1, a)

    return Big(a).div(len).toNumber()
  }

  return 0
}
