import './style.css'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Vector3,
  AxesHelper,
} from 'three';

// 创建3D场景对象Scene
const scene = new Scene();

// 创建物体
const crearGeometry = () => {
  //创建一个长方体几何对象Geometry
  const geometry = new BoxGeometry(100, 100, 100);

  //创建一个材质对象Material
  const material = new MeshBasicMaterial({
    color: 0xff0000,//0xff0000设置材质颜色为红色
  });

  // 两个参数分别为几何体geometry、材质material
  const mesh = new Mesh(geometry, material); //网格模型对象Mesh

  //设置网格模型在三维空间中的位置坐标，默认是坐标原点
  mesh.position.set(0, 10, 0);

  // 把网格模型mesh添加到三维场景scene中
  scene.add(mesh);

  return mesh
}


// 创建相机
const crearCamera = () => {
  // 定义相机输出画布的尺寸
  const camera = new PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );

  // 设置相机位置
  camera.position.set(200, 200, 200);

  // 相机的视线 观察目标点的坐标
  camera.lookAt(0,0,0);


  scene.add( camera );
}

const init = () => {
  // 创建物体
  const mesh = crearGeometry();

  console.log(mesh.position)

  // 创建相机
  crearCamera();

  // 渲染器
}

init();
