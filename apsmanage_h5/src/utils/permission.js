import {useUserStore} from "@/store/user";
import router from "@/router";

/**
 * 检查权限点工具函数
 * @param {*} permissionCode 元素权限点
 * @param {*} permissions 所有权限点
 */
export function checkPermission(permissionCode) {
  let {permissions}=useUserStore()
  let routerName=router.currentRoute.value.name //获取路由的name
  permissions = permissions[routerName] || [] //匹配到权限
  let hasPermission = true;
  if (permissionCode) {
    if (permissionCode instanceof Array && permissionCode.length > 0) {
      hasPermission = permissions.some(permissions =>
        permissionCode.includes(permissions)
      );
    } else {
      hasPermission = permissions.some(item => item === permissionCode);
    }
  }
  return hasPermission;
}

export default checkPermission
