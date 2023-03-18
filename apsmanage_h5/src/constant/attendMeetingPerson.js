let isDev=window.location.host == "192.168.28.51:30300" || window.location.host == "192.168.28.51:29300" || window.location.host.includes('dev-') || window.location.host.includes('test-')
const testPersonList = [
  "P220629856-0603",
  "16281353481807069",
  "16281353481807069",
  "P220706373-0606",
  "P220322167-0574",
  "P220610753-0594"
]
let defaultPersonList = isDev ?  [...testPersonList]:[
  "3028641710651386", // 伍巧
  "143643592433186260", // 莫慧兰
  "302862443926541578", // 梁春华
  "P220704915-0604", // 方萍
  "P220615268-0595", // 李俊贺
  "191818546029195062", // 王平乾
]
let setProjectPersonList = isDev ?  [...testPersonList]:[
  "143643592433186260",// 莫慧兰
  "P220214501-0563",
  "P220412700-0583",
  "P220524571-0592",
  "P221128431-0653"
]
export  {
  defaultPersonList,setProjectPersonList,isDev
}
