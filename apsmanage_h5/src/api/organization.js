import {fetchGet, fetchPost, fetchPut, fetchDelete} from "@/api/axios";
//获取所有组织部门
export const getOrg = () => fetchGet('/saas/upms/getOrg/1/1-1')