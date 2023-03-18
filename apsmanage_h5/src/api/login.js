import {fetchGet, fetchPost} from "@/api/axios";

//获取验证码
export const getVerificationCode = (phone) => fetchPost(`/saas/app/phoneVerificationCodeLogin?phone=${phone}`)

//验证码登陆
export const verificationCodeLogin = (params) => fetchPost(`/saas/app/login?phone=${params.phone}&code=${params.code}`)

//获取工作台权限
export const getAppRootsDescribe = (params) => fetchGet(`/upms/saasUser/getAppRootsDescribe`,params,{ notify: true })

//获取部门组织树
export const getOrgDescribe = (params) => fetchGet(`/upms/saasUser/getOrgDescribe`,params,{ notify: true })

//获取页面权限
export const getPageInfoIds = (params) => fetchGet(`/upms/menuAuthRoleMapping/getPageInfoIds`,params,{ notify: true })

//获取首页未读条数
export const getAppUnread = () => fetchPost(`/saas/app/homePage/countReadStatus`,{},{ notify: true })

