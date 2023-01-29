// 用于判断是否在浏览器环境下
export const inBrowser = typeof window !== 'undefined';

// 绘制动画
export function raf(fn: FrameRequestCallback): number {
  return inBrowser ? requestAnimationFrame(fn) : -1;
}

// 取消动画
export function cancelRaf(id: number) {
  if (inBrowser) {
    cancelAnimationFrame(id);
  }
}