<!--物料排产信息-->
<template>
  <span class="close" v-if="showSearch" @click.stop="showSearch=false">关闭</span>
  <div class="prod_main schedule">
    <search :showSearch="showSearch" @clickSearchDom="clickSearchDom" @getSearchResult="getSearchResult"></search>
    <div v-show="!showSearch" class="schedule_list">
      <layoutModule :title="key" v-for="(data, key) in listData" :key="key" :leftIcon="''">
        <template v-slot:main>
          <cardInfo v-for="item in data" :key="item.customerNo" @click="toDetail(item)" :cardData="item" :cardType="{key: 'productDate', value: '计划生产时间'}" offset="0px"></cardInfo>
        </template>
      </layoutModule>
      <van-empty image-size="10rem" description="暂无数据" v-if="!Object.keys(listData).length" />
    </div>
  </div>
</template>

<script setup>
import LayoutModule from '@/components/layout/layoutModule.vue'
import CardInfo from "@/components/info/cardInfo.vue";
import Search from '../components/search.vue'
import useList from "@/views/prodFow/hook/useList";

let {showSearch, listData,clickSearchDom,getList,getSearchResult,toDetail} = useList({name:'schedule'})

onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped>
.schedule {
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
