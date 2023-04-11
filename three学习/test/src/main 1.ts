import './style.css'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshLambertMaterial,
  DirectionalLight,
  DirectionalLightHelper,
  Mesh,
  AxesHelper,
} from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 创建3D场景对象Scene
const scene = new Scene();
// 创建stats对象
const stats = new Stats();

// 创建物体
const crearGeometry = () => {
  //创建一个长方体几何对象Geometry
  const geometry = new BoxGeometry(100, 100, 100);

  //创建一个材质对象Material
  const material = new MeshLambertMaterial({
    color: 0x00ffff,//0xff0000设置材质颜色为红色
//    transparent:true,//开启透明
//    opacity:0.8,//设置透明度
  });

  // 两个参数分别为几何体geometry、材质material
  const mesh = new Mesh(geometry, material); //网格模型对象Mesh

  //设置网格模型在三维空间中的位置坐标，默认是坐标原点
  mesh.position.set(0, 0, 0);

  // 把网格模型mesh添加到三维场景scene中
  scene.add(mesh);

  return mesh
}


// 创建相机
const crearCamera = () => {
  // 定义相机输出画布的尺寸
  const camera = new PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 3000 );

  // 设置相机位置
  camera.position.set(200, 200, 200);

  // 相机的视线 观察目标点的坐标
  camera.lookAt(0,0,0);

  scene.add( camera );

  return camera
}

// 坐标轴
const crearAxesHelper = () => {
  // 创建坐标轴
  const axes = new AxesHelper(150)
  // 将坐标轴添加到场景中
  scene.add(axes)
}

// 光源设置
const setLight = () => {
  // 设置光源
//  const pointLight = new PointLight(0xffffff, 1.0);
  const pointLight = new DirectionalLight(0xffffff, 0.4);
  pointLight.position.set(100, 60, 50);
  // 点光源添加到场景中
  scene.add(pointLight)

  // 光源辅助观察
  const pointLightHelper = new DirectionalLightHelper(pointLight, 5,0xff0000);
  scene.add(pointLightHelper);
}

const init = () => {
  // 创建物体
  const mesh = crearGeometry();

  // 创建相机
  const camera = crearCamera();

  // 坐标轴
  crearAxesHelper()

  // 设置光源
  setLight()

  // 渲染器

  // 创建渲染器对象
  const renderer = new WebGLRenderer();

  // 定义threejs输出画布的尺寸(单位:像素px)
  renderer.setSize(window.innerWidth, window.innerHeight); //设置three.js渲染区域的尺寸(像素px)

  // 执行渲染操作
//  renderer.render(scene, camera);

  function render() {
    renderer.render(scene, camera);
    mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
    stats.update();
    requestAnimationFrame(render);//请求再次执行渲染函数render，渲染下一帧
  }
  render()

  // 相机

  // 设置相机控件轨道控制器OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);
  // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
  controls.addEventListener('change', function () {
//    renderer.render(scene, camera); //执行渲染操作
  });//监听鼠标、键盘事件

  document.getElementById('app')!.appendChild(stats.domElement);
  document.getElementById('app')!.appendChild(renderer.domElement);
}

init();
