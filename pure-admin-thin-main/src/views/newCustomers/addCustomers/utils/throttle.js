const throttle = (callBack, time = 200) => {
  let timeOut = null
  return (...arg) => {
    if (!timeOut) {
      timeOut = setTimeout(() => {
        callBack(...arg)
        clearTimeout(timeOut)
        timeOut = null
      }, time)
    }
  }
}

export default throttle