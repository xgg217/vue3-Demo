import type { IItem } from './types'
import { Workbook } from 'exceljs'

// 数字枚举
export const NUM = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

// 大写字母枚举
export const LETTER = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
]

// 数字+大写字母枚举
export const NUM_LETTER = [...NUM, ...LETTER]

function incrementBase36(base36Str: string) {
  // 将36进制字符串转换为十进制数字
  let decimalNum = parseInt(base36Str, 36)

  // 对十进制数字加1
  decimalNum++

  // 将十进制数字转换回36进制字符串，并转换为大写（如果需要）
  let newBase36Str = decimalNum.toString(36).toUpperCase()

  // 如果需要保持原字符串的长度（通过前置0填充），则进行填充
  // 假设我们想要保持原字符串的长度
  const originalLength = base36Str.length
  newBase36Str = newBase36Str.padStart(originalLength, '0')

  return newBase36Str
}

// 按照顺序生成指定数量 SSS
export const getSSS = (str: string, num: number) => {
  const arr = [str]
  // const ind = 100
  while (arr.length < num) {
    const str = arr[arr.length - 1]
    const s = incrementBase36(str)
    arr.push(s)

    const v = arr[arr.length - 1]
    if (v === 'ZZZ') {
      break
    }
  }
  // console.log(arr);
  return arr
}

// 生成校验位
function luhnCheckChars(s: string) {
  const b = 36
  let sum = 0
  let f = 2
  let n = s.length

  // First pass
  for (let i = n - 1; i >= 0; i--) {
    let c = s.charCodeAt(i)
    if (c >= 65) {
      c = c - 55
    } else {
      c = c - 48
    }
    let add = c * f
    add = Math.floor(add / b) + (add % b)
    sum += add
    f = 2 / f
  }

  sum = sum % b
  sum = (b - sum) % b
  const c = sum >= 10 ? sum + 55 : sum + 48
  s = s.slice(-10) + String.fromCharCode(c)

  n = s.length

  for (let i = n - 1; i >= 0; i--) {
    let c2 = s.charCodeAt(i)
    if (c2 >= 65) {
      c2 = c2 - 55
    } else {
      c2 = c2 - 48
    }
    let add = c2 * f
    add = Math.floor(add / b) + (add % b)
    sum += add
    f = 2 / f
  }

  sum = sum % b
  sum = (b - sum) % b
  const c2 = sum >= 10 ? sum + 55 : sum + 48

  return String.fromCharCode(c) + String.fromCharCode(c2)
}

export const getSNCode = (row: IItem) => {
  const { AAAA, A, Y, WW, L, SSS, num } = row

  // const arr: IItem[] = []
  console.log(AAAA, A, Y, WW, L, SSS, num)

  const arr = getSSS(SSS, num).map((item) => {
    const str = `${AAAA}${A}${Y}${WW}${L}${item}`

    const code = luhnCheckChars(str)

    return str + code
  })
  // console.log(a)
  return arr
}

// 生成excel
export const getExcel = (arr: string[]) => {
  const wb = new Workbook()

  const Sheet1 = wb.addWorksheet('Sheet1')
  Sheet1.columns = [
    { header: '序号', key: 'id', width: 20 },
    { header: 'CUSTOMER_SN', key: 'sn', width: 30 }
  ]

  const data: any[] = []

  arr.forEach((item, index) => {
    data.push({
      id: index + 1,
      sn: item
    })
  })
  Sheet1.addRows(data)

  wb.xlsx
    .writeBuffer()
    .then((data) => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = 'SN码.xlsx'
      const event = new MouseEvent('click')
      a.dispatchEvent(event)
    })
    .catch((error) => {
      console.error(error)
    })
}
