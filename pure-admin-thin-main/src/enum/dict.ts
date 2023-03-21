export const businessStatus = [
  { lable: "暂存", className: "a-yellow-color" },
  { lable: "已放弃", className: "a-red-color" },
  { lable: "已约评审会", className: "b-blue-color" },
  { lable: "评审中", className: "a-yellow-color" },
  { lable: "已评审", className: "a-green-color" },
  { lable: "审批中", className: "a-yellow-color" },
  { lable: "重谈", className: "a-yellow-color" },
  { lable: "不合作", className: "a-red-color" },
  { lable: "待上传加工协议", className: "b-blue-color" },
  { lable: "待评估风险", className: "b-blue-color" },
  { lable: "风险评审中", className: "a-yellow-color" },
  { lable: "待修改加工协议", className: "b-blue-color" },
  { lable: "待与客户沟通", className: "b-blue-color" },
  { lable: "待回签加工协议", className: "b-blue-color" },
  { lable: "合格", className: "a-green-color" },
  { lable: "黑名单", className: "a-red-color" },
] as const;

// 人数
export const employeeNumberOptions = [
  { value: '1', label: '<100' },
  { value: '2', label: '100-499' },
  { value: '3', label: '500-4999' },
  { value: '4', label: '≥5000' }
] as const;

// 币种
export const currencyList = [
  { value: 1, label: 'RMB' },
  { value: 2, label: 'USD' },
  { value: 3, label: 'HKD' },
  { value: 4, label: 'AUD' },
  { value: 5, label: 'CAD' },
  { value: 6, label: 'CHF' },
  { value: 7, label: 'EUR' },
  { value: 8, label: 'GBP' },
  { value: 9, label: 'JPY' },
  { value: 10, label: 'NZD' },
  { value: 11, label: 'SGD' },
  { value: 12, label: 'TWD' }
] as const;

export const customerType = [
  { name: '已建档客户', value: 1 },
  { name: '未建档客户，仅报价', value: 2 }
] as const;

export const bomAdjust = [
  { name: '有误，需调整', value: 0 },
  { name: '无误，无需调整', value: 1 }
] as const;

export const startupStatus = [
  { name: '有', value: 1 },
  { name: '无', value: 2 }
] as const;

export const returnReason = [
  { name: '报价太高', value: 1 },
  { name: '报价太底', value: 2 },
  { name: '其它', value: 3 },
] as const;

export const offerType = [
  { "name": "工程报价", "value": 1 },
  { "name": "关务报价", "value": 2 },
  { "name": "物流报价", "value": 3 },
  { "name": "物料报价", "value": 4 },
  { "name": "加工费报价", "value": 5 }
] as const;

export const distributeDict = [
  { name: '平均分配(系统自动计算)', value: 1 },
  { name: '手动分配', value: 2 }
] as const;

export const distributeDict2 = [
  { name: '平均分摊到组织成员', value: 1 },
  { name: '指定人员分配', value: 2 }
] as const;

export const indexTypeDict = [
  { name: '财务指标', value: 1 },
  { name: '经营指标', value: 2 },
  { name: '生产指标', value: 3 },
  { name: '管理指标', value: 4 },
  { name: '人事指标', value: 5 },
  { name: '品质指标', value: 6 },
  { name: '质量指标', value: 7 },
  { name: '其它指标', value: 0 }
] as const;

export const indexRecipientTypeDict = [
  { name: '指派到组织', value: 1 },
  { name: '指派到人', value: 2 }
] as const;

export const dimensionDict = [
  { name: '数值', value: 1 },
  { name: '百分比', value: 2 }
] as const;

//指标单位
export const targetUnitDict = [
  { name: 'RMB', value: "RMB" },
  { name: 'H(时间)', value: "H" },
  { name: 'PCS(生产类)', value: "PCB" },
] as const;

export const timeDict = [
  { name: '固定周期', value: 1 },
  { name: '指定日期', value: 2 }
] as const;

export const fixedTimeDict = [
  //固定周期，D天；W周；M月；Q季度；Y年
  { name: '天(每天23:59检查指标是否完成)', value: "D" },
  { name: '周(每周日23:59检查指标是否完成)', value: "W" },
  { name: '月(每月最后一天检查指标是否完成)', value: "M" },
  { name: '季度(每季度最后一天检查指标是否完成)', value: "Q" },
  { name: '年(每年最后一天检查指标是否完成)', value: "Y" }
] as const;

export const calculateDict = [
  { name: '=', value: '=' },
  { name: '≥', value: '≥' },
  { name: '>', value: '>' },
  { name: '≤', value: '≤' },
  { name: '<', value: '<' }
] as const;

export const setProjectType = [
  { name: 'By报价单立项', value: 2 },
  { name: 'By业务需求立项', value: 1 }
] as const;

export const dateRangeDict = [
  { name: '默认（当前周+10）', value: 1 },
  { name: '今年', value: 2 },
  { name: '去年', value: 3 },
] as const;

const coopTypeList = ['保税加工', '国内加工', '纯垫资代采'] as const;