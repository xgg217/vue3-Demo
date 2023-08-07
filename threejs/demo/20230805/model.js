import * as THREE from 'three';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';


const group = new THREE.Group();

const mesh = (() => {
  const geometry = new THREE.BoxGeometry(100, 60, 20);
  const material = new THREE.LineBasicMaterial( {
    color: 0xffff00,
  });
  
  const mesh = new THREE.Mesh(geometry, material);
  
  return mesh
})();

const tag = (() => {
  const div = document.querySelector('#tag');
  
  // HTML元素转化为threejs的CSS2模型对象
  const tag = new CSS2DObject(div);
  tag.position.set(60,0,50);
  
  
  
  return tag
})();

group.add(mesh);
group.add(tag);



export {group};