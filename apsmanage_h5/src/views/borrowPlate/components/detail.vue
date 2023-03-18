<template>
  <div class="detail">
    <layoutModule title="信息详情">
      <template #main>
        <div v-for="item in keys" :key="item" class="flex height_36">
          <template v-if="detail?.[item.key]">
            <div class="width_23">{{ item.name }}</div>
            <div class="flex1 flex ui-nowrap" v-if="item.key==='status'" color='#0096FF'>{{ status[detail?.[item.key]] }}</div>
            <div class="flex1 flex ui-nowrap b-gray-color" v-else-if="item.key==='isDispatchCar'">{{ detail?.[item.key] ? '是' : '否' }}</div>
            <!--已经归还的，显示真实归还时间，没归还的 按ipqc分别显示不同的时间格式-->
            <div class="flex1 flex ui-nowrap b-gray-color" v-else-if="item.key==='expectReturnTime'">{{ detail?.[item.key] || detail?.returnTime }}</div>
            <div class="flex1 flex ui-nowrap b-gray-color" v-else>{{ detail?.[item.key] }}</div>
          </template>
        </div>
        <div class="flex height_36" v-if="borrowBoard.length">
          <div class="width_23">借板拍照</div>
          <div class="pic b-gray-color">
            <img :src="item" :key="item" v-for="(item,index) in borrowBoard" @click="imagePreview('borrowBoard',index)">
          </div>
        </div>
        <div class="flex height_36" v-if="returnBoard.length">
          <div class="width_23">还板拍照</div>
          <div class="pic b-gray-color">
            <img :src="item" :key="item" v-for="(item,index) in returnBoard" @click="imagePreview('returnBoard',index)">
          </div>
        </div>
      </template>
    </layoutModule>
    <layoutModule title="借板信息" v-if="returned.length">
      <template #main>
        <plateInfoItem v-for="(item ,index) in  returned" :key="index" :item-info="item"/>
      </template>
    </layoutModule>
    <layoutModule title="报废品信息" v-if="scrapReturned.length">
      <template #main>
        <plateInfoItem v-for="(item ,index) in scrapReturned" :key="index" :item-info="item">
        </plateInfoItem>
      </template>
    </layoutModule>
  </div>
  <!-- 任务详情 -->
</template>

<script setup>
import PlateInfoItem from "@/views/borrowPlate/components/plateInfoItem.vue";
import LayoutModule from "@/components/layout/layoutModule.vue";
import {ImagePreview} from 'vant';
import useReviewDetail from "@/views/borrowPlate/useReviewDetail";
import {formatTime, year} from "@/utils/utils";

let {status,isIPQC} = useReviewDetail({isDetail: false})
const props = defineProps({
  detail: {
    type: Object,
    require: true
  }
})
let keys = [
  {
    name: '申请编号',
    key: 'id'
  },
  {
    name: '状态',
    key: 'status'
  },
  {
    name: '申请人',
    key: 'createBy'
  },
  {
    name: '借板工段',
    key: 'sectionCode'
  }, {
    name: '借板原因',
    key: 'reason'
  }, {
    name: '借板去处',
    key: 'toWhere'
  }, {
    name: '是否派车',
    key: 'isDispatchCar'
  }, {
    name: '归还时间',
    key: 'expectReturnTime'
  }, {
    name: '责任单位',
    key: 'dutyUnit'
  }, {
    name: '报废原因',
    key: 'specificCause'
  }
]

// 借板照片
const borrowBoard = computed(() => {
  return (props.detail?.photos || []).filter((item) => item.type === 'borrowBoard').map((item) => item.photoUrl)
})
// 还板照片
const returnBoard = computed(() => {
  return (props.detail?.photos || []).filter((item) => item.type === 'returnBoard').map((item) => item.photoUrl)
})
// 良板信息
const returned = computed(() => {
  // ( props.detail?.serialNumbers || []).filter((item) => item.status !== 'scrapReturned')
  return props.detail?.serialNumbers || []
})
// 废板信息
const scrapReturned = computed(() => {
  return (props.detail?.serialNumbers || []).filter((item) => item.status === 'scrapReturned')
})

const imagePreview = (key, index) => {
  ImagePreview({
    images: key === 'borrowBoard' ? borrowBoard.value : returnBoard.value,
    startPosition: index,
  });
}
// watch(()=>props.detail,(value)=>{
//   if (value){
//     setTitle(`${value?.createBy}提交的借板申请`)
//   }
// },{deep:true})

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
