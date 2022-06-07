
import el from "./utils/Element";

// const num1 = document.querySelector('#num1');

// console.log(num1);

let ul = el('ul', { id: 'list' }, [
  el('li', { class: 'item' }, ['Item 1']),
  el('li', { class: 'item' }, ['Item 2']),
  el('li', { class: 'item' }, ['Item 3'])
]);

let ulRoot = ul.render()
document.body.appendChild(ulRoot);

console.log(ul);
export { }

