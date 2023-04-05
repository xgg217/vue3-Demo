import './style.css'
import { Scene, PerspectiveCamera } from 'three';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  1
`
// 1. 创建场景
const scene = new Scene();
// 2. 创建相机
const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

// 设置位置
camera.position.set(0,0,10);
