import dayjs from 'dayjs'
export const getYMDHM = (time, space = '-') => {
  const date = new Date(+time)

  if (space === 'unit') {
    return `${date.getFullYear()}年${pad0(date.getMonth() + 1)}月${pad0(date.getDate())}日 ${pad0(date.getHours())}:${pad0(date.getMinutes())}`
  }

  return `${date.getFullYear()}${space}${pad0(date.getMonth() + 1)}${space}${pad0(date.getDate())} ${pad0(date.getHours())}:${pad0(date.getMinutes())}`
}

export const getYMDHMS = (time, space = '-') => {
  let date = new Date(+time)

  if (space == "unit") {
    return `${date.getFullYear()}年${pad0(date.getMonth() + 1)}月${pad0(date.getDate())}日 ${pad0(date.getHours())}:${pad0(date.getMinutes())}:${pad0(date.getSeconds())}`
  }

  return `${date.getFullYear()}${space}${pad0(date.getMonth() + 1)}${space}${pad0(date.getDate())} ${pad0(date.getHours())}:${pad0(date.getMinutes())}:${pad0(date.getSeconds())}`
}

export const getYMD = (time, space = '-') => {
  const date = new Date(time)
  if (space === 'unit') {
    return `${date.getFullYear()}年${pad0(date.getMonth() + 1)}月${pad0(date.getDate())}日`
  }

  return `${date.getFullYear()}${space}${pad0(date.getMonth() + 1)}${space}${pad0(date.getDate())}`
}

export const getWeek = (time) => {
  const sTime = dayjs(time).startOf("week").format("YYYY-MM-DD")
  const eTime = dayjs(time).format("YYYY-MM-DD")

  return {
    start: sTime,
    end: eTime
  }
}

export const getMonth = (time) => {
  const sTime = dayjs(time).startOf("month").format("YYYY-MM-DD")
  const eTime = dayjs(time).format("YYYY-MM-DD")

  return {
    start: sTime,
    end: eTime
  }
}

function pad0 (str = '', count = 2) {
  let padStr = ''
  str = str + ''
  const add = count - str.length
  if (add > 0) {
    for (let i = 0; i < add; ++i) {
      padStr += '0'
    }
  }
  return padStr + str
}

export const getDataSection = () => {
  let hoursTip='';
  let date=new Date();
  if(date.getHours()>=0&&date.getHours()<12){
    hoursTip="上午好"
  }else if(date.getHours()>=12&&date.getHours()<18){
    hoursTip="下午好"
  }else{
    hoursTip="晚上好"
  }
  return hoursTip
}


