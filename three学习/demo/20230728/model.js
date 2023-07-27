import { SpriteMaterial, Sprite} from 'three';

const spriteMaterial = new SpriteMaterial({
  color:0x00ffff,//设置颜色
});

const sprite = new Sprite(spriteMaterial);



export default sprite;