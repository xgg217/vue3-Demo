import * as THREE from "three";

// 创建一个Mesh（绿色的3D立方体），并添加到场景中
const geometry = new THREE.BoxGeometry( 50, 50, 50 );

const material = new THREE.MeshPhongMaterial( { color: 0x00ff00, shininess: 100 } );

//创建一个空的几何体对象
const mesh = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(geometry, material);

mesh2.position.x = 100;

export{ mesh, mesh2 };