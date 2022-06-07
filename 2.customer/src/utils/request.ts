import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';

type Config = AxiosRequestConfig & {successNotice? : boolean; errorNotice? : boolean;}

interface IResponse {
  code: number
  [str:string]: any
}

interface IError {
  message:string
  response?:IResponse
}

const baseURL = (import.meta.env.VITE_API_BASE_URL || '') as string;

const service = axios.create({
  baseURL,
  timeout: 10 * 1000,
});

// 错误处理
const err = (error:IError) => {
  if (error.message.includes('timeout')) {
    ElMessage({
      message: '请求超时，请刷新网页重试',
      type: 'error',
    });
  }
  if (error.response) {
    if (error.response.code === 403) {
      ElMessage({
        message: 'Forbidden',
        type: 'error',
      });
    }
    // 401: 令牌已过期; 需要重新登录
    if (error.response.code === 401) {
      ElMessage({
        message: '令牌已过期; 需要重新登录',
        type: 'error',
      });
    }
  }
  return Promise.reject(error);
};

// 请求拦截器
service.interceptors.request.use((config: Config) => {
  // 在发送请求之前做一些事情
  // if (store.getters.token) {
  // 让每个请求都带有令牌
  // ['X-Token'] is a custom headers key
  // 请根据实际情况进行修改
  // config.headers['X-Token'] = getToken();
  // }

  return config;
}, err);

// 响应拦截器
service.interceptors.response.use((response:AxiosResponse) => {
  const res = response.data;

  if (res instanceof Blob) {
    const obj = {
      code: 200,
      data: res,
    };
    return obj;
  }

  if (res.code !== 200) {
    console.error('业务异常: ', res);
    ElMessage({
      message: res.msg || 'Error',
      type: 'error',
      duration: 5 * 1000,
    });
    // 500: 非法令牌;  401: 令牌已过期;
    if (res.code === 401) {
      // to re-login
      // MessageBox.confirm('您已登出，可以取消停留在此页面上，或者再次登录', '确认登出',
      //   {
      //     confirmButtonText: '重新登入',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //   store.dispatch('user/resetToken').then(() => {
      //     location.reload();
      //   });
      // });
    }
    return Promise.reject(res);
  }

  return res;
},
error => {
  console.error('err: ' + error); // for debug
  ElMessage({
    message: '服务异常,请稍后再试!',
    type: 'error',
    duration: 5 * 1000,
  });
  return Promise.reject(error);
},
);

export default service;

