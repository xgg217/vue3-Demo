import './style.css'
import MyPromise from './MyPromise'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>手写Promise</h1>
  </div>
`


const myPromise = new MyPromise((res) => {
  res('Hello World')
});

console.log(myPromise);

const promise = new Promise((res) => {
  res('Hello World')
});

console.log(promise);

