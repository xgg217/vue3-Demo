<template>
  <div class="myClient flex-cul">
    <header>
      <van-row :justify="'center'" :align="'center'" class="fz-14" gutter="10">
        <van-col span="2"></van-col>
        <van-col span="6">客户姓名</van-col>
        <van-col span="7">录入日期</van-col>
        <van-col span="9">状态</van-col>
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
        <van-row v-for="(item, index) in list" :key="item.id" @click="selectItem(item)" gutter="10">
          <van-col span="2">{{ index + 1 }}</van-col>
          <van-col class="more" span="6">{{ item.name }}</van-col>
          <van-col span="7">{{ item.createdTime }}</van-col>
          <van-col span="9"><span :class="statusList[item.status].className">{{ statusList[item.status].lable }} {{ item.status == 0 ? '剩余' + item.days + '天到期' : ''  }}</span></van-col>
        </van-row>
      </van-list>
    </main>

    <footer class="flex-center">
      <el-button  type="primary" @click="addDemand">新增业务需求</el-button>
    </footer>
  </div>
</template>

<script setup>
  import { customerPageList } from "@/api/business.js"
  import { useUserStore } from '@/store/user'
  import { useBusinessStore } from "@/store/business"
  import statusList from "@/constant/businessStatus"
  import {openLoading, closeLoading, failTip, successTip} from "@/utils/toastTips"

  /* pinia */
  const userStore = useUserStore()
  const businessStore = useBusinessStore()
  /* 路由 */
  const router = useRouter()

  /* 分页请求 */
  const list = reactive([])
  const loading = ref(false)
  const finished = ref(false)
  let pageNum = 1
  let total = 0

  const onLoad = () => {
    loading.value = false
    openLoading()
    customerPageList({pageNum: pageNum++, pageSize: 20})
      .then((res) => {
        if (res.code === 200) {
          total = res.data.total
          res.data.list.forEach(element => {
            list.push(element)
          })
        } else {
          failTip(res.code + ' - ' + res.msg)
        }

        loading.value = false

        if (list.length >= total) {
          finished.value = true
        }
        closeLoading()
      })
      .catch((e) => {
        failTip('网络请求异常，请联系管理员')
        loading.value = false
        closeLoading()
      })
  }

  onMounted(() => {
    onLoad()
  })

  /* 选择客户 */
  const selectItem = (item) => {
    businessStore.updatePageInfo({id: item.baseCustomerId, state: item.status, cusId: item.id})
    router.push({name: item.status > 13 ? "customerInfoPreview" : "customerDemand", params: {id: item.baseCustomerId }})
  }

  /* 新增业务需求 */
  const addDemand = () => {
    router.push({path: "/addDemand"})
  }
</script>

<style lang="scss" scoped>
.myClient{
  height: 100%;
  width: 100%;
  background-color: white;
  header, main{
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
