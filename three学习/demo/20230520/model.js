import { Mesh,MeshBasicMaterial, TextureLoader, PlaneGeometry } from "three";

// 创建一个几何体
const geometry = new PlaneGeometry(100, 100);

const textLoader = new TextureLoader();

const texture = textLoader.load('./路飞.jpg');
const material = new MeshBasicMaterial({
  map: texture
});

const mesh = new Mesh(geometry, material)

export default mesh;