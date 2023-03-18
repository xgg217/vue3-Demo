import pxNotify from './pxNotify.vue'
import { createVNode, render, nextTick } from 'vue'

let pxTipsVnode = null

const Notify = (params) => {
  if (!pxTipsVnode) {
    pxTipsVnode = createVNode(pxNotify)
    render(pxTipsVnode, document.body)
  }
  pxTipsVnode.component?.exposed?.openPxNotify(params)
}
/* 初始化 */
const typeList = ["success", "error", "warn", "info"]
const initNotify = () => {
  typeList.forEach(item => {
    Notify[item] = (text) => {
      if (!pxTipsVnode) {
        pxTipsVnode = createVNode(pxNotify)
        render(pxTipsVnode, document.body)
      }
      pxTipsVnode.component?.exposed?.openPxNotify({text, type: item})
    }
  })
}

initNotify()

export { Notify }