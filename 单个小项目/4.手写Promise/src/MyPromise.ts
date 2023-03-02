type TExecutor = (resolve:TResolve, reject:TReject) => void;
type TResolve = (value: unknown) => void;
type TReject = (value?: any) => void;

enum EState {
  pending = 'pending',
  fulfilled = 'fulfilled',
  rejected = 'rejected',
}
type TState = keyof typeof EState; // 'pending' | 'fulfilled' | 'rejected';

type THandler = {
  executor: TResolve| null | undefined;
  state: TState;
}


/**
 * 异步执行
 * @param { Function } fn 需要异步执行的函数
 * @returns { void }
 * @description 用于异步执行
 * @description 用于 then 方法的参数
 * @description 用于 catch 方法的参数
 * @description 用于 finally 方法的参数
 * @description 用于 Promise.all 方法的参数
 */
function runMicroTask(fn:Function) {
  // node 环境下
  if(typeof process !== 'undefined') {
    return process.nextTick(fn);
  }

  // 浏览器环境下
  if(typeof MutationObserver !== 'undefined') {
    const p = document.createElement('p');
    const observer = new MutationObserver(fn);
    observer.observe(p, {
      childList: true
    })
    p.appendChild(document.createTextNode('1'));
    return
  }

  // 其他环境
  setTimeout(fn, 0);
}

export default class MyPromise {

  #state:TState  = EState.pending; // 状态
  #value:any = undefined; // 数据
  #handlers:THandler[] = []; // 处理函数形成的队列

  /**
   * 创建一个新的 MyPromise 实例
   * @param { Function } executor 任务执行器（立即执行）
   */
  constructor(executor: TExecutor) {

    // 在执行期间报错处理
    try {
      executor(this.#resolve.bind(this), this.#reject.bind(this));
    } catch (error) {
      this.#reject(error);
    }

  }

  /**
   * 改变状态和数据
   * @param newState 新的状态
   * @param value 相关数据
   */
  #changeState(newState:TState, value:any) {
    if(this.#state !== EState.pending) {
      // 当前状态已经改变，不再改变
      return;
    }

    this.#state = newState;
    this.#value = value;
  }

  /**
   * 标记当前任务完成
   * @param this MyPromise
   * @param data 相关数据
   */
  #resolve(this:MyPromise, data?: unknown) {
    console.log('完成2', data);
    console.log(this.#state);
    console.log(this.#value);

    // 改变状态和数据
    this.#changeState(EState.fulfilled, data);
  }

  /**
   * 标记当前任务失败
   * @param { unknown } reason 失败原因
   * @returns { void }
   */
  #reject(this:MyPromise, reason?: unknown) {
    console.log('失败', reason);

    // 改变状态和数据
    this.#changeState(EState.rejected, reason);
  }

  /**
   * 向处理队列中添加一个函数
   * @param executor 添加的函数
   * @param state 该函数什么状态下执行
   */
  #pushHandler(executor:TResolve| null | undefined, state: TState) {
    this.#handlers.push({
      executor,
      state
    })
  }

  /**
   * then 方法
   * @param { Function } onFulfilled 成功回调
   * @param { Function } onRejected 失败回调
   * @returns { MyPromise }
   * @memberof MyPromise
   * @description then 方法返回一个新的 MyPromise 实例
   * @description then 方法接收两个参数，分别是成功回调和失败回调
   * @description then 方法可以被同一个 promise 调用多次
   * @description then 方法必须返回一个 promise
   * @description then 方法的参数是可选的
   * @description then 方法的参数如果不是函数，需要忽略
   * @description then 方法的参数如果是函数，需要异步调用
   * @description then 方法的参数如果是函数，需要捕获错误
   */
  then(onFulfilled?: TResolve| null | undefined, onRejected?: TReject| null | undefined) {
    // 成功后执行的函数
    this.#pushHandler(onFulfilled, EState.fulfilled);

    // 失败后执行的函数
    this.#pushHandler(onRejected, EState.rejected)

    return new MyPromise((resolve, reject) => {

    })
  }
}
