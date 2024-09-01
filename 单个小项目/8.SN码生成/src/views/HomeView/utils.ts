import type { IItem } from './../types'
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

const getRandomColor = () => {
  return Math.random().toString(36).substring(2, 4).toLocaleUpperCase().padEnd(2, '0')
}

export const getSNCode = (row: IItem) => {
  const { AAAA, A, Y, WW, L, SSS, num } = row

  // const arr: IItem[] = []
  console.log(AAAA, A, Y, WW, L, SSS, num)

  const arr = getSSS(SSS, num).map((item) => {
    return `${AAAA}${A}${Y}${WW}${L}${item}${getRandomColor()}`
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
