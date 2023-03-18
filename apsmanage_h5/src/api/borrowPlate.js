import {fetchGet, fetchPost} from "@/api/mesAxiosEX";

/**
 *  借板
 */
const base = '/v1/borrow-board'

// 创建IPQC借板申请记录
export const ipqcCreate= (params)=>{
  return fetchPost(`${base}/borrow/ipqc/create`,params)
}

// IPQC-申请人确认归还
export const ipqcConfirm = (id,params)=>{
  return fetchPost(`${base}/return/${id}/ipqc-confirm-return`,params)
}

// IPQC-组长确认归还借板
export const acceptReturn = (id)=>{
  return fetchPost(`${base}/return/${id}/accept-return`)
}

// 驳回借板申请
export const rejectBorrow = (id,params)=>{
  return fetchPost(`${base}/borrow/${id}/reject`,params)
}

// 申请记录-增加电话信息
export const insertPhone = (id,params)=>{
  return fetchPost(`${base}/borrow/${id}/insert-phone`,params)
}

// 创建其他借板申请
export const otherCreate = (params)=>{
  return fetchPost(`${base}/borrow/other/create`,params)
}
// 接收人确认借板
export const recipientConfirm = (params)=>{
  return fetchPost(`${base}/borrow/recipient/confirm`,params)
}

// 查询申请记录列表
export const getBorrowList = (params)=>{
  return fetchGet(`${base}/borrow/page-list`,params)
}

// 查看申请记录详情
export const getBorrowDetail = (id,params)=>{
  return fetchGet(`${base}/borrow/${id}`,params)
}

// 其他人-申请人确认归还
export const otherConfirm = (id,params)=>{
  return fetchPost(`${base}/return/${id}/other-confirm-return`,params)
}
// 其他人-半成品仓管员确认接收报废板
export const receiveScrapBoard = (id)=>{
  return fetchPost(`${base}/return/${id}/receive-scrap-board`)
}

// 其他人-当线组长确认接收良品
export const receiveBoard = (id)=>{
  return fetchPost(`${base}/return/${id}/receive-non-defective-board`)
}

// 根据SN获取信息
export const getDetailBySnCode = (sn_code)=>{
  return fetchGet(`${base}/borrow/getSnInfo/${sn_code}`)
}

// 查看厂外接收人确认详情
export const getBoardDetail = (params)=>{
  return fetchGet(`${base}/borrow/offsiteDetail`,params)
}
// 接收人发送验证码
export const sendVerifyCode = (params)=>{
  return fetchPost(`${base}/sms/send-verify-code`,params)
}
