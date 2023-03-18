<template>
  <div class="people flex-cul" v-if="data.show">
    <div class="px-nav-bar">
      <van-nav-bar title="通讯录" :left-arrow="true" @click-left="handleClickLeft" fixed safe-area-inset-top/>
    </div>
    <div class="flex-cul flex1">
      <!--      <div class="tip">-->
      <!--        选择要分享的人-->
      <!--      </div>-->
      <div class="search">
        <Search prompt="搜索" v-model:searchValue="searchValue"></Search>
      </div>
      <!--      <div color="#A7A9B7" class="white-bg height36 fz-18! pl-20">通讯录</div>-->
      <!--      <div class="add white-bg ui-cell ui-cell-sb">-->
      <!--        <div class="ui-cell">-->
      <!--          <img src="@/assets/images/add.png" alt="" class="mr-10">-->
      <!--          <div>-->
      <!--            <div class="font-bold height36 fz-16!" color="#1B2124">添加更多成员</div>-->
      <!--            <div class="fz-12" color="#8D9092">邀请或添加不在企业通讯录内的成员</div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <div>-->
      <!--          <span></span>-->
      <!--          <van-icon name="arrow" color="#A7A9B7" class="fz-16"/>-->
      <!--        </div>-->
      <!--      </div>-->
      <div class="mt-12 tree">
        <el-tree ref="treeRef"
          :data="newOrgTree"
          :filter-node-method="filterNode"
          :props=" { children: 'children', label: 'orgName' }"
          @check="getCheckedKeys"
          show-checkbox node-key="id"
          :expand-on-click-node="false"
          :accordion="true"
        >
          <template #default="{ node }">
          <span class="custom-tree-node">
            <img src="@/assets/images/department2.png" alt="">
            <span color="#1B2124" class="fz-14">{{ node.label }}</span>
          </span>
          </template>
        </el-tree>
      </div>
      <div class="ui-cell ui-cell-sb confirm">
        <div color="#A7A9B7" class="fz-12">
          <span v-if="!limit">请选择1-{{ flatTree.length }}个</span>
          <span v-else>请选择{{ limit }}个</span>
        </div>
        <PxtButton type="active" @click="submit">确定（{{ selectUser.length }}人）</PxtButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import Search from "@/views/workbench/components/search.vue"
import PxtButton from "@/components/button/button.vue"
import bus from "@/utils/bus";
import {useDictStore, useUserStore} from "@/store";
import {Toast} from "vant";

let dictStore = useDictStore()
let userStore = useUserStore()
let {orgTree} = storeToRefs(dictStore)
let {currentOrg} = storeToRefs(userStore)

let data = reactive({
  show: false,
  searchValue: '',
  treeRef: null,
  selectUser: [],
  filter: false,
  limit:0
})
let {searchValue, show, treeRef, selectUser,limit} = toRefs(data)
onMounted(() => {
  bus.on("handelSelectPeople", (options) => {
    data.show = options.show
    data.filter = options.filter || false
    data.limit = options.limit || 0
  })
})

onUnmounted(() => {
  bus.off("handelSelectPeople")
})
const filterNode = (value, data) => {
  if (!value) return true
  return data.orgName.includes(value)
}
watch(searchValue, (val) => {
  treeRef.value?.filter(val)
})
const submit = () => {
  if(limit.value>0 && selectUser.value.length>limit.value){
    Toast.fail(`只能选择${limit.value}个用户`);
  }else{
    bus.emit("getSelectPerson", selectUser.value)
    data.show = false
    selectUser.value = []
  }
}
let flatTree=computed(()=>{
  let tree = JSON.parse(JSON.stringify(newOrgTree.value))
  return handelFlatOrgTree(tree)
})
//扁平化组织结构树
const handelFlatOrgTree = (data)=>{
  return data.reduce((arr, {id, orgName, parentId, children = []})=> {
    return arr.concat(id.length>14?[{id, orgName, parentId}]:[], handelFlatOrgTree(children))
  },[])
}

const newOrgTree = computed(() => {
  const handelFlatOrgTree = (data)=>{
    return data.reduce((arr, item)=> {
      return arr.concat(currentOrg.value.includes(item.id)?[item]:[], handelFlatOrgTree(item?.children || []))
    },[])
  }
  if (data.filter) {
    return handelFlatOrgTree(JSON.parse(JSON.stringify(orgTree.value)))
  } else {
    return orgTree.value
  }
})

const handleClickLeft = () => {
  data.show = false
}
//通过key选择tree的节点
const setCheckedKeys = () => {
  treeRef.value?.setCheckedKeys([3], false)
}
//获取选中的节点
const getCheckedKeys = () => {
  let data = treeRef.value?.getCheckedNodes(true)
  console.log(data)
  //过滤到组织，只需要拿到人
  selectUser.value = data.filter((item) => item.id.length > 14)
}
</script>

<style lang="scss" scoped>
.people {
  height: 100%;
  width: 100%;
  background: #F5F5F5;
  position: fixed;
  top: 0;
  z-index: 2008;
  overflow: auto;

  .search {
    background: #FFFFFF;
    //overflow: hidden;
    width: 100%;
    padding: 20px 20px 10px 20px;
    box-sizing: border-box;
    position: relative;
    //&-list{
    //  box-shadow:5px 5px 10px #cdcccc;
    //  position: absolute;
    //  box-sizing: border-box;
    //  width: calc(100% - 40px);
    //  min-height: 100px;
    //  z-index: 2;
    //  background: #FFFFFF;
    //  padding: 10px 20px;
    //}
  }

  .tip {
    width: 375px;
    height: 36px;
    box-sizing: border-box;
    line-height: 36px;
    padding-left: 20px;
    background: #F5F5F5;
    font-size: 14px;
    font-weight: 500;
    color: #A7A9B7;
  }

  .add {
    height: 72px;
    padding: 0 20px;
    box-sizing: content-box;
    margin-top: 12px;

    img {
      height: 48px;
    }
  }

  .confirm {
    background: #FFFFFF;
    position: fixed;
    bottom: 0;
    height: 68px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    z-index: 2;
  }

  .tree {
    margin-bottom: 70px;
    flex: 1;
    //padding:0 20px;
    :deep(.el-tree-node__content) {
      position: relative;
    }

    :deep(.el-tree-node__content>label.el-checkbox) {
      position: absolute;
      right: 0;
    }

    :deep(.el-tree-node__expand-icon) {
      font-size: 20px;
    }

    :deep(.el-tree-node__content) {
      height: auto;
      border-bottom: 1px solid #F5F5F5;
    }

    :deep(.el-tree>div) {
      padding: 0 20px;
    }

    :deep(.el-tree-node__content:hover) {
      background: #FFFFFF;
    }

    .custom-tree-node {
      height: 50px;
      line-height: 50px;

      img {
        height: 24px;
        margin-right: 7px;
      }
    }
  }

}
</style>
