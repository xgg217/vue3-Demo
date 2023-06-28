import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { PlaneGeometry,MeshLambertMaterial,DoubleSide, Group,Mesh, TextureLoader, sRGBEncoding, CubeTextureLoader } from 'three';

const group = new Group();
const geometry = new PlaneGeometry(250, 250);
const material = new MeshLambertMaterial({
    color: 0x00ffff,
    side: DoubleSide,
});
const mesh = new Mesh(geometry, material);

group.add(mesh);




export default group;