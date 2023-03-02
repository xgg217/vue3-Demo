import './style.css'
import MyPromise from './MyPromise'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>手写Promise</h1>
  </div>
`


// const myPromise = new MyPromise((res, rej) => {
//   // res('Hello World')
//   // rej('失败')
//   // throw new Error('失败')
//   setTimeout(() => {
//     res('1111')
//     // console.log('完成1', myPromise);

//   }, 1000);
// });

// const myPromise2 = myPromise.then(data => {
//   console.log('完成3', data);
//   // throw new Error('失败')
//   return new MyPromise((res, rej) => {
//     // setTimeout(() => {
//       rej('2222')
//     // }, 1000);
//   })
// })

// // myPromise.then(function A2() {}, function A3() {})
// // console.log(myPromise);
// setTimeout(() => {
//   // console.log(myPromise);
//   console.log(myPromise2);
// }, 2000);

// setTimeout(() => {
//   myPromise.then(function A2() {

//   })
// }, 1000);


// myPromise.then(function B1() {

// }, function B2() {})

// console.log(myPromise);

// const promise = new Promise((res) => {
//   // res('Hello World')
//   // throw new Error('失败')
// }).then((data) => {
//   console.log(data);
// }, (err) => {
//   console.log(err);
// });

// 测试 互操作 Promise MyPromise
// const pro1 = new Promise((res) => {
//   res(1)
// });

// pro1.then(data => {
//   console.log(data);
//   return new MyPromise(res => {
//     res(2)
//   })

// }).then(res => {
//   console.log(res);
// })

function delay(time:number = 1000) {
  return new MyPromise((res) => {
    setTimeout(res, time);
  })
}

(async function test() {
  console.log('start');
  await delay(2000)
  console.log('ok');

})()

