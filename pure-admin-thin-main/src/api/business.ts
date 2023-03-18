import { http } from "@/utils/http";
import { useBusinessStoreHook } from "@/store/modules/business.js"

const { id, protocolId } = useBusinessStoreHook();

type Result = {
  success: boolean;
  data: Array<any>;
};

/* 查询客户详情 */
export const customerDetailInfo = (id: number) => {
  return http.request<Result>("get", '/customer_needs/' + id);
}

/* 修改客户状态 */
export const changeCustomerState = (params) => {
  return http.request<Result>("put", '/customer/updateStatus', { id: id.value, ...params });
}

/* 查看客户信息预览 */
export const customerInfo = (id) => {
  return http.request<Result>("get", '/processProtocol/customer_info/' + id);
}

/* 新增客户 */
export const addCustomer = (params) => {
  return http.request<Result>("post", '/customer/save' + params);
}

/* 查询客户 */
export const checkCustomer = (data) => {
  return http.request<Result>("post", '/customer/customer/list', { data });
}
