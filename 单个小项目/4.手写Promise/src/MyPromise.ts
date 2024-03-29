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
  resolve: TResolve;
  reject: TReject;
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

/**
 * 判断是否是一个 Promise 对象
 * @description 条件1 obj 是一个对象
 * @description 条件2 obj 有 then 方法
 * @param { any } obj
 * @returns { boolean }
 */
function isPromise(obj:any): obj is Promise<any> {
  return !!(obj && (typeof(obj) === 'object') && (typeof(obj.then) === 'function'));
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
      console.error(error);
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

    this.#runHandlers(); // 状态变化执行处理函数
  }

  /**
   * 标记当前任务完成
   * @param this MyPromise
   * @param data 相关数据
   */
  #resolve(this:MyPromise, data?: unknown) {
    // 改变状态和数据
    this.#changeState(EState.fulfilled, data);
  }

  /**
   * 标记当前任务失败
   * @param { unknown } reason 失败原因
   * @returns { void }
   */
  #reject(this:MyPromise, reason?: unknown) {
    // 改变状态和数据
    this.#changeState(EState.rejected, reason);
  }

  /**
   * 向处理队列中添加一个函数
   * @param executor 添加的函数
   * @param state 该函数什么状态下执行
   * @param resolve 让then函数返回的Promise成功
   * @param reject 让then函数返回的Promise失败
   */
  #pushHandler(executor:TResolve| null | undefined, state: TState, resolve: TResolve, reject: TReject) {
    this.#handlers.push({
      executor,
      state,
      resolve,
      reject
    })
  }

  // 状态变化执行处理函数
  #runHandlers() {
    // 目前任务在挂起的状态
    if(this.#state === EState.pending) {
      return;
    }

    while(this.#handlers[0]) {
      this.#runOneHandler(this.#handlers[0]);
      this.#handlers.shift();
    }
  }

  // 处理每一个处理函数
  #runOneHandler({ executor, state, resolve, reject }:THandler) {
    runMicroTask(() => {
      // 状态不一致，不执行
      if(this.#state !== state) {return;}

      /**
       * 如果没有传入处理函数，直接执行
       * 状态直接穿透，传给下一个then
       */
      if(typeof(executor) !== 'function') {
        if(state === EState.fulfilled) {
          resolve(this.#value);
        } else {
          reject(this.#value);
        }
        return;
      }

      try {
        const result = executor(this.#value);
        if(isPromise(result)) {
          // 如果返回的是一个 Promise 对象
          result.then(resolve, reject);
        } else {
          resolve(result);
        }
      } catch (error) {
        reject(this.#value);
        console.error(error);
      }


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
    return new MyPromise((resolve, reject) => {
      // 因为返回的是一个新的 MyPromise 实例，所以需要知道当前then函数执行的状态
      // 如果执行的状态是成功的，那么返回的 MyPromise 实例的状态也是成功的
      // 如果执行的状态是失败的，那么返回的 MyPromise 实例的状态也是失败的
      // 所以往执行队列中添加的函数需要知道当前的状态

      // 成功后执行的函数
      this.#pushHandler(onFulfilled, EState.fulfilled, resolve, reject);

      // 失败后执行的函数
      this.#pushHandler(onRejected, EState.rejected, resolve, reject)

      // 状态变化执行处理函数
      // 因为可能在 then 方法执行的时候，状态已经改变了
      this.#runHandlers();
    })
  }

  /**
   * 仅处理失败的情况
   * @param onRejected
   * @returns
   */
  catch(onRejected?: TReject| null | undefined) {
    return this.then(undefined, onRejected);
  }

  /**
   * finally 方法无论成功或者失败都会执行
   * @param { Function } callback
   * @returns { MyPromise }
   * @description finally 方法返回一个 MyPromise
   * @description finally 方法接收一个回调函数作为参数
   * @description finally 方法的回调函数不接受任何参数
   * @description finally 方法的回调函数不会改变原来的值
   * @description finally 方法的回调函数如果返回一个 Promise 对象，必须等待该 Promise 对象状态改变后，再执行后续的操作
   * @description finally 方法必须返回一个 Promise 对象
   * @description finally 方法的回调函数如果抛出错误或者返回一个被拒绝的 Promise，那么会等待该 Promise 对象状态改变后，再抛出错误或者返回一个被拒绝的 Promise
   * @description finally 方法的回调函数如果返回一个已经被解决的 Promise，那么会等待该 Promise 对象状态改变后，再返回一个已经被解决的 Promise
   */

  finally(onfinally?: (() => void) | null | undefined) {
    return this.then((data) => {
      (typeof(onfinally) === 'function') && onfinally();
      return data
    }, (reason) => {
      (typeof(onfinally) === 'function') && onfinally();
      throw reason;
    });
  }


  /**
   * 静态方法
   * @param { any } value
   * @returns { MyPromise }
   * @description 特殊情况1：传递的date本身就是一个 Promise 对象
   * @description 特殊情况2：传递的date是一个PromiseLike（实现了Promise A+ 规范），返回一个新的 Promise 对象，状态和其保持一致
   * @description resolve 方法返回一个以给定值解析后的 MyPromise 对象
   */
  static resolve(value: any) {
    if(value instanceof MyPromise) {
      return value;
    }
    return new MyPromise((resolve, reject) => {
      if(isPromise(value)) {
        value.then(resolve, reject);
      } else {
        resolve(value);
      }
    })
  }

  /**
   * 得到一个被拒绝的Promise对象
   * @param reason
   */
  static reject(reason?: any) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    })
  }

  /**
   * 得到一个新的 Promise 对象
   * @description 该 Promise 的状态取决于proms的执行
   * @description values 是一个迭代器，包含多个 Promise 对象
   * @description 全部成功，返回一个成功的 Promise 对象，数据为所有 Promise 对象的数据组成的数组，并且顺序是传入的顺序排列
   * @description 只要有一个失败，返回一个失败的 Promise 对象，失败的原因是第一个失败的 Promise 对象的失败原因
   * @param { Iterable<any> } promises
   * @returns { Promise }
   * @description Promise.all 方法返回一个新的 Promise 实例
   */
  static all(values: Iterable<any>) {
    return new MyPromise((resolve, reject) => {

      try {
        const results: any[] = [];
        let count = 0; // promises 的长度
        let fulfilledCount = 0; // 成功的个数
        for(const p of values) {
          let index = count;
          count++;
          MyPromise.resolve(p).then((data) => {
            fulfilledCount++;

            results[index] = data;

            // 当前是最后一个 Promise 完成了
            if(fulfilledCount === count) {
              // 所有的 Promise 都完成了
              resolve(results)
            }

          }, reject)
        }

        // 如果传入的是一个空的迭代器
        if(count === 0) {
          resolve(results);
        }
      } catch (error) {
        reject(error);
        console.error(error);
      }
    })
  }

  static allSettled(values: Iterable<any>) {}
}
