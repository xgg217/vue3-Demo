import type { Ref } from "vue";
import { unref } from 'vue';

type DOMRect = {
  width: number; // 宽度
  height: number; // 高度
  top: number; // 顶部与视图窗口左上角的距离
  bottom: number; // 底部与视图窗口左上角的距离
  left: number; // 左侧与视图窗口左上角的距离
  right: number; // 右侧与视图窗口左上角的距离
}

const isWindow = (val: unknown): val is Window => val === window;


export default (elementOrRef: Element | Window | Ref<Element | Window | undefined>):DOMRect => {
  const element = unref(elementOrRef);

  // 元素
  if(element instanceof Element) {
    const a = element.getBoundingClientRect()
    const obj:DOMRect = {
      width: a.width,
      height: a.height,
      top: a.top,
      bottom: a.bottom,
      left: a.left,
      right: a.right,
    } as const

    return obj;
  }

  // 窗口
  if(isWindow(element)) {
    const width = element.innerWidth;
    const height = element.innerHeight;
    return {
      width,
      height,
      top: 0,
      left: 0,
      bottom: height,
      right: width,
    } as const;
  }

  return {
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }

}