<!--物料齐套-->
<template>
  <span class="close" v-if="showSearch" @click.stop="showSearch=false">关闭</span>
  <div class="prod_main work ">
    <search :showSearch="showSearch"  @clickSearchDom="clickSearchDom" @getSearchResult="getSearchResult">
      <tab @handleTab="handleTab" :activeIndex="activeIndex" v-show="!showSearch"></tab>
    </search>
    <div v-show="!showSearch" class="work_list">
      <layoutModule :title="key" v-for="(data, key) in listData" :key="key">
        <template v-slot:main>
          <cardInfo v-for="item in data" :key="item.customerNo" @click="toDetail(item)" :cardData="item" :cardType="{key: 'bqtNum', value: '欠料套数'}" :cardConfig="cardConfig"></cardInfo>
        </template>
      </layoutModule>
      <van-empty image-size="10rem" description="暂无数据" v-if="!Object.keys(listData).length" />
    </div>
  </div>
</template>

<script setup>
import LayoutModule from "@/components/layout/layoutModule.vue";
import CardInfo from "@/components/info/cardInfo.vue";
import Search from '../components/search.vue'
import {getImage} from '@/utils/utils'
import useList from "@/views/prodFow/hook/useList";
let {showSearch, listData, customerNo,activeIndex,getList,clickSearchDom,getSearchResult,toDetail,handleTab} =  useList({name:'workOrder'})

const cardConfig = [
  {key: "pno", value: "订单周别"}, {key: "qtNum", value: "齐套"}, {key: "orderNum", value: "订单数量"}, {key: "date", value: "订单日期"},
  // {key: 'orderNum', value: '订单数量',width:'26%'}, {key: 'qtNum', value: '齐套',width:'26%'}, {key: 'bqtNum', value: '欠料套数',width:'26%'}
]

// 生命周期尽量不要抽离
onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped>
.work {
  display: flex;
  flex-direction: column;
  .layout{
    padding-bottom: 5px;
  }
  &_list {
    overflow: auto;
  }
}
.close{
  background: #FFFFFF;
  width: 80px;
  height: 46px;
  line-height: 45px;
  color: #1B2124;
  position: fixed;
  text-align: center;
  top: 0px;
  left: 0px;
  z-index: 9;
  font-size: 14px;
}
</style>
