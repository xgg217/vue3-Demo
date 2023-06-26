import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { BoxGeometry,MeshBasicMaterial, Group,Mesh, MeshLambertMaterial, TextureLoader, sRGBEncoding, CubeTextureLoader } from 'three';

const geometry = new BoxGeometry(100, 60, 20);

const material = new MeshBasicMaterial({
    color: 0xffff00,
});

const group = new Group();
const mesh = new Mesh(geometry, material);
group.add(mesh);

export default group;