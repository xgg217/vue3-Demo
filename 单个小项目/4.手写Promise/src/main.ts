import './style.css'
import MyPromise from './MyPromise'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>手写Promise</h1>
  </div>
`


// const promise = new Promise((res) => {
//   // res('Hello World')
//   throw new Error('失败')
// })

// const p2 = promise.finally(() => {
//   return 123
// });
// setTimeout(() => {
//   console.log(p2);
// }, 1000);

// MyPromise.resolve(1).then(res => {
//   console.log(res);
//   return 2
// }).then(res => {
//   console.log(res);
// })
// const p1 = MyPromise.reject(1)
// console.log(p1);

const p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject(1)
  }, 1000);
})
console.log(p1);

// const p4 = Promise.resolve()
// const p3 = Promise.reject()
const arr = [p1, MyPromise.resolve(2), MyPromise.resolve(3), 4];
// const p2 = Promise.all([1,2,3]).then(res => {
//   console.log(res);
//   return 2
// });
// console.log(p1);
// console.log(p2);
MyPromise.all(arr).then(res => {
  console.log(res);
  console.log('ok');

}).catch(err => {
  console.log(err);
  console.log('err');
})




