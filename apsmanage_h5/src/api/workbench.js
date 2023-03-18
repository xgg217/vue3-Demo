import {fetchGet, fetchPost, fetchPut, fetchDelete} from "@/api/axios";

const baseRoute = "/saas/"

//获取app版本
export const getAppVersion = () => fetchGet(baseRoute+ 'appVersion/getOneAppInfo',{},{ notify: true })

/** 工作指标 */
//指标列表查询
export const getKpiList = (params) => fetchPost(baseRoute + 'kpi/getPageListNew',params)

//设定指标
export const kpiSave = (params) => fetchPost(baseRoute + 'kpi/save',params)

//修改指标
export const kpiUpdate = (params) => fetchPost(baseRoute + 'kpi/update',params)

//删除指标
export const kpiDelete = (id) => fetchDelete(baseRoute + `kpi/delete?id=${id}`)

//指标详情
export const kpiDetail = (params) => fetchGet(baseRoute + 'kpi/getKpiDetail',params)

//分配指标
export const kpiAssign = (params) => fetchPost(baseRoute + 'kpi/assignKpi',params)

//指标详情-指标分配
export const kpiAssignDetail = (params) => fetchGet(baseRoute + 'kpi/assignDetail',params)

//设定指标-关联指标
export const getKpiRelation = () => fetchGet(baseRoute + `kpi/getRelationKpi`)

//设定指标-获取当前用户下级组织字典
export const getCurrUserOrg = () => fetchGet(baseRoute + `upms/getCurrUserOrg`)

//指标未读数量
export const getUserKpiQty = () => fetchGet(baseRoute + `kpi/getUserKpiQty`)

//指标修改已读
export const updateReadFlag = (assignId) => fetchGet(baseRoute + `/kpi/updateReadFlag?assignId=${assignId}`)

/* 工作任务 */
/* 我的任务列表 */
export const queryWorkTaskList = (params) => fetchPost(baseRoute + 'workTask/list', params)
/* 未读总记录数 */
export const queryUnreadNum = (params) => fetchPost(baseRoute + "workTask/getReadStatusCount", params )
/* 修改消息未读状态 */
export const updateUnresdStatus = (id) => fetchPut(baseRoute + "workTask/updateReadStatus?taskId=" + id )

/* 常用流程 */
/* 流程列表 */
export const queryProcessList = (params) => fetchPost(baseRoute + 'common/flowable/pageInfo', params)
/* 未读总数 */
export const queryProcessUnreadNum = () => fetchPost(baseRoute + 'common/flowable/countReadStatus')
/* 流程改已读 */
export const updateProcessUnresdStatus = (id) => fetchPut(baseRoute + 'common/flowable/updateReadStatus?id=' + id)

//获取所有组织部门
export const getOrg = () => fetchGet(baseRoute + 'upms/getOrg/1/1-1',{},{ notify: true })

//经营报告
export const getReportData = () => fetchGet(baseRoute + 'reportCatalogue/tree')
