function judgeType (target) {
  return Object.prototype.toString.call(target).slice(8, -1)
}

function deepCopy (obj) {
  let res = null
  let type = judgeType(obj)
  if (type === 'Object') {
    res = {}
  } else if (type === 'Array') {
    res = []
  } else {
    return obj
  }

  for(let i in obj) {
    let value = obj[i]
    let type2 = judgeType(value)
    if (type2 === 'Object' || type2 === 'Array') {
      res[i] = deepCopy(value)
    } else {
      res[i] = value
    }
  }

  return res
}

export default deepCopy