let debounce = (callBack, time = 200) => {
  let timeOut = null
  return (arg) => {
    if (timeOut) {
      clearTimeout(timeOut)
    }
    timeOut = setTimeout(() => {
      callBack(arg)
    }, time)
  }
}

export default debounce