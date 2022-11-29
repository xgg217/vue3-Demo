import type { DirectiveBinding } from "vue";
import type { stateType, tableType } from "./types";

const vTableSelect = {
  mounted(el: HTMLElement, bindings: DirectiveBinding) {
    console.log(el);
    console.log(bindings.value);

    bindEvent(el, bindings.value);

  }
}

// 事件委托
function bindEvent(el: HTMLElement, value:stateType) {
  el.addEventListener('click', handleTDClick.bind(el, value));
  el.addEventListener('dblclick', handleTDDblclick.bind(el, value));
  el.addEventListener('mousedown', handleTDMousedown.bind(el, value));
  window.addEventListener('click', handleWindowClick.bind(el, value));
}

/**
 * 事件处理 - 单击
 * @param value
 */
function handleTDClick(value: stateType, e:MouseEvent) {
  const { target } = e
  e.stopPropagation();

  resetSelectedState(value) // 恢复选中状态
  if((target as HTMLElement).tagName !== 'TD') { return }

  const { row, column } = getRowAndColumn(target as HTMLElement)
  const selectedTD = value.dateRef[row].data[column]
  // console.log(selectedTD);
  if(value.selectedData !== selectedTD) {
    value.selectedData = {...selectedTD}
    value.selectedData.selected = true

    value.dateRef[row].data[column] = value.selectedData // 重新赋值
  }
}

// 事件处理
function handleTDDblclick(value: stateType, e: MouseEvent) {
  const { target } = e
  e.stopPropagation();
  console.log(value);
}

// 事件处理
function handleWindowClick(value: stateType, e: MouseEvent) {
  const { target } = e
  e.stopPropagation();
  console.log(value);
}

// 事件处理
function handleTDMousedown(value: stateType, e: MouseEvent) {
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

// 恢复选中状态
function resetSelectedState(value: stateType) {
  value.dateRef.forEach((item: tableType) => {
    item.data.forEach((td: any) => {
      td.selected = false
    })
  })
}

// 获取 指定数据
// function getTargetData(target:HTMLElement, data:tableType[]) {

//   // const { row, column } = getRowAndColumn(target)
//   const { dataset } = target
//   const row = Number(dataset.row)
//   const column = Number(dataset.column)

//   return data[row].data[column]
// }

export default vTableSelect