import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

// axios.defaults.baseURL = 'http://localhost:8081';
axios.defaults.timeout = 10000;

// axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";

interface IResponse {
  err: number;
  data: any;
  msg: string;

}

axios.interceptors.request.use((config) => {
  return config;
}, err => {
  return Promise.reject(err);
});

axios.interceptors.response.use((res: AxiosResponse) => {
  if(res.data.err === 1) {
    return Promise.reject(res.data.data);
  }

  return res.data.data

}, err => {
  return Promise.reject(err);
})

export default axios;
