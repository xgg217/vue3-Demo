import { http } from "@/utils/http";

export type UserResult = {
  success: boolean;
  data: {
    /** 用户名 */
    username: string;
    /** 当前登陆用户的角色 */
    roles: Array<string>;
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type RefreshTokenResult = {
  success: boolean;
  data: {
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

type Result = {
  success: boolean;
  data: Array<any>;
};

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<UserResult>("post", "/login", { data });
};

/** 刷新token */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>("post", "/refreshToken", { data });
};


// export const baseURL = import.meta.env.PROD ? '/upms' : 'http://192.168.28.51:30300'
export const baseURL = import.meta.env.PROD ? '/upms' : 'http://192.168.28.51:30300/upms'

export const baseUrlApi = (url: string) =>
  process.env.NODE_ENV === "development"
    ? `/upms/${url}`
    : `http://192.168.28.51:30300/${url}`;

// 获取公司人员列表
export const apiUserGetList = () => {
  return http.request<Result>("post", baseUrlApi("/api/user/getList"), { data: {} });
};