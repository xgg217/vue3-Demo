<template>
  <div class="work">
    <div class="search">
      <Search ref="searchRef" prompt="搜索" v-model:searchValue="data.keyWord" @search="searchProcess" :clearable="true" @clickRightIcon="searchProcess"></Search>
    </div>
    <div class="tab">
      <SlideButton v-model:currentIndex="type" :typeList="tabList"></SlideButton>
    </div>
    <div class="work-list">
      <div class="flex work-list_item" v-for="item in listData" :key="item.id" @click.stop="goPage('workTargetDetail',item)">
        <img src="@/assets/images/indicators.svg" alt="" v-if="item.readFlag===0">
        <img src="@/assets/images/indicators2.svg" alt="" v-else>
        <div class="ml-17">
          <div class="height36 fz-18! font-bold! ">{{ item.kpiTypeName }}</div>
          <template v-if="type===1">
            <div color="#8D9092">
              {{ item.kpiName }}:
              {{ item.description }} {{ item.kpiRange }}{{ item.kpiRangeValue }}{{ item.dimension == 1 ? item.kpiValueUnit : '%' }}
            </div>
            <div v-if="item?.relationId" color="#8D9092">关联指标：{{item?.relationKpi}}</div>
            <div color="#A7A9B7" class="pt-8 fz-10!" v-html="item.remark"></div>
            <div color="#2972FE" class="height36" @click.stop="goPage('workTargetAllot',item)" v-if="item.assignAuth">去分配></div>
          </template>
          <template v-if="type===2">
            <div color="#8D9092">
              {{ item.kpiName }}:
              {{ item.description }}{{ item.kpiRange }}{{ item.kpiRangeValue }}{{ item.dimension == 1 ? item.kpiValueUnit : '%' }}
            </div>
            <div>
              <div v-for="user in item.kpiAssignUser" :key="user.id" class="fz-14" color="#8D9092">
                <span>
                  {{ user.userName }}:<span v-html="user.progress"></span>
                </span>
                <span v-if="user.children" color="#2972FE" class="height36 shrink-0" @click.stop="user.show=!user.show">
                  {{ user.show ? '关闭' : '展开' }}
                  <van-icon name="arrow-up" v-if="user.show"/>
                  <van-icon v-else name="arrow-down"/>
                </span>
                <div v-for="children in user.children" :key="children.id" class="fz-14" color="#8D9092">
                  <span v-if="user.show"> {{ children.userName }}:<span v-html="children.progress"></span></span>
                </div>
              </div>
            </div>
            <div color="#A7A9B7" class="pt-8 fz-10" v-html="item.remark">  </div>

          </template>
          <template v-if="type===3">
            <div color="#8D9092">
              {{ item.kpiName }}:
              {{ item.description }} {{ item.kpiRange }}{{ item.kpiRangeValue }}{{ item.dimension == 1 ? item.kpiValueUnit : '%' }}
            </div>
            <div color="#A7A9B7" class="fz-10" v-html="item.remark"></div>
            <div class="height36 ui-cell">
              <div color="#2972FE" class="mr-10" @click.stop="goPage('workTargetSet',item)">
                <van-icon name="edit"/>
                修改
              </div>
              <div color="#E50000" @click.stop="handelDelete(item)">
                <van-icon name="delete-o"/>
                删除
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="add">
      <img src="@/assets/images/add.png" alt="" class="img_100" @click="goPage('workTargetSet')">
    </div>
    <div>
      <Filter v-model:showPop="showFilter" :checkboxOption="{label:'name',value:'value'}" @getCondition="getCondition" :condition-list="filterList" :showSearch="true"></Filter>
    </div>
  </div>
</template>

<script setup>
import Filter from "../components/condition.vue"
import bus from "@/utils/bus";
import Search from "../components/search.vue"
import SlideButton from "../components/slideButton.vue"
import {useDictStore, useNavBarStore} from "@/store";
import {Dialog} from 'vant'
import {getKpiList, getUserKpiQty, kpiDelete, updateReadFlag} from "@/api/workbench";
import {getYMD} from "@/utils/timeFormat";

