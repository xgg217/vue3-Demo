import { useScriptTag } from '@vueuse/core';

/**
 * 页面快速点击5下 调出调试控制台
 */
export default () => {
  let timer;
  const waitTime = 500; // 该时间间隔内点击才算连续点击（单位：ms）
  let lastTime = new Date().getTime(); // 上次点击时间
  let count = 0; // 连续点击次数

  if (!localStorage.getItem('showConsole')) {
    const dom = document.getElementById('app');
    if (!dom) return;
    dom.onclick = () => {
      const currentTime = new Date().getTime();
      // 计算两次相连的点击时间间隔
      count = currentTime - lastTime < waitTime ? count + 1 : 1;
      lastTime = new Date().getTime();
      clearTimeout(timer);
      timer = setTimeout(function () {
        clearTimeout(timer);
        if (count > 5) {
          localStorage.setItem('showConsole', 'true');
          openEruda();
        }
      }, waitTime + 10);
    };
  } else {
    openEruda();
  }

  function openEruda() {
    useScriptTag(`${window.location.origin}/static/eruda.js`, () => {
      window.eruda.init();
    });
  }
};
