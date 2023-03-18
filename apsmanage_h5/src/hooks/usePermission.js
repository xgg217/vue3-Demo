import {useUserStore} from "@/store";
import useDict from "@/hooks/useDict";
import to from "await-to-js";
import {getAppRootsDescribe, getOrgDescribe, getPageInfoIds} from "@/api/login";
import useOrgTree from "@/hooks/useOrgTree";
import bus from "@/utils/bus"

//获取权限，菜单，字典，组织树
export default (param = {}) => {
  let userStore = useUserStore()
  let orgTree = useOrgTree()
  let { saasId, userSource} = storeToRefs(userStore)
  const getPermission = async () => {
    useDict()
    let params = {
      userId: saasId.value,
      userSource: userSource.value,
    }
    bus.emit('getVersionInfo')
    //获取工作台权限
    let [appRootErr, appRootData] = await to(getAppRootsDescribe(params))
    //获取页面权限
    let [permissionErr, permissionData] = await to(getPageInfoIds(params));
     //获取组织架构
    let [orgErr, orgData] = await to(getOrgDescribe(params));
    orgTree.getOrgData()
    if (!appRootErr && !permissionErr && !orgErr) {
      userStore.updateUserInfo({
        permissions: appRootData.data,
        pagePermissions: permissionData.data,
        orgDescribe: orgData.data,
        orgName: orgData.data?.[0]?.orgName,
      })
    }
  }
  return {
    getPermission
  }
}
