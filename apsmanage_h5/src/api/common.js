import {fetchGet, fetchPost, fetchPut, fetchDelete} from "@/api/axios";

//字典
export const getParameterConfig = () => fetchGet('/customer/parameterConfig/list')

//治具字典
export const getFixtureDictionary = () => fetchGet('/customer/fixtureDictionary/treeList')

//催一下 根据fromRunId查询
export const findByProcessInstanceId = (params) => fetchPost('/flow-able/fromRun/findByProcessInstanceId',params)

//催一下
export const saveAndNoticeRepeat = (params) => fetchPost('/flow-able/pushMessageLog/saveAndNoticeRepeat',params)

//获取所有用户
export const getUserList = (params) => fetchPost('/upms/userInfo/getUserList',params)

//短链接
export const getSmsUrlConvert = (params) => fetchPost('/message-push/messagePush/getSmsUrlConvert',params)
