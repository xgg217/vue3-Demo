<template>
  <div class="myClient flex-cul">
    <header>
      <van-row :justify="'center'" :align="'center'" class="fz-14" gutter="10">
        <van-col span="6">客户</van-col>
        <van-col span="4">{{weekData?.[0]}}</van-col>
        <van-col span="4">{{weekData?.[1]}}</van-col>
        <van-col span="4">{{weekData?.[2]}}</van-col>
        <van-col span="6">修改日期</van-col>
      </van-row>
    </header>

    <main class="fz-14">
      <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          offset="10"
          :immediate-check="false"
          @load="onLoad"
      >
        <van-row v-for="(item, index) in list" :key="index" @click="selectItem(item)" gutter="10">
          <van-col class="more" span="6">{{ item?.customerName }}</van-col>
          <van-col class="more" span="4">{{ item?.firstWeekNum }}</van-col>
          <van-col class="more" span="4">{{ item?.secondWeekNum }}</van-col>
          <van-col class="more" span="4">{{ item?.thirdWeekNum }}</van-col>
          <van-col class="more" span="6">{{ item?.updatedTime }}</van-col>
        </van-row>
      </van-list>
    </main>

    <footer class="flex-center">
      <el-button  type="primary" @click="addFcs">新增FCS</el-button>
    </footer>
  </div>
</template>

<script setup>
import {getHttpFcsList} from "@/api/business.js"
import { useUserStore } from '@/store/user'
import {openLoading, closeLoading} from "@/utils/toastTips"
import usePage from "@/hooks/usePage";
import useReviewDetail from "@/views/fcs/useReviewDetail";
const userStore = useUserStore()
let {loading,finished,pageNum,pageSize,total}=usePage()

const list = reactive([])
let {weekData,router}=useReviewDetail({isGetDetail:false})
const onLoad = () => {
  loading.value = false
  openLoading()
  getHttpFcsList({pageNum: pageNum.value++, pageSize: 20})
      .then((res) => {
        total.value = res.data.total
        list.push(...res.data.list)
        loading.value = false
        if (list.length >= total.value) {
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
const selectItem = ({fcsTaskId,processInstanceId}) => {
  // processInstanceId 流程id 用于催一下
  router.push({name: "previewFcs", params: {fcsTaskId },query:{processInstanceId}})
}

/* 新增Fcs */
const addFcs = () => {
  router.push({name: "initFcs"})
}
</script>

<style lang="scss" scoped>
.myClient{
  height: 100%;
  width: 100%;
  background-color: white;
  header, main{
    //padding: 0 16px;
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
  footer{
    height: 60px;
    .el-button{
      height: 44px;
      border-radius: 2px;
      border: unset;
      width: 90%;
    }
  }
}
</style>
