export interface IItem {
  key: number; // 唯一标识
  label: string; // 显示的文本
  disabled: boolean; // 是否禁用
  checked?: boolean; // 是否选中
}
