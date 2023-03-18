/* 业务需求 */
const bussinessBpmnList = [
  {label: "开始", status: 0, id: "StartEvent_1"},
  {label: "业务需求填写", status: 0, id: "Activity_0a5y0rk"},
  {label: "暂存数据", status: 0, id: "Activity_0zw3896"},
  {label: "预约评审会议", status: 2, id: "Activity_0lea3ym"},
  {label: "评审中", status: 3, id: "Activity_1f5gsfy"},
  {label: "录入评审会议", status: 4, id: "Activity_04qbtv3"},
  {label: "董事长审批", status: 5, id: "Activity_0q8kjgw"},
  {label: "重谈", status: 6, id: "Activity_1vmxca3", type: "end"},
  {label: "不合作结束", status: 7, id: "Event_02g2fs6", type: "end"},
  {label: "上传初版协议", status: 8, id: "Activity_17lplma"},
  {label: "评估风险点", status: 9, id: "Activity_1sdu20m"},
  {label: "预约评审会", status: 10, id: "Activity_1mgb26x"},
  {label: "风险会议评审中", status: 10, id: "Activity_1aru0zj"},
  {label: "法务修改加工协议", status: 11, id: "Activity_0gpocb2"},
  {label: "与客户沟通", status: 12, id: "Activity_1jym0u3"},
  {label: "回签协议", status: 13, id: "Activity_0zqaqma"},
  {label: "结束", status: 14, id: "Event_18ym75e"},
]
/* 报价 */
const quoetBpmnList = [
  {label: "开始", status: 1, id: "StartEvent_1"},
  {label: "发起报价", status: 1, id: "Activity_0gviky5"},
  {label: "上传我司BOM", status: 1, id: "Activity_1qeumid"},
  {label: "待检查我司BOM", status: 2, id: "Activity_02ex9lc"},
  {label: "收集各岗位报价", status: 3, id: "Activity_1fjoz5m"},
  {label: "外发调整报价", status: 4, id: "Activity_00rov0q"},
  {label: "董事长审批", status: 5, id: "Activity_11lvr94"},
  {label: "客户确认报价", status: 6, id: "Activity_1m7a8f7"},
  {label: "结束", status: 7, id: "Event_12u0x0e"},
]

export {
  bussinessBpmnList,
  quoetBpmnList
}