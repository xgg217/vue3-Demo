import * as THREE from "three";
import dataArr from "./data.js"
// 将几何体添加到场景中

const geometruy = (() => {
  const pointsArr = [];
  dataArr.forEach(e => {
    const v2 = new THREE.Vector2(e[0],e[1])
    pointsArr.push(v2);
  })
  const shape = new THREE.Shape(pointsArr);
  return new THREE.ShapeGeometry(shape);
  // return geometruy
})();

const material =  new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  side: THREE.DoubleSide
})

const mesh = new THREE.Mesh(geometruy, material)

// 包围盒
// (() => {
//   const scale = new THREE.Vector3()
//   const box3 = new THREE.Box3()
//   console.log('box3',box3);
//
//   box3.expandByObject(mesh); // 计算模型包围盒
//
//   box3.getSize(scale)
//
//   console.log('模型包围盒尺寸', scale);
// })();

export default mesh;