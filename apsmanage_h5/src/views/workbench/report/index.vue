<template>
  <div class="report flex-cul">
    <div class="search">
      <Search prompt="搜索" v-model:searchValue="searchValue"></Search>
    </div>
    <div class="flex1">
      <el-tree ref="treeRef"  :data="reportData" :filter-node-method="filterNode" :props=" { children: 'children', label: 'name', }" @node-click="handleNodeClick" node-key="id"
        default-expand-all
        :expand-on-click-node="false"
      >
        <template #default="{ node }">
        <span class="custom-tree-node">
          <span color="#1B2124" class="fz-14">{{ node.label }}</span>
        </span>
        </template>
      </el-tree>
    </div>
    <Share v-model:show="show">
      <!--      <div class="ui-cell">-->
      <!--&lt;!&ndash;        <img style="height: 20px" src="../../../assets/images/indicators2.png" alt="">&ndash;&gt;-->
      <!--&lt;!&ndash;        <div>下载</div>&ndash;&gt;-->
      <!--      </div>-->
    </Share>
  </div>
</template>

<script setup>
import Search from "../components/search.vue"
import Share from "../components/share.vue"
import bus from "@/utils/bus";
import {useNavBarStore} from "@/store";
import {getReportData} from "@/api/workbench";
import {openExternalPage} from "@/utils/ddApi";

const handleNodeClick = (data) => {
  openExternalPage({url:data.url})
}
let navBarStore = useNavBarStore()

const reportData = ref([])
const show = ref(false)
const treeRef = ref(null)
const searchValue = ref('')

onMounted(() => {
  getReportData().then((res) => {
    reportData.value = res.data
  })
})
const filterNode = (value, data) => {
  if (!value) return true
  return data.name.includes(value)
}
watch(searchValue, (val) => {
  treeRef.value?.filter(val)
})

// onMounted(() => {
//   bus.on("onNavBarClickRight", () => {
//     show.value=true
//   })
//   navBarStore.updateNavBar({rightText: "•••"})
// })
// onUnmounted(() => {
//   navBarStore.updateNavBar({rightText: ""})
//   bus.off('onNavBarClickRight')
// })
</script>

<style lang="scss" scoped>
.report{
  height: 100%;
  background: #FFFFFF;
  .search{
    height: 50px;
    //overflow: hidden;
    box-sizing: border-box;
    padding: 10px 20px 10px 20px;
    margin-bottom: 10px;
    position: relative;
  }
  //padding:0 20px;
  :deep(.el-tree-node__content){
    position: relative;
  }
  :deep(.el-tree-node__content>label.el-checkbox){
    position: absolute;
    right: 0;
  }
  :deep(.el-tree-node__expand-icon){
    font-size: 20px;
  }
  :deep(.el-tree-node__content){
    height: auto;
    border-bottom: 1px solid #F5F5F5;
  }
  :deep(.el-tree>div){
    border-top: 12px solid #F5F5F5;
    padding: 0 20px;
  }
  :deep(.el-tree-node__content:hover){
    background: #FFFFFF;
  }
  .custom-tree-node{
    height: 50px;
    line-height: 50px;
    img{
      height: 24px;
      margin-right: 7px;
    }
  }
}
</style>
