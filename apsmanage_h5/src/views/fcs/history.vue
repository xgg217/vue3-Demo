<template>
  <div class="myClient flex-cul">
    <div class="name ui-cell">
      <div class="pr-20 e-gray-color">客户</div>
      <div class="b-gray-color">{{name}}</div>
    </div>
    <div class="table">
      <div  class="fz-16 height36 pl-20 pt-4 pb-4 b-gray-color">FCS任务记录</div>
      <header>
        <van-row :justify="'center'" :align="'center'" class="fz-14" gutter="10">
          <van-col span="3">序号</van-col>
          <van-col span="9">任务时间</van-col>
          <van-col span="4">发起人</van-col>
          <van-col span="8">任务状态</van-col>
        </van-row>
      </header>
      <main class="fz-14">
        <van-row v-for="(item, index) in list" :key="index" @click="selectItem(item)" gutter="10">
          <van-col class="more" span="3">{{ index+1 }}</van-col>
          <van-col class="more" span="9">{{ item.createdTime }}</van-col>
          <van-col class="more" span="4">{{ item.createdBy }}</van-col>
          <van-col class="more" span="8">{{ statusDict[item.taskStatus] }}</van-col>
        </van-row>
      </main>
    </div>
  </div>
</template>

<script setup>
import {getHttpFcsTaskRecord} from "@/api/business.js"
import {openLoading, closeLoading} from "@/utils/toastTips"
import usePage from "@/hooks/usePage";
import useReviewDetail from "@/views/fcs/useReviewDetail";
import {useDictStore} from "@/store";
let {coopTypeList}=storeToRefs(useDictStore())
let {loading,finished,pageNum,pageSize,total}=usePage()
let {statusDict,router,route} = useReviewDetail({isGetWeek: false,isGetDetail:false,isGetDict:false})
let {fcsBaseId} = route.params
let {customerName,cooperateType,purchaseModel} = route.query
const list = reactive([])
const onLoad = () => {
  loading.value = false
  openLoading()
  getHttpFcsTaskRecord({pageNum: pageNum.value++, pageSize: 20,fcsBaseId})
      .then((res) => {
        total = res.data.total
        list.push(...res.data.list)
        loading.value = false
        if (list.length >= total) {
          finished.value = true
        }
      }).finally(()=>{
        loading.value = false
        closeLoading()
  })
}

onMounted(() => {
  onLoad()
})

/* 选择记录 */
const selectItem = (item) => {
  let {id,taskStatus,createdBy,createdTime}=item
  router.push({name: "historyFcsPreview", params: {fcsTaskId: id },query:{createdBy,taskStatus,createdTime}})
}

const name = computed(()=>{
  return `${customerName}（${coopTypeList.value[+cooperateType - 1]} ${cooperateType == 3 ? '' : purchaseModel == 2 ? '代采' : '客供'}）`
})

</script>

<style lang="scss" scoped>
.myClient{
  height: 100%;
  width: 100%;
  font-size: 14px;
  background: #FFFFFF;
  .name{
    height: 80px;
    padding: 10px 22px;
    box-sizing: border-box;
    border-top: 12px solid #F4F5FC;
    border-bottom: 12px solid #F4F5FC;
    div{
      height: 36px;
      line-height: 36px;
    }
  }
  .table{
    //padding-top: 20px;
  }
  header, main{
    background: #ffffff;
    padding: 0 16px;
    box-sizing: border-box;
    .van-col{
      text-align: center;
    }
  }
  header{
    height: 30px;
    background-color: #F2F8FD;
    .van-row{
      height: 100%;
      color: $d-gray;
    }
  }
  main{
    flex: 1;
    overflow: auto;
    color: $b-gray;
    .van-row{
      height: 36px;
      border-bottom: 1px solid #EBF1F7;
      .van-col{
        line-height: 36px;
      }
    }
  }
}
</style>
