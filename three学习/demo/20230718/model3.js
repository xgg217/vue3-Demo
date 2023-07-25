import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Group} from 'three';

const model = new Group();

// 创建GLTF加载器对象
const loader = new GLTFLoader();
loader.load( './工厂.glb', function ( gltf ) {
  // console.log('控制台查看加载gltf文件返回的对象结构',gltf);
  // console.log('gltf对象场景属性',gltf.scene);
  // 返回的场景对象gltf.scene插入到threejs场景中
  model.add(gltf.scene);
})

export default model;