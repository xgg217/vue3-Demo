import {fetchGet, fetchPost, fetchPut, fetchDelete} from "@/api/businessAxiosEX";
import { useBusinessStore } from "@/store/business"
import { getYMDHMS } from '@/utils/timeFormat'

const { id, protocolId } = storeToRefs(useBusinessStore())

/**
 * v0.5版本
 * 业务全流程
 */
/* 分页查询客户信息列表 */
export const customerPageList = (params) => fetchPost('/customer/pageInfo', params)

/* 新增客户需求 */
export const addCustomerDemand = (params) => fetchPost('/customer_needs/save', params)

/* 更新客户需求 */
export const updataCustomerDemand = (params) => fetchPut('/customer_needs/update', params)

/* 新增客户 */
export const addCustomer = (params) => fetchPost('/customer/save', params)

/* 更新客户 */
export const updateCustomer = (params) => fetchPut('/customer/update_relation', params)

/* 查询客户 */
export const checkCustomer = (params) => fetchPost('/customer/list', params)

/* 新增产品 */
export const addProduct = (params) => fetchPost('/product/save', params)

/* 查询产品 */
export const checkProduct = (params) => fetchPost('/product/list', params)

/* 上传文件 */
export const upload = (params) => fetchPost('/file/upload', params, { headers: { 'Content-Type': 'multipart/form-data' } })

/* 上传文件 */
export const batchUpload = (params) => fetchPost('/file/batch_upload', params, { headers: { 'Content-Type': 'multipart/form-data' } })

/* 查询客户详情 */
export const customerDetailInfo = (id) => fetchGet('/customer_needs/' + id)

/* 修改客户状态 */
export const changeCustomerState = (params) => fetchPut('/customer/updateStatus', { id: id.value, ...params })

/* 保存会议记录 */
export const saveMeeting = (params) => fetchPost('/meetingLog/save', {  ...params })

/* 审批 */
export const saveApproval = (params) => fetchPost('/approvalLog/save', {  ...params })

/* 获取会议信息 */

/* 下载文档 */
export const downloadBusiness = (id) => fetchGet('/file/downloadBusiness', { businessId: id })

/**
 * 0.6接口
 */
/* 查看客户信息预览 */
export const customerInfo = (id) => fetchGet('/processProtocol/customer_info/' + id)

/* 分发初版加工协议 */
export const distributeProtocol = (params) => fetchPost('/processProtocol/save', { ...params })

/* 录入问题 */
export const entryQuestionsSave = (params) => fetchPost('/problemLog/save', {customerBaseId: id.value, createdTime: getYMDHMS(new Date()), problemLog: params })

/* 删除问题 */
export const deleteQuestionById = (id) => fetchDelete('/problemLog/del', { id })
/* 回复问题 */
export const answerQuestionsSave = (params) => fetchPost('/replyLog/save', { customerBaseId: id.value, createdTime: getYMDHMS(new Date()), replyLog: params })

/* 保存评审信息 */
export const saveEvaluateinfo = (params) => fetchPost('/processProtocol/legal_evaluate', {  protocolId: protocolId.value, ...params })

/* 更新评审信息 */
export const updateEvaluateinfo = (params) => fetchPut('/processProtocol/updateFile', { protocolId: protocolId.value, ...params })

/* 法务修改加工协议 */
export const editEvaluateinfo = (params) => fetchPut('/processProtocol/update_legalEvaluate', {  protocolId: protocolId.value, ...params })

/* 确认 待回签协议  */
export const offlineBridgeInput = (params) => fetchPut('/processProtocol/result_input', {  protocolId: protocolId.value, ...params })

/* 确认 上传回签协议 */
export const saveUploadSignPro = (params) => fetchPut('/processProtocol/upload_signBack', {  protocolId: protocolId.value, ...params })

/**
 * 0.7.1
 */

// 查询客户信息列表
export const getHttpQualifyList = (params) => fetchPost(`/customer/qualify_list`, params)

/* 查询客户报价规则详情  */
export const getHttpCustomerOfferRules = (customerId) => fetchGet(`/customerOfferRules/${customerId}`)

/* 新增客户报价规则*/
export const saveHttpCustomerOfferRules = (params) => fetchPost('/customerOfferRules/save', params)

