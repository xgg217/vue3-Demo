//解决el-select 远程搜索 ios不触发键盘
export default {
  name: 'r-readonly',
  mounted (el, ...arg) {
    let dom = el
    arg[0].value.forEach(element => {
      dom = dom.children[element]
    })
    dom.removeAttribute("readonly")
  },
  updated(el, ...arg) {
    let dom = el
    arg[0].value.forEach(element => {
      dom = dom.children[element]
    })
    dom.removeAttribute("readonly")
  },
}
