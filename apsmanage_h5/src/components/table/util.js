/**
 * 函数节流
 */
export const throttle = (fn, delay=200) => {
  let lastTime,timer;
  return function () {
    let args = arguments;
    // 记录当前函数触发的时间
    let nowTime = Date.now();
    if (lastTime && nowTime - lastTime < delay) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        // 记录上一次函数触发的时间
        lastTime = nowTime;
        // 修正this指向问题
        fn.apply(this, args);
      }, delay);
    } else {
      lastTime = nowTime;
      fn.apply(this, args);
    }
  };
};

/**
 * 新增事件监听
 * @param {*} element
 * @param {*} event
 * @param {*} handler
 * @param {*} useCapture
 */
export const on = function (element, event, handler, useCapture = false) {
  if (element && event && handler) {
    element.addEventListener(event, handler, useCapture);
  }
};

/**
 * 移除事件监听
 * @param {*} element
 * @param {*} event
 * @param {*} handler
 * @param {*} useCapture
 */
export const off = function (element, event, handler, useCapture = false) {
  if (element && event && handler) {
    element.removeEventListener(event, handler, useCapture);
  }
};