let router = useRouter()
let {indexTypeDict} = storeToRefs(useDictStore())
let navBarStore = useNavBarStore()
let data = reactive({
  keyWord: '', //搜索
  showFilter: false, //筛选
  type: 1,//tab
  startDate: '',
  kpiType: [],
  endDate: '',
  createBy: [],
  listData: {},
  searchRef: ''
})
let {showFilter, type, listData, searchRef} = toRefs(data)

let tabList = ref([
  {label: "我的指标", promptNum: 0, value: 1},
  {label: "组织成员指标", promptNum: 0, value: 2},
  {label: "我设定的指标", promptNum: 0, value: 3}
])

let filterList = computed(() => {
  // TODO，后续在“组织成员指标”和“我设定的指标”tab下，增加 指标负责人 的筛选条件，本期暂没有；
  let ret = [
    {label: "指标类型", type: "checkbox", receiveKey: "kpiType", list: indexTypeDict.value},
    {label: "截止时间", type: "selectTime", receiveKey: "abortTime"},
    {label: "指标设定人", type: "selectPerson", receiveKey: "createBy"},
  ]
  if (type.value !== 1) ret.splice(2, 1);
  return ret
})
const handelUpdateReadFlag = (assignId) => {
  updateReadFlag(assignId)
}
/* 发起搜索 */
const searchProcess = () => {
  getKpiListData()
}

/* 获取筛选条件 */
const getCondition = (value) => {
  let {kpiType, abortTime, searchValue, createBy = []} = value
  data.kpiType = kpiType.length ? Object.values(kpiType) : []
  if (abortTime) {
    data.startDate = abortTime.startTime?  getYMD(new Date(abortTime.startTime)) : ''
    data.endDate = abortTime.endTime ? getYMD(new Date(abortTime.endTime)) :''
  }
  data.createBy = type.value===1 ? createBy?.map((item) => item.userId) : []
  data.keyWord = searchValue
  showFilter.value = false
  searchRef.value.searchValue = searchValue
  getKpiListData()
}
// 删除
const handelDelete = (item) => {
  Dialog.alert({
    showCancelButton: true,
    message: '你确定要删除这笔数据吗？',
    confirmButtonColor: '#0076F6'
  }).then(() => {
    kpiDelete(item.id).then(() => {
      getKpiListData()
    })
  });
}

const getKpiListData = () => {
  let params={
    ...data,
    pageIndex: 1,
    pageSize: 1000
  }
  delete params.showFilter
  delete params.listData
  delete params.searchRef
  getKpiList(params).then((res) => {
    listData.value = res.data.list || []
  })
}
onMounted(() => {
  getKpiListData()
  getUserKpiQty().then((res) => {
    tabList.value[0].promptNum = res.data?.myKpiQty || 0
    tabList.value[1].promptNum = res.data?.orgMemberQty || 0
  })
})
const goPage = (name, params = {}) => {
  router.push({name, params: {id: params.id}})
  if(name=='workTargetDetail' || name=='workTargetAllot'){
    handelUpdateReadFlag(params?.assignId)
  }
}

watch(() => type.value, () => {
  data.createBy = []
  getKpiListData()
})
onMounted(() => {
  bus.on("onNavBarClickRight", () => {
    showFilter.value = true
  })
  navBarStore.updateNavBar({rightText: "筛选"})
})
onUnmounted(() => {
  bus.off('onNavBarClickRight')
})

</script>

<style lang="scss" scoped>
.work {
  min-height: 100%;
  background: #FFFFFF;
  padding: 0 20px;

  .search {
    height: 50px;
    overflow: hidden;
    box-sizing: border-box;
    padding-top: 10px;
  }

  .tab {
    height: 56px;
    box-sizing: border-box;
    margin-bottom: 20px;
  }

  &-list {

    &_item {
      box-sizing: content-box;
      min-height: 90px;
      margin: 0 auto 16px auto;
      border-radius: 12px;
      border: 1px solid #F1F3F6;
      padding: 12px;
      font-size: 14px;

      img {
        height: 80px;
      }
    }
  }

  .add {
    position: fixed;
    height: 88px;
    width: 88px;
    top: 85%;
    right: 0;
    z-index: 10;
  }
}
</style>
