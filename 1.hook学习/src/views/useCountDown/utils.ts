// 用于判断是否在浏览器环境下
export const inBrowser = typeof window !== 'undefined';

// raf
export function raf(fn: FrameRequestCallback): number {
  return inBrowser ? requestAnimationFrame(fn) : -1;
}

// 取消raf
export function cancelRaf(id: number) {
  if (inBrowser) {
    cancelAnimationFrame(id);
  }
}