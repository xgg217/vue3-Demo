import {Mesh, Group, CubeTextureLoader,MeshBasicMaterial,KeyframeTrack,AnimationClip,AnimationMixer,Clock,LoopOnce} from 'three';
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
const loader = new GLTFLoader();

const group = new Group();

const textureCube = new CubeTextureLoader().setPath('./环境贴图/').load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);

loader.load('./机械装配动画.glb', (gltf) => {
    gltf.scene.traverse((obj) => {
        if(obj.isMesh) {
            obj.material.metalness = 1.0;
            obj.material.roughness = 0.35;
            obj.material.envMap = textureCube;
            obj.material.envMapIntensity = 0.5;
        }
    })

    group.add(gltf.scene);

    const miexer = new AnimationMixer(gltf.scene);
    const clip = gltf.animations[0];
    const clipAction = miexer.clipAction(clip);
    clipAction.play();
    clipAction.paused = true; //暂停状态

    // 不循环播放
    clipAction.loop = LoopOnce;

    const clock = new Clock();

    const loop = () => {
        requestAnimationFrame(loop);
        const frameT = clock.getDelta();
        miexer.update(frameT);
    }
    loop();
})

export default group;