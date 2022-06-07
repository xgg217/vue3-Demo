import { setAttr, isString } from "./utils";
/**

<ul id="list">
  <li class="item">item1</li>
  <li class="item">item2</li>
  <li class="item">item3</li>
</ul>

形式如下

let ul = {
  tagName: 'ul',
  attrs: {
    id: 'list'
  },
  children: [
    { tagName: 'li', attrs: { class: 'item' }, children: ['item1'] },
    { tagName: 'li', attrs: { class: 'item' }, children: ['item1'] },
    { tagName: 'li', attrs: { class: 'item' }, children: ['item1'] },
  ]
}

 */

interface IAttrs {
  [k: string]: string
}

// interface IChildren {
//   tagName: string;
//   attrs: IAttrs;
//   children: any[]
// }

/**
 * @class Element Virtrual Dom
 * @param { String } tagName
 * @param { Object } attrs   Element's attrs, 如: { id: 'list' }
 * @param { Array <Element|String> } 可以是Element对象，也可以只是字符串，即textNode
 */
class Element {
  tagName: string;
  attrs: IAttrs;
  children: any[]
  key: string | undefined;
  constructor(tagName: string, attrs: IAttrs, children: any[]) {
    // 如果只有2个参数
    if (Array.isArray(attrs)) {
      children = attrs;
      attrs = {};
    }

    this.tagName = tagName;
    this.attrs = attrs;
    this.children = children;

    // 设置this.key属性，为了后面list diff做准备
    this.key = attrs ? attrs.key : void 0;
  }

  render() {
    const el = document.createElement(this.tagName);
    const attrs = this.attrs;

    // 设置节点的DOM属性
    for (let attrName in attrs) {
      let attrValue = attrs[attrName];
      setAttr(el, attrName, attrValue);
    }

    let children = this.children || [];
    children.forEach(child => {
      let childEl = child instanceof Element
        ? child.render() // 若子节点也是虚拟节点，递归进行构建
        : document.createTextNode(child);  // 若是字符串，直接构建文本节点
      childEl && el.appendChild(childEl)

    });
    return el;
  }


}

const el = function el(tagName: string, attrs: IAttrs, children: any[]) {
  return new Element(tagName, attrs, children)
}

export default el;