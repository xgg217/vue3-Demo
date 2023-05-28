import { Mesh, TextureLoader, MeshLambertMaterial, SphereGeometry } from "three";

const geometry = new SphereGeometry( 190 );

// 创建一个纹理加载器
const loadText = new TextureLoader();
// 加载图片返回纹理对象
const texture = loadText.load('./worldmap1.jpg')

const material = new MeshLambertMaterial( { map: texture } );

const mesh = new Mesh( geometry, material );

export default mesh;