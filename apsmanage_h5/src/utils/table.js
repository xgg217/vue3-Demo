/**
 * el-table表格表头样式
 * @return
 */
export const headerState = (param={}) => {
  let {background='#EBF5FF', color='#4A4A4A',fontSize='14px',height='36px',fontWeight= 400}=param
  return {background, color,fontSize,height,fontWeight}
}
/**
 * el-table表格行样式
 * @param row
 * @param colorFilter
 * @return
 */
export const rowState = (row,colorFilter=[0],param={}) => {
  let {columnIndex,rowIndex}=row
  let {fontSize='14px',height='36px'}=param
  return {
    color:colorFilter.some(item=>columnIndex===item) ?'#1572F9':'#4A4A4A',
    fontSize,
    height,
    fontWeight:400,
    // background: (rowIndex%2==0)?'#FFF':'#F4F5FC'
  }
}
