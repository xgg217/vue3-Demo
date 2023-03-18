import {formatMoneyParser} from "@/utils/utils";

const reg={
  telnumber0: /^1[345789]\d{9}$/, // 手机号码格式
  telnumber: /^1\d{10}$/, // 手机号码格式 改为不严格验证，只验证位数
  zeroAndnumber: /^(\d*)$/, //
  email: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/, // 邮箱
  vehicleNumber1:/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DABCEFGHJK]$)|([DABCEFGHJK][A-HJ-NP-Z0-9][0-9]{4}$))/,  // 2021年新能源车牌不止有DF
  vehicleNumber2:/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/,
}

const requiredValidate = (message='请填写') => {
  return {required: true, message, trigger: 'change'}
}

//四位小数
const fourNumberValidate = (rule, value, callback) => {
  value=formatMoneyParser(value+'')
  let reg = /^\d*(?:\.\d{0,4})?$/;
  if (!reg.test(value) || !value) {
    callback(new Error('请输入正确的数量'))
  }
  else {
    nineNumberValidate(rule, value, callback)
  }
}

//九位数字
const nineNumberValidate = (rule, value, callback) => {
  let v9 = 999999999;
  if (value == '') {
    callback()
  }
  if (Number(value) > v9) {
    callback(new Error('长度超出限制'))
  } else {
    callback()
  }
}
//正整数，长度可以用input的maxlen限制
const initValidate = (rule, value, callback) => {
  let reg = /^[+]{0,1}(\d+)$/;
  if(!value){
    callback()
  }else if(!reg.test(value)) {
    callback(new Error('请输入符合长度的正整数'))
  } else{
    callback()
  }
}

// 为空校验
const spaceValidate = (rule, value, callback) => {
  let reg = /\s*/g;
  if (value.replace(reg, "") === '') {
    callback(new Error('不能为空'))
  } else {
    callback()
  }
}

//最大值最小值比较
const maxNumValidate = (rule, value, callback, maxValue) => {
  console.log(Number(value), Number(maxValue))
  if (Number(value) > Number(maxValue)) {
    callback(new Error('需小于右区间'))
  } else {
    callback()
  }
}
//不为0
const notZeroValidate = (rule, value, callback) => {
  if (value == 0) {
    callback(new Error('右区间不能为0'))
  } else {
    callback()
  }
}


//校验工序是否已经被使用
const workStageValidate = (rule, value, callback, ruleData, isEdit) => {
  //修改状态时不校验
  if (!isEdit && ruleData.some(item => item.workStage == value.replace(/\s*/g, ""))) {
    callback(new Error('工序已存在'))
  } else {
    callback()
  }
}

//校验项目类型是否已经被使用
const projectIdValidate = (rule, value, callback, ruleData,key='projectId') => {
  if (ruleData.some(item => item[key] == value)) {
    callback(new Error('项目类型已存在'))
  } else {
    callback()
  }
}
const checkEmail = async (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入邮箱'))
  }
  if (!reg.email.test(value)) {
    callback(new Error('请输入正确格式邮箱'))
  }
  callback()
}
/* 验证手机 */
const checkPhoneNum = async (rule, value, callback) => {
  let reg =/^1[345789]\d{9}$/;
  if (!value) {
    callback(new Error('请输入电话'))
  }
  if (!reg.test(value)) {
    callback(new Error('请输入正确电话号码'))
  }
  callback()
}

//数组对象重复性校验
const repeatValidate = (rule, value, callback, ruleData, isEdit,key,msg='周别已存在') => {
  //修改状态时不校验
  if (!isEdit && (ruleData || []).some(item => item[key] == value.replace(/\s*/g, ""))) {
    callback(new Error(msg))
  } else {
    callback()
  }
}

/**
 * 车牌号验证（后半部分不能出现I和O，避免与0和1混淆）
 * @param vehicleNumber
 * @returns {*}
 */
const isVehicleNumber=(rule, value, callback)=> {
  if(value?.length == 7){
    if (!reg.vehicleNumber1.test(value)) {
      callback(new Error('请输入正确的车牌号'))
    }else{
      callback()
    }
  } else if(value?.length == 8){
    if (!reg.vehicleNumber2.test(value)) {
      callback(new Error('请输入正确的车牌号'))
    }else{
      callback()
    }
  } else{
    callback(new Error('请输入正确的车牌号'))
  }
}
export default reg
export {
  fourNumberValidate,
  maxNumValidate,
  spaceValidate,
  workStageValidate,
  projectIdValidate,
  notZeroValidate,
  requiredValidate,
  nineNumberValidate,
  checkEmail,
  checkPhoneNum,
  initValidate,
  repeatValidate,
  isVehicleNumber
}