/* 修改客户报价规则*/
export const editHttpCustomerOfferRules = (params) => fetchPut('/customerOfferRules/edit', params)

/* 查询客户报价规则操作记录*/
export const getHttpCustomerOfferRulesHistory = (materialId) => fetchGet(`/customerOfferRules/rulesRecord/${materialId}`)

/**
 * 0.7.2
 */

// 发起报价
export const startHttpOffer = (params) => fetchPost('/internalOffer/startOffer', { ...params })

// 查询客户报价业务需求详情(根据客户id)
export const getHttpInternalOfferBusinessInfo = (customerId) => fetchPost(`/internalOffer/customer_business_info/${customerId}`)

// 上传我司bom文件
export const uploadBomFile = (params) => fetchPost('/internalOffer/bomFile', params, { headers: { 'Content-Type': 'multipart/form-data' } })

// bom历史记录
export const getHttpBomUpdateRecord = (offerId) => fetchGet(`/internalOffer/bomUpdateRecord/${offerId}`)

// 保存我司BOM
export const saveHttpBom = (params) => fetchPost(`/internalOffer/saveBom`, params)

// 待检查BOM
export const checkHttpBom = (params) => fetchPost(`/internalOffer/checkBom`, params)

// 工程报价-确认报价
export const saveHttpProjectOffer = (params) => fetchPost('/projectOffer/confirm', { ...params })

// 工程报价-查看报价详情
export const getHttpProjectOffer = (offerId) => fetchGet(`/projectOffer/${offerId}`)

// 工程报价-退回-重新报价
export const putHttpProjectOffer = (params) => fetchPut(`/projectOffer/reQuote`, params)

// 工程报价-修改记录
export const getHttpProjectOfferHistory = (offerId) => fetchGet(`/projectOffer/updateRecord/${offerId}`)

// 工程报价-获取治具钢网报价基础数据
export const getHttpFixtureOffer = () => fetchGet(`/projectOffer/getFixtureOffer`)

// 关务报价-确认报价
export const saveHttpCustomsOffer = (params) => fetchPost('/customsOffer/confirm', params)

// 关务报价-查看报价详情
export const getHttpCustomsOffer = (offerId) => fetchGet(`/customsOffer/${offerId}`)

// 关务报价-退回-重新报价
export const putHttpCustomsOffer = (params) => fetchPut(`/customsOffer/reQuote`, params)

// 关务报价-修改记录
export const getHttpCustomsOfferHistory = (offerId) => fetchGet(`/customsOffer/updateRecord/${offerId}`)

// 物流报价-确认报价
export const saveHttpLogisticsOffer = (params) => fetchPost('/logisticsOffer/confirm', params)

// 物流报价-查看报价详情
export const getHttpLogisticsOffer = (offerId) => fetchGet(`/logisticsOffer/${offerId}`)

// 物流报价-退回-重新报价
export const putHttpLogisticsOffer = (params) => fetchPut(`/logisticsOffer/reQuote`, params)

// 物流报价-修改记录
export const getHttpLogisticsOfferHistory = (offerId) => fetchGet(`/logisticsOffer/updateRecord/${offerId}`)

//物料报价-上传报价
export const setHttpInternalOfferUpload = (params) => fetchPost(`/materialOffer/uploadOffer`, params, { notify: true })

//物料报价-再次上传报价
export const setHttpInternalOfferAgainUpload = (params) => fetchPost(`/materialOffer/uploadAgainOffer`, params, { notify: true })

//物料报价-Sourcing报价详情
export const getHttpMaterialSourcingOfferDetail = (offerId) => fetchGet(`/materialOffer/materialOfferDetail/${offerId}`)

//物料报价-Sourcing报价-待采购组长选择
export const getHttpMaterialSourcingOffer = (params) => fetchPost(`/materialOffer/materialSourcingOffer`, params)

//物料报价-汇总详情
export const getHttpMaterialOfferSummaryDetail = (offerId) => fetchGet(`/materialOffer/materialOfferSummaryDetail/${offerId}`)

//物料报价-修改默认选中物料报价
export const getHttpUpdateSelectMaterialOffer = (params) => fetchPost(`/materialOffer/updateSelectMaterialOffer`, params)

