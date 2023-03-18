export default {
  name: 'moreTips',
  mounted (el, ...arg) {
    const value = arg[0].value
    /* 修改布局，添加不换行、超出省略样式 */
    el.innerHTML = `
      <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
        <span>${value}</span>
      </div>`
    
    if (!el.style.position) {
      el.style.position = "relative"
    }

    if (el.children[0].children[0].offsetWidth < el.offsetWidth) return
    /* 添加提示的dom */
    const tipsDom = document.createElement("div")
    tipsDom.style.cssText = `
      max-width: 200px;
      padding: 6px 10px;
      background-color: #ffffff;
      border-radius: 5px;
      transform: translateY(calc(-100% - ${el.offsetHeight + 4 + "px"}));
      left: -10px;
      z-index: 99;
      box-shadow: 0 0 2px 1px #CDCDCD;
      display: none;
      position: absolute
    `
    el.appendChild(tipsDom)
    tipsDom.innerText = value
    /* pc端移入移出、移动端点击 */
    el.onmouseover = () => {
      el.children[1].style.display = "block"
    }
    el.onmouseleave = () => {
      el.children[1].style.display = "none"
    }
  }
}


// bind (el, ...arg) {
//   const { value } = arg[0].value
//   /* 修改布局，添加不换行、超出省略样式 */
//   el.innerHTML = `
//     <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
//       <span>${value}</span>
//     </div>`
  
//   if (!el.style.position) {
//     el.style.position = "relative"
//   }
// },
// inserted (el, binding) {
//   if (el.children[0].children[0].offsetWidth < el.offsetWidth) return
//   const { value } = binding
//   /* 添加提示的dom */
//   const tipsDom = document.createElement("div")
//   tipsDom.style.cssText = `
//     max-width: 200px;
//     padding: 6px 10px;
//     background-color: #081935;
//     border-radius: 5px;
//     transform: translateY(calc(-100% - ${el.offsetHeight + 4 + "px"}));
//     left: -10px;
//     z-index: 99;
//     border: 2px solid rgb(37, 59, 95);
//     display: none;
//     position: absolute
//   `
//   el.appendChild(tipsDom)
//   tipsDom.innerText = value
//   /* pc端移入移出、移动端点击 */
//   el.onmouseover = () => {
//     el.children[1].style.display = "block"
//   }
//   el.onmouseleave = () => {
//     el.children[1].style.display = "none"
//   }
// }