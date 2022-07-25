import axios from "axios";
import { JUHE_APP_KEY } from "@/config/keys";

interface IHttpResponse {
  error_code: number; // 错误码
  reason: string; // 错误原因
  result: {
    data: unknown;
  }; // 返回实体内容
}

const instance = axios.create({
  timeout: 5 * 1000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    config.headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    config.params = {
      ...config.params,
      key: JUHE_APP_KEY,
    };

    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const { data } = response;
    const { error_code, reason } = data as IHttpResponse;
    const errorCode = error_code + "";

    // 错误
    if (errorCode in errorCodeObj) {
      return Promise.reject(reason);
    }

    return response.data;
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

const errorCodeObj = {
  10001: "错误的请求KEY",
  10002: "该KEY无请求权限",
  10003: "KEY过期",
  10004: "错误的OPENID",
  10005: "应用未审核超时，请提交认证",
  10007: "未知的请求源",
  10008: "被禁止的IP",
  10009: "被禁止的KEY",
  10011: "当前IP请求超过限制",
  10012: "请求超过次数限制",
  10013: "测试KEY超过请求限制",
  10014:
    "系统内部异常(调用充值类业务时，请务必联系客服或通过订单查询接口检测订单，避免造成损失)",
  10020: "接口维护",
  10021: "接口停用",
} as const;

export default instance;