//物料报价-待其他岗位报价
export const getHttpMaterialOffer = (params) => fetchPost(`/materialOffer/materialOffer`, params, { notify: true })

//物料报价-催一下,没有报价物料
export const getHttpUrgeOfferMaterial = (params) => fetchPost(`/materialOffer/urgeOfferMaterial`, params)

//物料报价-退回-重新报价
export const putHttpReQuote = (params) => fetchPut(`/materialOffer/reQuote`, params)

//报价预览
export const getHttpOfferOrderPreview = (offerId) => fetchGet(`/internalOffer/offerOrder/preview/${offerId}`)

//多项报价退回-重新报价
export const setHttpMultiple = (params) => fetchPut(`/internalOffer/multiple/reQuote`, params)

//查询报价汇率
export const getHttpExchangeRate = (offerId) => fetchGet(`/internalOffer/exchangeRate/${offerId}`)

//查询人手调整，才会有“修改记录”
export const getHttpProcessFeeOfferRecord = (offerId) => fetchGet(`/internalOffer/processFeeOfferRecord/${offerId}`)

//加工费列表
export const getHttpProcessFeeOfferList = (offerId) => fetchGet(`/internalOffer/processFeeOfferList/${offerId}`)

//Sourcing人名列表
export const getHttpSourcingList = (offerId) => fetchGet(`/materialOffer/sourcingList/${offerId}`)

//催一下
export const getHttpUrgeAllOffer = (params) => fetchPost(`/internalOffer/urgeOffer`, params)

//手工调价
export const postHttpUpdateManualAdjustPrice = (params) => fetchPost(`internalOffer/updateManualAdjustPrice`, params)

//修改加工费率
export const postHttpUpdateProcessExchange = (params) => fetchPost(`internalOffer/updateProcessExchange`, params)

//调整报价-确认发起审批
export const postHttpConfirmApproval = (offerId) => fetchPost(`/internalOffer/confirmApproval?offerId=${offerId}`)

//去建档-补业务需求表
export const putHttpOnRecord = (params) => fetchPost(`/internalOffer/putOnRecord`, params)

//内部报价-催一下接收人
export const getHttpUrgeReceiverList = (params) => fetchGet(`/internalOffer/urgeReceiverList`, params)

//外发报价-董事长审批 /退回
export const postHttpSuperApproval = (params) => fetchPost(`/out_offer/approval`, params)

//外发报价-发送客户(更新客户状态为待客户确认)
export const postHttpSendToCustomer = (offerId) => fetchPut(`/internalOffer/updateStatus?offerId=${offerId}`)

//外发报价-保存报价备注
export const postHttpQuotaNote = (params) => fetchPost(`/quoteRemarks/save`, params)

//外发报价-根据ID查查询报价备注
export const getHttpQuotaNote = (params) => fetchGet(`/quoteRemarks/find`, params)

//外发报价-确认发给客人
export const sendToCustomer = (params) => fetchPost(`/out_offer/sendToCustomer`, params)

//外发报价-确认发给客人
export const downloadOfferFile = (params) => fetchGet(`/out_offer/downloadOfferFile`, params)

//外发报价-获取客户联系人
export const getHttpContactList = (params) => fetchGet(`/internalOffer/listContacts`, params)

/**
 * 0.8 立项
 */
//报价单列表或者客户列表
export const httpOfferOrCustomerList = (params) => fetchPost(`/project_initiation/getOfferOrCustomerList`, params)

//获取立项申请信息
export const httpProjectInitiationInfo = (params) => fetchPost(`/project_initiation/getProjectInitiationInfo`, params)

//发起立项申请
export const httpStartProjInitApproved = (params) => fetchPost(`/project_initiation/startProjInitApproved`, params)

//立项-核签
export const httpProjectInitSignature = (params) => fetchPost(`/project_initiation/projectInitSignature`, params)

//立项-录入会议记录
export const httpProjectMeetingRecord = (params) => fetchPost(`/project_initiation/projectMeetingRecord`, params)

//立项-预览
export const httpProjectInitiationReview = (projectId) => fetchGet(`/project_initiation/projectInitiationReview/${projectId}`)

