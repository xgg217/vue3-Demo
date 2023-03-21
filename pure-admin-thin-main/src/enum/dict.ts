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
