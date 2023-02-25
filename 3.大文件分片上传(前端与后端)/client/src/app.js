import axios from 'axios'
import { UPLOAD_INFO, ALLOW_FILE_TYPE, CHUNK_SIZE } from './config';
import { API } from './api.js'

(() => {
  const oProgress = document.querySelector('progress');
  const oFile = document.querySelector('input[type="file"]');
  const oInfo = document.querySelector('.info');
  const oBtn = document.querySelector('button');

  let uploadSize = 0; // 已经上传的大小

  const uploadVideo = async () => {
    console.log('文件');
    console.log(oFile.files[0]);
    const file = oFile.files[0];

    if(!file) {
      alert('请选择文件');
      oInfo.innerText = UPLOAD_INFO.NO_FILE;
      return;
    }

    // if(!ALLOW_FILE_TYPE.includes(file.type)) {
    //   alert('文件类型不正确');
    //   oInfo.innerText = UPLOAD_INFO.INVALID_TYPE;
    //   return;
    // }

    oInfo.innerHTML = UPLOAD_INFO.LOADING;

    const { name, type, size } = file
    let uploaderReault = null;
    const fileName = Date.now() + '_' + name;
    oProgress.max = size;

    const createFormData =  (
      {
        name,
        type,
        size,
        fileName,
        uploadSize,
        file
      }
    ) => {
      const fd = new FormData();
      fd.append('name', name);
      fd.append('type', type);
      fd.append('size', size);
      fd.append('fileName', fileName);
      fd.append('uploadSize', uploadSize);
      fd.append('file', file);

      return fd;
    }

    // 切割文件 + 上传
    while(uploadSize < size) {
      const fileChunk = file.slice(uploadSize, uploadSize + CHUNK_SIZE);
      const formData = createFormData({ name, type, size, fileName, uploadSize, file: fileChunk });

      try {
        uploaderReault = await axios.post(API.UPLOAD_VIDEO, formData)
      } catch (e) {
        console.error(e);
        oInfo.innerHTML = UPLOAD_INFO.ERROR + e.msg;
        return
      }

      uploadSize += fileChunk.size;
      oProgress.value = uploadSize;
    }
    console.log('上传成功');

    oInfo.innerHTML = UPLOAD_INFO.SUCCESS;
    oFile.value = null;
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

