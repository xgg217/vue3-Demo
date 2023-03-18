import {useDictStore} from "@/store";
import {getOrg} from "@/api/workbench";

//获取组织树
export default (param = {}) => {
  let dictStore = useDictStore()
  const getOrgData = () => {
    getOrg().then((res) => {
      let tree = JSON.parse(JSON.stringify(res.data))
      tree = handelFlatOrgTree(tree)
      dictStore.updateDict({
        orgTree: res.data,
        flatOrgTree: tree
      })
    })
  }
  //扁平化组织结构树
  const handelFlatOrgTree = (data)=>{
    return data.reduce((arr, {id, orgName, parentId, children = []})=> {
      return arr.concat(id.length>14?[{id, orgName, parentId}]:[], handelFlatOrgTree(children))
    },[])
  }
  return {
    getOrgData
  }
}
