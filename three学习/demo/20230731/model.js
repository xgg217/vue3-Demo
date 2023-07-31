import { BoxGeometry, DoubleSide, Mesh, MeshBasicMaterial,Group} from 'three';


const group = new Group();

// 矩形
const mesh = (() => {
  const geometry = new BoxGeometry(100, 60, 20);
  const material = new MeshBasicMaterial({
    color: 0x009999,
    side : DoubleSide
  });
  
  const mesh = new Mesh(geometry, material); //网格模型对象Mesh
  
  return mesh
  
})();

group.add(mesh)



export default group;