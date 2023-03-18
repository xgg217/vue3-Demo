<template>
  <div class="commomProcessWrap">
    <!-- 常用流程 -->
    <div class="processTypeTitleWrap">常用流程</div>
    <ul>
      <template v-for="item in commomProcessList" :key="item.iconName">
        <li v-if="item.label" class="flex-align-center flex-cul" @click="toRoute(item.path)">
          <img :src="getImg(item.iconName)" :alt="item.label">
          <span class="fz-12 mt-10">{{ item.label }}</span>
        </li>
        <!-- 空占位 -->
        <li v-else></li>
      </template>
    </ul>
    <!-- 进行中流程 -->
    <div class="processTypeTitleWrap">进行中的流程</div>
    <ul>
      <template v-for="item in goingProcessList" :key="item.iconName">
        <li v-if="item.label" class="flex-align-center flex-cul relative" @click="toRouteByName(item.path, item.value)">
          <img :src="getImg(item.iconName)" :alt="item.label">
          <span :style="{width: item.width || 'auto'}" class="fz-12 mt-10">{{ item.label }}</span>
          <span v-if="item.promptNum > 0" class="absolute tipsWrap flex-center">
            {{ item.promptNum }}
          </span>
        </li>
        <!-- 空占位 -->
        <li v-else></li>
      </template>
    </ul>
  </div>
</template>

<script setup>
import { queryProcessUnreadNum } from "@/api/workbench"
import { useBusinessStore } from "@/store/business"
import { useUserStore } from "@/store";

const userInfo = useUserStore()
const { leader } = storeToRefs(userInfo)

const businessStore = useBusinessStore()

businessStore.$reset()

const router = useRouter()

/* 常用流程列表 */
const commomProcessList = [
  {label: "业务需求", path: "/addDemand", iconName: "process1"},
  {label: "基础报价规则", path: "/quote/customerRules", iconName: "process2"},
  {label: "报价", path: "/quote/initiateQuotation", iconName: "process3"},
  {label: "排产", path: "/prodFow/schedule", iconName: "process12"},
  {label: "齐套", path: "/prodFow/workOrder", iconName: "process13"},
  {label: "立项", path: "/setProject/init", iconName: "process4"},
  {label: "FCS", path: "/fcs/record", iconName: "process5"},
  {label: "销售订单", path: "", iconName: "process6"},
  {label: "入料", path: "", iconName: "process7"},
  {label: "工单", path: "", iconName: "process8"},
  {label: "出库", path: "", iconName: "process9"},
  {label: "采购", path: "", iconName: "process10"},
  {label: "借板", path: "/borrowPlate/init", iconName: "process14"},
  // {label: "核算", path: "", iconName: "process11"}, {label: "盘点", path: "", iconName: "process12"},
  // {label: "关务核销", path: "", iconName: "process13"}, {label: "", path: "", iconName: ""}, {label: "", path: "", iconName: ""},
]
/* 进行中流程列表 */
const goingProcessList = ref([
  {label: "我发起的", path: "goingProcessList", iconName: "processing1", promptNum: 0, value: 1}, {label: "我参与的", path: "goingProcessList", iconName: "processing2", promptNum: 0, value: 2},
  {label: "全部", path: "goingProcessList", iconName: "processing4", promptNum: 0, value: -1}, {label: "", path: "", iconName: ""}, {label: "", path: "", iconName: "", promptNum: 0},
])

// if (leader.value) {
//   goingProcessList.value.splice(2, 0, {label: "组织成员发起/参与", path: "goingProcessList", iconName: "processing3", width: "14vw", promptNum: 0, value: 3 })
// }

/* 动态图片 */
const getImg = (name) => {
  const path = `../../../assets/commonProcess/${name}.png`
  const modules = import.meta.globEager("../../../assets/commonProcess/*.png")
  return modules[path].default
}
/* 路径路由跳转 */
const toRoute = (path) => {
  if (path) {
    router.push({path: path})
  } else {
    router.push({name: "404", query: {'description': '你尚未购买该模块，如有需要请联系管理员！','title': '暂无权限','img': 'permission'}})
  }
}
/* 名字路由跳转 */
const toRouteByName = (name, type) => {
  if (name) {
    router.push({name: name, params: {type: type}})
  } else {
    router.push({name: "404", query: {'description': '你尚未购买该模块，如有需要请联系管理员！','title': '暂无权限','img': 'permission'}})
  }
}

/* 获取未读总数 */
const getUnreadNum = () => {
  queryProcessUnreadNum()
    .then(res => {
      res.data.forEach(item => {
        const index = goingProcessList.value.findIndex(it => it.value == item.operationType)
        if (index > -1) {
          goingProcessList.value[index].promptNum = item.unRedCount
        }

      })
    })
}

getUnreadNum()


</script>

<style lang="scss" scoped>
.commomProcessWrap{
  // height: 100%;
  background-color: white;
  padding: 10px 24px 0;
  .processTypeTitleWrap{
    height: 40px;
    color: #1B2124;
    line-height: 40px;
    font-size: 18px;
    font-weight: bold;
  }
  ul{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 18px 0;
    li{
      margin-bottom: 30px;
      width: 30%;
      span{
        text-align: center;
      }
      img{
        height: 52px;
        width: 52px;
      }
      .tipsWrap{
        height: 16px;
        width: 16px;
        font-size: 10px;
        color: white;
        border-radius: 8px;
        right: 20px;
        background-color: #FF4C4D;
      }
    }
  }
}
</style>
