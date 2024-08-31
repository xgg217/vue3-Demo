import type { IItem } from './../types'

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

// 按照顺序生成指定数量 SSS

// 数字+大写字母枚举
export const NUM_LETTER = [...NUM, ...LETTER]

export const getSNCode = (row: IItem) => {
  const { AAA, A, Y, WW, L, SSS, num } = row

  const arr: IItem[] = []

  // let index = 0;
  // while(index < num) {

  // }
}
