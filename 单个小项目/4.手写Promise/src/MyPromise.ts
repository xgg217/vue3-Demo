type TExecutor = (resolve:TResolve, reject?:TReject) => void;
type TResolve = (value?: unknown) => void;
type TReject = (value?: unknown) => void;

type TState = 'pending' | 'fulfilled' | 'rejected';


export default class MyPromise {

  #state:TState  = 'pending'; // 状态
  #value:any = undefined; // 数据

  /**
   * 创建一个新的 MyPromise 实例
   * @param { Function } executor 任务执行器（立即执行）
   */
  constructor(executor: TExecutor) {

    executor(this.#resolve.bind(this), this.#reject);
  }

  /**
   * 标记当前任务完成
   */
  #resolve(this:MyPromise, data?: unknown) {
    console.log('完成2', data);
    console.log(this.#state);
    console.log(this.#value);

    // 改变状态和数据
    this.#state = 'fulfilled';
    this.#value = data;

  }

  /**
   * 标记当前任务失败
   * @param { unknown } reason 失败原因
   * @returns { void }
   */
  #reject(this:MyPromise, reason?: unknown) {
    console.log('失败', reason);
    // 改变状态和数据
    this.#state = 'rejected';
    this.#value = reason;
  }
}
