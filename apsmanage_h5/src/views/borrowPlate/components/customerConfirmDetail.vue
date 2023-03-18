<template>
  <div class="detail">
    <layoutModule title="信息详情">
      <template #main>
        <div v-for="item in keys" :key="item.key" class="flex height_36">
          <div class="width_23">{{ item.name }}</div>
          <div class="flex1 flex ui-nowrap" v-if="item.key==='expectReturnTime'" color='#FF3A35'>{{ detail?.[item.key] }}</div>
          <div class="flex1 flex ui-nowrap b-gray-color" v-else>{{ detail?.[item.key] || '-' }}</div>
        </div>
        <div class="flex height_36" v-if="borrowBoard.length">
          <div class="width_23">借板拍照</div>
          <div class="pic b-gray-color">
            <img :src="item" :key="item" v-for="(item,index) in borrowBoard" @click="imagePreview(index)">
          </div>
        </div>
      </template>
    </layoutModule>
    <layoutModule title="借板信息" v-if="returned.length">
      <template #main>
        <plateInfoItem v-for="(item ,index) in  returned" :key="index" :item-info="item"/>
      </template>
    </layoutModule>
  </div>
</template>

<script setup>
import PlateInfoItem from "@/views/borrowPlate/components/plateInfoItem.vue";
import LayoutModule from "@/components/layout/layoutModule.vue";
import {ImagePreview} from 'vant';
import useReviewDetail from "@/views/borrowPlate/useReviewDetail";

let {status} = useReviewDetail({isDetail: false})

const props = defineProps({
  detail: {
    type: Object,
    require: true
  }
})
let keys = [
  {
    name: '借板工段',
    key: 'sectionCode'
  }, {
    name: '归还时间',
    key: 'expectReturnTime'
  }, {
    name: '借板联络人',
    key: 'createBy'
  }, {
    name: '联络人电话',
    key: 'createByPhone'
  }
]

// 借板照片
const borrowBoard = computed(() => {
  return (props.detail?.photos || []).filter((item) => item.type === 'borrowBoard').map((item) => item.photoUrl)
})

// 良板信息
const returned = computed(() => {
  // return (props.detail?.serialNumbers || []).filter((item) => item.status !== 'scrapReturned')
  return props.detail?.serialNumbers || []
})

const imagePreview = (index) => {
  ImagePreview({
    images: borrowBoard.value,
    startPosition: index,
  });
}

</script>

<style lang="scss" scoped>
.detail {
  .pic {
    display: flex;
    flex-wrap: wrap;
    margin-top: 36px;
    flex: 1;

    img {
      height: 80px;
      width: 80px;
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }

  .height_36 {
    line-height: 36px;
    //height: 36px;
    color: $e-gray;
    font-size: 14px;
  }

  .width_23 {
    width: 23vw;
    flex-shrink: 0;
  }
}
</style>
