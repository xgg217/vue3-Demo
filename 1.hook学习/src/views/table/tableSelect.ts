import type { DirectiveBinding } from "vue";
import type { stateType, tableType, selectedObjType, dataType } from "./types";

// 鼠标拖动涉及到的区域
const selectedObj:selectedObjType = {
  startRow: 0, // 开始行
  startColumn: 0, // 开始列
  endRow: 0, // 结束行
  endColumn: 0, // 结束列
}
const stateTypeObj:stateType = {
  dateRef: [],
  selectedData: null,
  selectedAredData: []
}

const vTableSelect = {
  mounted(el: HTMLElement, bindings: DirectiveBinding) {
    console.log(el);
    console.log(bindings.value);

    stateTypeObj.dateRef = bindings.value.dateRef
    stateTypeObj.selectedData = bindings.value.selectedData
    stateTypeObj.selectedAredData = bindings.value.selectedAredData



    // 触发事件委托
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

  if(value.selectedData !== selectedTD) {
    value.selectedData = {...selectedTD}
    value.selectedData.selected = true

    value.dateRef[row].data[column] = value.selectedData // 重新赋值
  }
}

// 事件处理 - 双击
function handleTDDblclick(value: stateType, e: MouseEvent) {
  const { target } = e
  e.stopPropagation();
  // console.log(value);
}

// 事件处理 - 全局点击
function handleWindowClick(value: stateType, e: MouseEvent) {
  const { target } = e
  e.stopPropagation();
  // console.log(value);
  resetSelectedState(value) // 恢复选中状态
}

// 事件处理 - 鼠标按下
function handleTDMousedown(value: stateType, e: MouseEvent) {
  const { target } = e
  e.stopPropagation();
  resetSelectedState(value) // 恢复选中状态

  document.addEventListener('mouseover',  handleTDMouseOver.bind(target, value));
  document.addEventListener('mouseup', handleTDMouseup.bind(target, value));

  if((target as HTMLElement).tagName !== 'TD') { return }
  const { row, column } = getRowAndColumn(target as HTMLElement)

  selectedObj.startRow = row
  selectedObj.startColumn = column

}

// 事件处理 - 鼠标抬起
function handleTDMouseup(value: stateType, e: MouseEvent) {
  const { target } = e
  console.log('鼠标抬起');
  document.removeEventListener('mouseup', handleTDMouseup.bind(target, value));
  document.removeEventListener('mouseover', handleTDMouseOver.bind(target, value));
  document.removeEventListener('mousedown', handleTDMousedown.bind(target, value));
}

// 事件处理 - 鼠标抬起
function handleTDMouseOver(value: stateType, e: MouseEvent) {
  const { target } = e
  // console.log(target);

  if((target as HTMLElement).tagName !== 'TD') { return }

  const { row, column } = getRowAndColumn(target as HTMLElement)

  selectedObj.endRow = row
  selectedObj.endColumn = column

  const arr = getSelectedAreaData(selectedObj)
  console.log(arr);


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

function getSelectedAreaData( selectedObj: selectedObjType):dataType[] {
  const { dateRef } = stateTypeObj;
  const { startRow, startColumn, endRow, endColumn } = selectedObj
  const arr:dataType[] = [];
  if(startRow <= endRow) {
    // 从上往下
    for(let i = startRow; i <= endRow; i++) {
      setSelectedAredData(dateRef[i].data, startColumn, endColumn)
    }

  } else {
    // 从下往上
    for(let i = startRow; i >= endRow; i--) {
      setSelectedAredData(dateRef[i].data, startColumn, endColumn)
    }

  }

  //
  function setSelectedAredData(rowData:dataType[], startColumn:number, endColumn:number) {
    if(startColumn <= endColumn) {
      // 从左往右
      for(let i = startColumn; i <= endColumn; i++) {
        pushColumnData(rowData[i])
      }
    } else {
      // 从右往左
      for(let i = startColumn; i >= endColumn; i--) {
        pushColumnData(rowData[i])
      }
    }
  }

  function pushColumnData(columnData:dataType) {
    columnData.selected = true;
    arr.push(columnData);
  }

  return arr
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