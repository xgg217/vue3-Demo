import type { DirectiveBinding } from "vue";
import type { stateType } from "./types";

const vTableSelect = {
  mounted(el: HTMLElement, bindings: DirectiveBinding<stateType>) {
    console.log(el);
    console.log(bindings.value);

    bindEvent(el, bindings.value);

  }
}

// 事件委托
function bindEvent(el: HTMLElement, value: stateType[]) {
  el.addEventListener('click', handleTDClick.bind(el, value));
  el.addEventListener('dblclick', handleTDDblclick.bind(el, value));
  el.addEventListener('mousedown', handleTDMousedown.bind(el, value));
  window.addEventListener('click', handleWindowClick.bind(el, value));
}

/**
 * 事件处理 - 单击
 * @param value
 */
function handleTDClick(value: stateType[], e:MouseEvent) {
  const { target } = e
  e.stopPropagation();
  console.log(value);
  // console.log(e.target.name);
  if((target as HTMLElement).tagName === 'TD') {
    console.log('td');
    const { row, column } = getRowAndColumn(target as HTMLElement)
    console.log(row, column);

  }
}

// 事件处理
function handleTDDblclick(value: stateType[], e: MouseEvent) {
  const { target } = e
  e.stopPropagation();
  console.log(value);
}

// 事件处理
function handleWindowClick(value: stateType[], e: MouseEvent) {
  const { target } = e
  e.stopPropagation();
  console.log(value);
}

// 事件处理
function handleTDMousedown(value: stateType[], e: MouseEvent) {
  const { target } = e
  e.stopPropagation();

  // console.log(value);
}

// 获取 行 和 列
function getRowAndColumn(e: HTMLElement) {
  const { dataset } = e
  return {
    row: Number(dataset.row),
    column: Number(dataset.column)
  }
}

// 获取 指定数据
function getTargetData(data:stateType[], row:number, column:number) {
  // return data[row][column]
}

export default vTableSelect