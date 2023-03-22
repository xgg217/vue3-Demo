import { http } from "@/utils/http";
import { useBusinessStoreHook } from "@/store/modules/business.js"

const { id, protocolId } = useBusinessStoreHook();

type Result = {
  success: boolean;
  data: Array<any>;
  msg: string;
};

/* 分页查询客户信息列表 */
export const customerPageList = (data) => {
  return http.request<Result>("post", '/crm/customer/pageInfo', { data });
}

/* 查询客户详情 */
export const customerDetailInfo = (id: number) => {
  return http.request<Result>("get", '/customer_needs/' + id);
}

/* 修改客户状态 */
export const changeCustomerState = (params) => {
  return http.request<Result>("put", '/crm/updateStatus', { id: id.value, ...params });
}

/* 查看客户信息预览 */
export const customerInfo = (id) => {
  return http.request<Result>("get", '/processProtocol/customer_info/' + id);
}

/* 新增客户 */
export const addCustomer = (params) => {
  return http.request<Result>("post", '/crm/save' + params);
}

/* 查询客户 */
export const checkCustomer = (data) => {
  return http.request<Result>("post", '/crm/customer/list', { data });
}

// 上传文件
export const upload = (data) => {
  return http.request<Result>('post', '/crm/file/upload', { data }, { headers: { 'Content-Type': 'multipart/form-data' } })
}

/* 查询产品 */
export const checkProduct = (data) => {
  return http.request<Result>('post', '/crm/product/list', { data })
}

// 新增产品
export const addProduct = (data) => {
  return http.request<Result>('post', '/crm/product/save', { data })
}

/* 更新客户需求 */
// export const updataCustomerDemand = (params) => fetchPut('/customer_needs/update', params)
export const updataCustomerDemand = (data) => {
  return http.request<Result>('put', '/crm/customer_needs/update', { data })
}

/* 更新客户 */
export const updateCustomer = (data) => {
  return http.request<Result>('put', '/crm/customer/update_relation', { data })
}

/* 新增客户需求 */
export const addCustomerDemand = (data) => {
  return http.request<Result>('post', '/crm/customer_needs/save', { data })
}

//去建档-补业务需求表
export const putHttpOnRecord = (data) => {
  return http.request<Result>('post', '/crm/internalOffer/putOnRecord', { data })
}

// 创建会议
export const apiMeetingCreate = (data) => {
  return http.request<Result>('post', '/crm/meeting/create', { data })
}