//退回重新发起立项申请
export const httpReturnProjInitApproved = (params) => fetchPost(`/project_initiation/returnProjInitApproved`,params)

//立项-推送用户建档
export const httpProjectInitiationSend = (params) => fetchPost(`/project_initiation/projectInitiationSend`,params)

/**
 * 0.8 fcs
 */
// FCS记录列表
export const getHttpFcsList = (params) => fetchPost(`/fcs/pageList`,params)

// 查询fcs周别数列表
export const getHttpWeekStr = (params={count:10}) => fetchGet(`/fcs/listWeekStr`,params)

// 下载fcs模板文件
export const getHttpFcsTemplate = () => fetchGet(`/file/download/fcsTemplate`)

// 立项通过客户列表
export const getHttpProjectAdoptCustomer = () => fetchGet(`/project_initiation/adoptCustomer/list`)

// 用户fcs信息
export const getHttpFcsCustomerInfo = (params) => fetchGet(`/fcs/get`,params)

// 导入fcs文件
export const importHttpFcsInfo = (params) => fetchPost(`/fcs/importFcsInfo`,params)

// 录入FCS信息
export const saveHttpFcsInfo = (params) => fetchPost(`/fcs/save`,params)

// 编辑FCS信息
export const updateHttpFcsInfo = (params) => fetchPut(`/fcs/update`,params)

// 下载FCS订单
export const exportHttpFcsInfo = (params) => fetchGet(`/fcs/export/fcsOrderInfo`,params)

// 查询客户业务需求详情(发起FCS时的详情信息)
export const getHttpInfoByBusinessId = (params) => fetchGet(`/customer_needs/getInfoByBusinessId`,params)

// 查询客户业务需求详情(后面其他步骤的详情信息)
export const getHttpFcsSummaryInfo = (params) => fetchGet(`/fcsTaskRecord/fcsSummaryInfo`,params)

// 查询FCS汇总信息（图表）
export const getHttpSummary = (params) => fetchPost(`/fcs/getSummary`,params)

// 查询FCS汇总信息（图表）（下拉框条件）
export const getHttpComboBox = (params) => fetchPost(`/fcs/comboBox`,params)

// 根据机型查询fcs报价单信息
export const getFcsOfferInfo = (params) => fetchPost(`/internalOffer/fcsOfferInfo`,params)

// FCS预览页面接口详情（previewFcs这个路由下的的详情）
export const getHttpFcsDetailsInfo = (params) => fetchGet(`/fcs/detailsInfo`,params)

// FCS工程任务接口-工程任务详情
export const getHttpFcsProject = (params) => fetchGet(`/fcsProject/getInfo`,params)

// FCS工程任务接口-工程任务完成（通知产前准备）
export const setHttpFcsProject = (fcsTaskId) => fetchPut(`/fcsProject/complete?fcsTaskId=${fcsTaskId}`)

// FCS物控任务接口-添加物控任务信息
export const saveHttpFcsMaterial = (params) => fetchPost(`/materialControl/save`,params)

// FCS物控任务接口-根据id查找物控任务信息
export const getHttpFcsMaterial = (params) => fetchGet(`/materialControl/get`,params)

// FCS物流信息接口-添加物流信息
export const saveHttpFcsLogistics = (params) => fetchPost(`/logisticsInfo/save`,params)

// FCS物流信息接口-根据ID查找物流信息
export const getHttpFcsLogistics = (params) => fetchGet(`/logisticsInfo/get`,params)

// FCS关务任务接口-关务任务详情
export const getHttpFcsCustoms = (params) => fetchGet(`/fcsCustoms/getInfo`,params)

// FCS关务任务接口-通知商务经理
export const saveHttpFcsCustoms = (fcsTaskId) => fetchPut(`/fcsCustoms/confirm?fcsTaskId=${fcsTaskId}`)

// FCS任务记录接口-查询任务记录列表
export const getHttpFcsTaskRecord = (params) => fetchPost(`/fcsTaskRecord/pageList`,params)

// 查询物流公司名称国内OR中港
export const getHttpCompanyList = (params) => fetchGet(`/logisticsInfo/companyList`,params)

