import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Group, MeshLambertMaterial, TextureLoader, sRGBEncoding } from 'three';

const loader = new GLTFLoader(); //创建一个GLTF加载器

const model = new Group(); //声明一个组对象，用来添加加载成功的三维场景

loader.load("./gltf模型/金属.glb", function (gltf) { //gltf加载成功后返回一个对象
    gltf.scene.traverse(obj => {
        if(obj.isMesh) {
            console.log(obj.material)
            obj.material.metalness = 1.0; // 设置金属度
            obj.material.roughness = 0.5; // 表面粗糙度
        }
    })
    model.add(gltf.scene);
})

export default model;