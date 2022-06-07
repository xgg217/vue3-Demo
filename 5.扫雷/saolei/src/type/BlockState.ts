export interface BlockState {
  revealed: boolean; // 是否已经揭开
  mine: boolean; // 是否是雷
  flagged: boolean; // 是否是标记
  adjacentMines: number; // 邻居雷的数量
}