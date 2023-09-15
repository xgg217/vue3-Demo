import {BoxGeometry, MeshLambertMaterial, Mesh} from 'three';


const geometry = new BoxGeometry(50,50,50);

const target1 = new BoxGeometry(50,200,50).attributes.position; // 变高
const target2 = new BoxGeometry(10,50,10).attributes.position; // 变细

// 几何体顶点变形目标数据，可以设置1组或多组
geometry.morphAttributes.position = [target1, target2];

const material = new MeshLambertMaterial({
    color: 0x00ffff
})

const mesh = new Mesh(geometry, material)


export default mesh;