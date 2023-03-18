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

export const businessStatusList = [
  {label: "暂存", ...colorList[3]},
  {label: "已放弃", ...colorList[1]},
  {label: "已约评审会", ...colorList[0]},
  {label: "评审中", ...colorList[3]},
  {label: "已评审", ...colorList[2]},
  {label: "审批中", ...colorList[3]},
  {label: "重谈", ...colorList[3]},
  {label: "不合作", ...colorList[1]},
  {label: "待上传加工协议", ...colorList[0]},
  {label: "待评估风险", ...colorList[0]},
  {label: "风险评审中", ...colorList[3]},
  {label: "待修改加工协议", ...colorList[0]},
  {label: "待与客户沟通", ...colorList[0]},
  {label: "待回签加工协议", ...colorList[0]},
  {label: "合格", ...colorList[2]},
  {label: "黑名单", ...colorList[1]},
]