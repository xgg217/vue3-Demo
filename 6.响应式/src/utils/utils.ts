
// https://juejin.cn/post/6844903815460700168


const setAttr = function setAttr(node: HTMLElement, key: string, value: string) {
  switch (key) {
    case 'style':
      // node.style.cssText = value;
      node.style.cssText = value;
      break;
    case 'value':
      let tagName = node.tagName || ''
      tagName = tagName.toLowerCase()
      if (
        tagName === 'input' || tagName === 'textarea'
      ) {
        // node.value = value;
        (node as HTMLInputElement).value = value;
      } else {
        // 如果节点不是 input 或者 textarea, 则使用 `setAttribute` 去设置属性
        node.setAttribute(key, value)
      }
      break;
    default:
      node.setAttribute(key, value)
      break;
  }
}

/**
 * 获取变量类型
 * @description: 
 * @param {any} obj变量
 * @return {string} 返回当前变量类型
 */
const type = function type(obj: any) {
  return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '')
}

// const isArray = function isArray(list) {
//   return _.type(list) === 'Array'
// }

// const toArray = function toArray(listLike) {
//   if (!listLike) return []

//   let list = []
//   for (let i = 0, l = listLike.length; i < l; i++) {
//     list.push(listLike[i])
//   }
//   return list
// }
/**
 * 是否是字符串
 * @description: 
 * @param {any} list
 * @return {boolean}
 */
const isString = function isString(list: any) {
  return type(list) === 'String'
}

/**
 * 获取节点类型
 * @param node 节点
 * @returns 
 */
const isElementNode = function (node: HTMLElement) {
  return node.nodeType === 1
}

export {
  setAttr,
  type,
  isString,
  isElementNode
}
