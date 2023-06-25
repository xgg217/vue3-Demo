import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Group, MeshLambertMaterial } from 'three';

const loader = new GLTFLoader(); //创建一个GLTF加载器

const model = new Group(); //声明一个组对象，用来添加加载成功的三维场景

loader.load("./gltf模型/小区/简易小区-共享材质.glb", function (gltf) { //gltf加载成功后返回一个对象
    model.add(gltf.scene); //三维场景添加到model组对象中
})


export default model;