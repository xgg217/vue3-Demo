import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data: any;
};

// 字典
export const getParameterConfig = (id: number) => {
  return http.request<Result>("get", '/customer/parameterConfig/list');
}