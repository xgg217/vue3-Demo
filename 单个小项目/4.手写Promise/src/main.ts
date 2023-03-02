import './style.css'
import MyPromise from './MyPromise'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>手写Promise</h1>
  </div>
`


const myPromise = new MyPromise((res, rej) => {
  // res('Hello World')
  // rej('失败')
  // throw new Error('失败')
  setTimeout(() => {
    res('Hello World')
    // console.log('完成1', myPromise);

  }, 1000);
});

myPromise.then(function A1() {

})
console.log(myPromise);

setTimeout(() => {
  myPromise.then(function A2() {

  })
}, 1000);


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

// console.log(promise);

