import type { IItem,IDate } from './types'
import dayjs from 'dayjs'
import Big from 'big.js'

// Big.strict =

const len = 60

// 根据时间计算时长
export const getDateLen = (arr1: IDate, arr2: IDate) => {
  // 下午
  const a = getLen(arr1)
  // 晚上
  const b = getLen(arr2)
  // 上午
  // const c = getLen(arr3)
  return a.plus(b).toNumber();
}

// 计算两个区间的时长
export const getLen = (arr: IDate):Big.Big => {
  // let [s, e] = arr
  const s = arr[0];
  let e = arr[1];

  if(e === '00:00') {
    e = '24:00'
  }

  if (s && e) {
    const s1 = dayjs(`2020-01-01 ${s}:00`)
    const e1 = dayjs(`2020-01-01 ${e}:00`)
    const a = e1.diff(s1, 'm')

    return Big(a).div(len)
  }

  return Big(0)
}

// 生成文字
export const getTitle = (arr: IItem[]):string[] => {
  // const list:string = [];

  return arr.filter(item => {
    const { xwS,xwE, wsS,wsE} = item;
    if(xwS && xwE) {
      return true;
    }

    if(wsS && wsE) {
      return true;
    }
    return false
  }).map(item => {
    const {day, xwS,xwE, wsS,wsE,tj} = item;
    let str = `${day}号`

    if(xwS && xwE) {
      str += ` ${xwS}-${xwE}`
    }

    if(wsS && wsE) {
      const end = (wsE === '00:00' ? '24:00' : wsE)
      str += ` ${wsS}-${end}`
    }

    str += ` 共${tj}小时`

    return str;
  })

}
