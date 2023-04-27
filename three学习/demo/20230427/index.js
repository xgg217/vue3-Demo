import * as THREE from "./three.module.min.js"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import Model from './model.js'

const scene = new THREE.Scene();

// 2.创建相机
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

// 设置相机位置
camera.position.set(100, 100, 100);
scene.add(camera)

// // 创建一个Mesh（绿色的3D立方体），并添加到场景中
const geometry = new THREE.BoxGeometry( 30, 30, 30 );
// // const geometry = new THREE.SphereGeometry( 30);
const material = new THREE.MeshPhongMaterial( { color: 0x00ff00, shininess: 100 } );
// // 更加集合体和材质创建物体
const cube = new THREE.Mesh( geometry, material );
// // 将几何体添加到场景中
scene.add( cube );

// 光源设置
const directionLight = new THREE.DirectionalLight(0xffffff, 0.4);
directionLight.position.set(80, 100, 50);
scene.add(directionLight);


// 初始化渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true
})
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)
// console.log(renderer)
renderer.setClearColor(0x444444, 1); //设置背景颜色
// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement)

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const controls = new OrbitControls(camera, renderer.domElement);
// controls.addEventListener('change', function () {
//   renderer.render(scene, camera); //执行渲染操作
// });//监听鼠标、键盘事件


// x轴移动
// let step = -1;
// const len = 0.4;
// const render = () => {
//   if(cube.position.x > 100) {
//     step = -len;
//   }

//   if(cube.position.x <= 0) {
//     step = len;
//   }

//   cube.position.x = cube.position.x + step;

//   renderer.render(scene, camera);
//   requestAnimationFrame(render);
// }

const render = () => {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.rotation.z += 0.01;

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render()

// renderer.render(scene, camera);