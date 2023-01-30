import { UPLOAD_INFO, ALLOW_FILE_TYPE, CHUNK_SIZE } from './config';
console.log('客户');

(() => {
  const oProgress = document.querySelector('progress');
  const oFile = document.querySelector('input[type="file"]');
  const oInfo = document.querySelector('.info');
  const oBtn = document.querySelector('button');

  let uploadSize = 0; // 已经上传的大小

  const uploadVideo = () => {
    console.log('文件');
    console.log(oFile.files[0]);
    const file = oFile.files[0];

    if(!file) {
      alert('请选择文件');
      oInfo.innerText = UPLOAD_INFO.NO_FILE;
      return;
    }

    if(!ALLOW_FILE_TYPE.includes(file.type)) {
      alert('文件类型不正确');
      oInfo.innerText = UPLOAD_INFO.INVALID_TYPE;
      return;
    }

    oInfo.innerHTML = UPLOAD_INFO.LOADING;

    const { name, type, size } = file
    const fileName = Date.now() + '_' + name;
    oProgress.max = size;
  }

  // 事件
  const bindEvent = () => {
    oBtn.addEventListener('click', uploadVideo)
  }

  const init = () => {
    bindEvent()
  };

  init();
})();

