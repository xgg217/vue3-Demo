
<template>
  <div class="signature" :style="{width:width+'px',height:height+'px'}">
    <svg  :id="id" ref="svgCanvas" width="100%" height="100%">
      <text class="bg_title" :x="width/2" :y="height/2" >{{bgTitle}}</text>
    </svg>

  </div>
  <div @click="exportSign('base64')">1122</div>
</template>

<script setup name="signature">
import { useEventListener } from '@vueuse/core'

const props = defineProps({
  bgTitle:{
    type: String,
    default: '签名区'
  },
  width: {
    type: String,
    default: '200'
  },
  height: {
    type: String,
    default: '100'
  },
  background: {
    type: String,
    default: '#F2F3F5'
  },
  id: {
    type: String,
    default: 'svg'
  },
})
defineExpose({clearSvgChild,exportSign})
const {width, height, id} = toRefs(props)
let svgCanvas = ref(null)
let svgPolyline=null
useEventListener(svgCanvas,'touchstart', (event) => {
      startDrawTouch(event)
    });
useEventListener(svgCanvas,'touchmove', (event) => {
      continueDrawTouch(event)
    });
useEventListener(svgCanvas,'touchend', (event) => {
      endDrawTouch(event)
    });
function startDrawTouch(event) {
  svgPolyline = createSvgElement("polyline");
  svgPolyline.setAttribute("fill", "none");//填充颜色
  svgPolyline.setAttribute("shape-rendering", "geometricPrecision");//指定渲染模式
  svgPolyline.setAttribute("stroke-linejoin", "round");//结束时的收边
  svgPolyline.setAttribute("stroke", "#000000");//轮廓颜色
  svgCanvas.value.appendChild(svgPolyline);
  continueDrawTouch(event);
}

function continueDrawTouch(event) {
  if (svgPolyline) {
    let touch = event.changedTouches[0];
    let point = svgPolyline.ownerSVGElement.createSVGPoint();
    point.x = touch.clientX;
    point.y = touch.clientY;
    let ctm = event.target.getScreenCTM(); //svgObj.getScreenCTM(); 该矩阵将svg坐标转换为屏幕坐标
    if (ctm = ctm.inverse()) {
      point = point.matrixTransform(ctm);
    }
    svgPolyline.points.appendItem(point);
  }
}

function endDrawTouch(event) {
  continueDrawTouch(event);
  svgPolyline = null;
}

function createSvgElement(tagName) {
  return document.createElementNS("http://www.w3.org/2000/svg", tagName);
}

function exportSign(type='base64') {
  return new Promise((resolve, reject)=>{
    // 导出图片不需要显示背景元素
    let svg=svgCanvas.value
    let bgTitleDom=document.querySelector('.bg_title')
    let clone=svg.removeChild(bgTitleDom);
    const s = new XMLSerializer().serializeToString(svgCanvas.value);
    const src = `data:image/svg+xml;base64,${window.btoa(s)}`;
    svg.insertBefore(clone, svg.children[0]);
    if(type==='base64'){
      resolve(src)
    }else{
      const img = new Image(); // 创建图片容器承载过渡
      img.src = src;
      img.onload = () => {
        // 图片创建后再执行，转Base64过程
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'))
      }
    }
  })
}

//清除签名
function clearSvgChild() {
  let svg=svgCanvas.value
  // 背景元素不用删除
  while (svg.lastChild && svg.lastChild.className.baseVal!=='bg_title') {
     svg.removeChild(svg.lastChild);
  }
}

</script>

<style scoped lang="scss">
.signature{
  background: #F2F3F5;
  .bg_title{
    font-size: 18px;
    fill: #B2BAD1;
    text-anchor: middle;
    dominant-baseline: middle;

  }
}
/*当前页面根class * {*/
/*  -webkit-touch-callout:none; !*系统默认菜单被禁用*!*/
/*  -webkit-user-select:none; !*webkit浏览器*!*/
/*  -khtml-user-select:none; !*早期浏览器*!*/
/*  -moz-user-select:none;!*火狐*!*/
/*  -ms-user-select:none; !*IE10*!*/
/*  user-select:none;*/
/*}*/
</style>
