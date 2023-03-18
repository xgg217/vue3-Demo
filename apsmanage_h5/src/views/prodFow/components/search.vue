<!--生产流程中的搜索组件-->
<template>
  <div class="work_search">
    <form action="/">
      <van-search
          ref="search"
          @click="clickSearch(true)"
          @search='clickRight'
          shape="round"
          v-model="searchValue"
          placeholder="输入工单号/客户单号查询"
          clear-trigger="always"
          @clear="handleClear"
          :clear-icon="getImage('close')"
          :right-icon="getImage('search')"
          left-icon=""
          @clickRightIcon="clickRight">
      </van-search>
      <slot></slot>
    </form>
  </div>
  <div class="search_list" v-if="props.showSearch">
    <div v-for="item in searchData" :key="item.customerNo" @click="getResult(item)" class="ui-cell ui-cell-sb search_list_label">
      <div class="ui-cell">
        <img :src="getImage('search')" alt="">
<!--        <van-icon name="search" size="20"/>-->
        <div class="pd-12">{{ item.customerNo }}</div>
      </div>
      <div>{{ item.projectName }}</div>
    </div>
  </div>
</template>

<script setup>
import {getImage} from '@/utils/utils'
import {getSearchInfo} from "@/api/prodFow";

const route=useRoute()
let searchValue = ref('')
let searchData = ref([])
let search = ref()

const emit = defineEmits(['showSearch', 'clickSearchDom', 'getSearchResult'])
const props = defineProps({
  showSearch: Boolean
})
watch(()=>props.showSearch,(val)=>{
  //安卓上有聚焦的问题
  if(!val){
    search.value.blur();
  }
})

// 清空搜索框，重置搜索信息
const handleClear = () => {
  searchValue.value = ''
  searchData.value = []
  emit('getSearchResult', '')
}
// 点击搜索框，显示搜索界面
const clickSearch = (value) => {
  emit('clickSearchDom', value)
}

// 点击搜索结果选项
const getResult = (value) => {
  clickSearch(false)
  emit('getSearchResult', value.customerNo)
}

const clickRight = () => {
  getSearchInfo({orderNo: searchValue.value},route.name).then((res) => {
    searchData.value = res.data
  })
}

</script>

<style scoped lang="scss">
.work_search {
  position: sticky;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 5px 20px 0 20px;
  background-color: #ffffff;
  z-index: 1;
  .van-search {
    padding: 10px 0 12px 0;
    box-sizing: content-box;
  }
  :deep(.van-search__content){
    height: 40px;
    background: #F4F5FC;
  }
  :deep(.van-field__control){
    padding-left: 5px;
  }
  //样式覆盖
  :deep(.van-cell){
    background-color: transparent;
  }
  :deep(.van-field__control::-webkit-input-placeholder) {
    font-size: 14px;
    line-height: 40px;
    color: #B2BAD1;
  }
  :deep(.van-field__body) {
    height: 100%;
  }
  :deep(.van-field__control::placeholder) {
    font-size: 14px;
    line-height: 40px;
    color: #B2BAD1;
  }
  :deep(.van-icon__image){
    height: 27px;
    width: 27px;
  }
}



.search_list {
  overflow: auto;
  flex-grow: 1;
  background: #ffffff;
  border-top: 2px solid #FAFAFA;
  padding: 10px 30px;
  &_label {
    height: 36px;
    color: $b-gray;
    font-size: 14px;
    img{
      width: 24px;
    }
  }
}


</style>
