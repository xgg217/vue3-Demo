import {fetchGet, fetchPost} from "@/api/axios";

/**
 * v0.1 生产全流程
 * /api/producer{serverName}/schedule/list
 */
const base = '/producer'
// 获取物料齐套列表
export const getWorkOrderList = (params)=>{
  return fetchGet(`${base}/workOrder/list`,params)
}

// 获取物料齐套详情
export const getWorkOrderDetail = (customerNo)=>{
  return fetchGet(`${base}/workOrder/${customerNo}`)
}

// 获取排程信息列表
export const getScheduleList = (params)=>{
  return fetchGet(`${base}/schedule/list`,params)
}

// 获取排程信息详情
export const  getScheduleDetail = (customerNo)=>{
  return fetchGet(`${base}/schedule/${customerNo}`)
}

// 排产/物料齐套搜索
export const getSearchInfo = (params,type='schedule')=>{
  return fetchGet(`${base}/${type}/getOrderNos`,params)
}

/**
 * 0.2备料任务
 */

/* 筛选条件 */
export const queryCondition = (type) => fetchGet(base + '/prepareMaterials/getParams/' + type)

/* 备料任务查询 */
export const queryTaskList = (params) => fetchPost(base + '/prepareMaterials/page', params)

/* 备料任务查询 */
export const queryOvertimeTaskList = (params) => fetchPost(base + '/prepareMaterials/list', params)

/* 备料任务详情 */
export const queryTaskDetailInof = (id) => fetchGet(base + '/prepareMaterials/' + id)

/* 备料完成 */
export const submitMaterialFinish = (params) => fetchPost(base + '/prepareMaterials/updateFinish', params)

/* 发送通知 */
export const submitSendNotice = (params) => fetchPost(base + '/prepareMaterials/sendMessage', params)

/**
 * 0.2.2备料抽检不合格处理
 */
/* 筛选条件 */
export const querySpotCheckCondition = (id) => fetchGet(base + '/sampleCheck/getParams/' + id)
/* 当线人员、上级决议推送列表查询接口 */
export const querySpotCheckList = (params) => fetchPost(base + '/sampleCheck/page', params)
/* 抽检处理超时推送列表查询接口 */
export const querySpotCheckOverTimeList = (params) => fetchPost(base + '/sampleCheck/list', params)
/* 发送通知 */
export const sendSpotCheck = (params) => fetchPost(base + '/sampleCheck/sendMessage', params)
/* 不合格详情 */
export const querySpotCheckDetial = (id, roleType) => fetchGet(base + '/sampleCheck/' + id + '/' + roleType)
/* 处理任务 */
export const submitSpotCheclHandle = (params) => fetchPost(base + '/sampleCheck/submitSc', params)

/**
 * pp4.5.2 设备异常处理
 */
// 列表查询接口
export const queryEquipmentExpList = (params) => fetchPost(base + '/equipmentExp/page', params)

// 详情
export const queryEquipmentExpDetail = (id) => fetchGet(base + `/equipmentExp/detail/${id}`)

// 设备异常单处理
export const submitEquipmentExpHandle = (params) => fetchPost(base + '/equipmentExp/updateTaskStatus', params)

// 发送通知
export const sendEquipmentExp = (params) => fetchPost(base + '/equipmentExp/sendMessage', params)

// 筛选条件
export const queryEquipmentExpCondition = (taskType) => fetchGet(base + '/equipmentExp/getParams/' + taskType)

/* 根据故障代码获取故障原因 */
export const queryEquipmentExpFaultReason = (params) => fetchGet(base + '/equipmentExp/getFaultReason', params)

