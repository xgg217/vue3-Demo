const colorList = [
  /* 蓝 */
  {color: "#5C94FF", bgColor: "#DEE9FF"},
  /* 红 */
  {color: "#FF4C4D", bgColor: "#FEF5F4"},
  /* 绿 */
  {color: "#25D978", bgColor: "#DBFFEC"},
  /* 黄 */
  {color: "#FFBD15", bgColor: "#FFF5DB"}
]

/* 工作任务 */
/* 任务类型名称 */
export const workTaskMsgTypeDict = {
  1: "工作任务",
  2: "通知任务",
  3: "审批任务"
}
/* 业务类型 */
export const workTaskBusinessTypeDict = {
  1: "业务需求",
  2: "报价",
  3: "立项"
}
/* 
  工厂负责人、品控 -> entryQuestions
  发起人 -> answerQuestions
  法务 -> legalAppraise
*/
/* 业务需求状态 */
export const workTaskBusinessStatusDict = [
  {label: "暂存", ...colorList[3]},
  {label: "已放弃", ...colorList[1]},
  {label: "已约评审会", ...colorList[0]},
  {label: "评审中", ...colorList[3]},
  {label: "已评审", ...colorList[2], component: () => import( '@/views/myClient/meetingInput/index.vue') },
  {label: "审批中", ...colorList[3], component: () => import( '@/views/myClient/leaderCheck/index.vue') },
  {label: "重谈", ...colorList[3]},
  {label: "不合作", ...colorList[1]},
  {label: "待上传加工协议", ...colorList[0], component: () => import( '@/views/myClient/uploadProtocol/index.vue') },
  {label: "待评估风险", ...colorList[0], component: () => import( '@/views/myClient/entryQuestions/index.vue'), pageType: "statusVarious", pageName: {
    "1-0553144929414422": "entryQuestions",
    "1-143336091026473150": "entryQuestions",
    "1-P220926203-0634": "legalAppraise",
    /* 以下测试用的 */
    "1-16281353481807069": "legalAppraise",
    "1-P220610753-0594": "entryQuestions"
    // "1-2876003629": "legalAppraise", // 法务
    // "1-2875937680": "legalAppraise", // 产品
    // "1-2876165137": "legalAppraise", // 测试
    // "1-2876134200": "entryQuestions", // 前端
    // "1-2875976547": "entryQuestions", // 品质
    // "1-2876054407": "entryQuestions",
    // "1-2876113267": "entryQuestions",
    // "1-590801947": "entryQuestions",
    // "1-532088818": "entryQuestions", // 录入问题
  } },
  {label: "风险评审中", ...colorList[3]},
  {label: "待修改加工协议", ...colorList[0], component: () => import( '@/views/myClient/entryQuestions/index.vue')},
  {label: "待与客户沟通", ...colorList[0], component: () => import( '@/views/myClient/offlineBridge/index.vue') },
  {label: "待回签加工协议", ...colorList[0], component: () => import( '@/views/myClient/uploadSignPro/index.vue') },
  {label: "合格", ...colorList[2], component: () => import( '@/views/myClient/addDemand/customerInfoPreview.vue')},
  {label: "黑名单", ...colorList[1], component: () => import( '@/views/myClient/addDemand/customerInfoPreview.vue')},
]
/* 报价状态 */
export const workTaskQuoteStatusDict = [
  {label: "开始", ...colorList[0]},
  {label: "待上传我司BOM", ...colorList[0], component: () => import( '@/views/quotation/uploadCorpBOM/uploadCorpBOM.vue')},
  {label: "待检查BOM", ...colorList[0], component: () => import( '@/views/quotation/uploadCorpBOM/checkCorpBOM.vue')},
  {label: "待收集报价", ...colorList[0], component: {
    "1-30340255541139730": () => import( '@/views/quotation/projectPrice/projectPrice.vue'),
    "1-P220610753-0594": () => import( '@/views/quotation/projectPrice/projectPrice.vue'),

    "1-0517535134688526": () => import( '@/views/quotation/customPrice/customPrice.vue'), // 关务
    "1-16281353481807069": () => import( '@/views/quotation/customPrice/customPrice.vue'), // 关务

    "1-0344301813889039": () => import( '@/views/quotation/logisticPrice/logisticPrice.vue'), // 物流
    "1-P220808299-0616": () => import( '@/views/quotation/logisticPrice/logisticPrice.vue'), // 物流

    "1-163946202124388509": () => import( '@/views/quotation/materialPrice/materialPrice.vue'), // 物料
    "1-P220620334-0596": () => import( '@/views/quotation/materialPrice/materialPrice.vue'), // 物料

    "1-5162174620098626": () => import( '@/views/quotation/sourcePrice/sourcePrice.vue'), // 采购
    "1-16270096766355371": () => import( '@/views/quotation/sourcePrice/sourcePrice.vue'), // 采购
    "1-16300642903358458": () => import( '@/views/quotation/sourcePrice/sourcePrice.vue'), // 采购
    // "1-522774095": () => import( '@/views/quotation/projectPrice/projectPrice.vue'), // 工程
    // "1-2876165137": () => import( '@/views/quotation/projectPrice/projectPrice.vue'), 
    // "1-2876134200": () => import( '@/views/quotation/customPrice/customPrice.vue'), // 关务
    // "1-2875741891": () => import( '@/views/quotation/logisticPrice/logisticPrice.vue'), // 物流
    // "1-2875473834": () => import( '@/views/quotation/materialPrice/materialPrice.vue'), // 物料
    // "1-527998811": () => import( '@/views/quotation/sourcePrice/sourcePrice.vue'), // 采购
    // "1-2875720608": () => import( '@/views/quotation/sourcePrice/sourcePrice.vue'), 
  }, type: "pageVarious"},
  {label: "待调整报价", ...colorList[0], component: () => import( '@/views/quotation/adjustPrice/adjustPrice.vue')},
  {label: "已调整待审核", ...colorList[0], component: () => import( '@/views/quotation/superAudit/superAudit.vue')},
  {label: "待客户确认", ...colorList[0], component: () => import( '@/views/quotation/customerConfirm/customerConfirm.vue')},
  {label: "已确认", ...colorList[2]},
]

/* 常用流程详情 */
export const commonProcessRoute = {
  1: "bussiness",
  2: "quote"
}