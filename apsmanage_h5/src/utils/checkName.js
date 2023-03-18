export default (value, name, length) => {
  // if (!value) return name + "不能为空！"
  if (value.toString().length > length) { // 长度限制
    return  name + '不能超过' + length + '位字符！'
  }

  const numRxp = /\d/
  if (numRxp.test(value)) {
    return  name + '不能包含数字！'
  }

  const regex = new RegExp("[`~!#$^%&*()=|{}':;',.\\[\\]<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]") // 特殊字符限制
  for(let i = 0 ; i < value.length ; i++){
      let a = value[i]
      if(regex.test(a)){       
        return name + "不能含有特殊字符！"
      }
  }
  return false
}