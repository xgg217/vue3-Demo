import { Mesh,MeshBasicMaterial,DoubleSide, TextureLoader, PlaneGeometry, RepeatWrapping } from "three";

// 创建一个几何体
const geometry = new PlaneGeometry(20,20);
// const geometry = new BoxGeometry(100, 100, 100);

const textLoader = new TextureLoader();

const texture = textLoader.load('./2.png');
const material = new MeshBasicMaterial({
  map: texture,
  transparent: true,
  side: DoubleSide
});

const mesh = new Mesh(geometry, material)

mesh.rotateX(-Math.PI/2);

export default mesh;