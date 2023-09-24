import {BoxGeometry, MeshLambertMaterial, Mesh} from 'three';
import {GUI} from 'three/addons/libs/lil-gui.module.min.js';
const gui = new GUI();


const geometry = new BoxGeometry(50,50,50);

const target1 = new BoxGeometry(50,200,50).attributes.position; // 变高
const target2 = new BoxGeometry(10,50,10).attributes.position; // 变细

// 几何体顶点变形目标数据，可以设置1组或多组
geometry.morphAttributes.position = [target1, target2];

const material = new MeshLambertMaterial({
    color: 0x00ffff
})

const mesh = new Mesh(geometry, material)

// mesh.morphTargetInfluences[0] = 0.5;
// mesh.morphTargetInfluences[1] = 0.5;

// GUI拖动条可视化改变变形目标权重系数
const obj = {
    t1: 0,
    t2: 0,
}
gui.add(obj, 't1', 0, 1).name('变形目标1').onChange(function (v) {
    // 变形目标1对物体形状影响权重
    mesh.morphTargetInfluences[0] = v;
});

gui.add(obj, 't2', 0, 1).name('变形目标2').onChange(function (v) {
    // 变形目标2对物体形状影响权重
    mesh.morphTargetInfluences[1] = v;
});


export default mesh;