<template>
  <div class="filter">
    <div class="ui-cell ui-cell-sb filter_time">
      <div class="filter_time--before">前一天</div>
      <div @click="toggleCalendar(true)">{{filterData.time}}</div>
      <div class="filter_time--after">后一天</div>
    </div>
    <div class="ui-cell ui-cell-sb">
      <PxtTab showFilter :tabList=" [{value: 0, label: '全部'},{value:1, label: '已完成'},{value:2, label: '未完成'}]" @handleTab="handleTab" :activeIndex="filterData.tab"
              @handleFilter="togglePopup(true)"></PxtTab>
    </div>
    <div class="ui-cell ui-cell-sb filter_info">
      <div>日检</div>
      <div>点检人：张三</div>
    </div>
  </div>
  <van-calendar v-model:show="calendarShow" :formatter="formatter" color="#1572F9" style="height: 550px" @confirm="handleTime" :min-date="new Date(2020, 0, 1)" :max-date="new Date()"/>
  <van-action-sheet v-model:show="popupShow">
    <div class="filter_sheet">
      <!--头部标题-->
      <div class="ui-cell ui-cell-sb filter_sheet--head">
        <div>
          <!--占位-->
        </div>
        <div>全部筛选</div>
        <van-icon name="cross" size="24" @click="togglePopup(false)"/>
      </div>
      <!--中间筛选主体-->
      <div class="filter_sheet_main">
        <slot></slot>
      </div>
      <!--底部按钮-->
      <div class="filter_sheet--reset">
        <pxt-button @click="reset">重置条件</pxt-button>
        <pxt-button type="active" @click="confirmFilter">确定筛选</pxt-button>
      </div>
    </div>
  </van-action-sheet>
</template>
<script setup name="baseFilter">
import {useToggle} from '@vueuse/core';
import PxtButton from "@/components/button/button.vue";
import PxtTab from '@/components/tab/tab.vue'
import {deepClone, year} from "@/utils/utils";

let props = defineProps({
  filterData: {
    type: Object,
    default: ()=>{}
  },
})
const emit = defineEmits(["update:filterData","confirmFilter"])

const [calendarShow, toggleCalendar] = useToggle();
const [popupShow, togglePopup] = useToggle();
let resetFilterData={}
const formatter = (day) => {
  const month = day.date.getMonth() + 1;
  const date = day.date.getDate();

  if (month === 8) {
    if (date === 1) {
      day.bottomInfo = '●';
      // day.type='disabled'
      day.className='bottom_inf'
    }
  }
  if (day.type === 'start') {
    day.bottomInfo = '开始';
  } else if (day.type === 'end') {
    day.bottomInfo = '结束';
  }

  return day;
};
// 点击tab
const handleTab = (index) => {
  emit('update:filterData',{...deepClone(resetFilterData),tab:index})
}
onMounted(()=>{
  resetFilterData=deepClone(unref(props.filterData))
})
const reset = () => {
  //必须使用两个deepClone，使他完全和filterData脱钩
  emit('update:filterData',deepClone(resetFilterData))
}
const handleTime = (value) => {
  toggleCalendar(false)
  emit('update:filterData',{...deepClone(resetFilterData),time:year(value)})
}
const confirmFilter = () => {
  togglePopup(false)
  emit('confirmFilter')
}
</script>

<style lang="scss" scoped>
.filter_sheet_1 {
  :deep(.van-icon-cross:before) {
    color: $b-gray;
  }
}
.bottom_inf{
  color: #34C606 !important;
}
:deep(.van-calendar__bottom-info){
  color: red;
}
.filter {
  background: #FFFFFF;
  padding: 13px 20px 0 20px;

  &_sheet {
    min-height: 250px;
    padding: 10px 20px 70px 20px;
    position: relative;

    &--head {
      font-size: 18px;
      color: $b-gray;
    }

    &--reset {
      width: calc(100% - 40px);
      display: flex;
      position: absolute;
      bottom: 15px;
      justify-content: space-between;
    }

  }

  &_time {
    line-height: 32px;
    text-align: center;
    color: #E2E4E9;
    margin-bottom: 10px;
    div {
      height: 32px;
      width: 74px;
    }

    div:nth-of-type(2) {
      font-size: 18px;
      color: $b-gray;
      width: auto;
    }

    &--before {
      background: $g-gray;
    }

    &--after {
      background: $g-gray;
      color: $c-gray;
    }
  }

  &_info{
    font-size: 16px;
    color: $b-gray;
    height: 44px;
  }
}

</style>
