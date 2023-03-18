import { http } from "@/utils/http";
import type { IUser } from '@/store/modules/user'

export type UserResult = {
  success: boolean;
  data: IUser,
  msg: string;
};

//验证码登陆
export const verificationCodeLogin = (phone: string, code: string) => {
  return http.request<UserResult>("post", `/saas/app/login?phone=${phone}&code=${code}`);
}
