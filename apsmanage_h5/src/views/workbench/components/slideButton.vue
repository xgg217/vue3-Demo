<template>
  <div class="slideButtonWrap">
    <ul>
      <li v-for="(item) in typeList" :key="item.value" class="mr-10" :class="{'active': item.value === newCurrentIndex, 'mr-24': item.promptNum > 0}" @click="changeIndex(item.value)">
        <div v-if="item.promptNum > 0" class="promptNumWrap absolute">{{ item.promptNum > 99 ? '99+' : item.promptNum }}</div>
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script setup>
const route = useRoute()
const emit = defineEmits(["update:currentIndex", "change"])
const props = defineProps({
  typeList: {
    type: Array,
    default: () => [
      {label: "我发起", promptNum: 102, value: 1},
      {label: "我参与", promptNum: 3, value: 2},
      {label: "组织成员发起+参与", promptNum: 0, value: 3},
      {label: "全部", promptNum: 0, value: 4}
    ]
  },
  currentIndex: {
    type: [Number, String],
    // default: 0
  },
})
/* 当前选中的 */
const newCurrentIndex = computed({
  get: () => props.currentIndex,
  set: (value) => {
    emit('update:currentIndex', value)
    // emit('change')
  }
})

/* 选中事件 */
const changeIndex = (index) => {
  newCurrentIndex.value = index
}
/* 根据路由选中 */
onMounted(() => {
  const index = +route.params.type
  if(Number(index)) changeIndex(index)
})
</script>

<style lang="scss" scoped>
.slideButtonWrap{
  height: 56px;
  overflow: hidden;
  ul{
    padding-top: 24px;
    height: calc(100% + 10px);
    width: auto;
    white-space: nowrap;
    overflow-x: auto;
    li{
      position: relative;
      display: inline;
      height: 100%;
      line-height: 32px;
      padding: 5px 18px;
      border: 1px solid #2972FE;
      color: #2972FE;
      font-size: 16px;
      box-sizing: border-box;
      border-radius: 16px;
      .promptNumWrap{
        height: 16px;
        width: 28px;
        background-color: #FF4C4D;
        border-radius: 22px 22px 22px 0;
        top: -8px;
        right: -14px;
        color: white;
        text-align: center;
        line-height: 18px;
        font-size: 10px;
      }
    }
    .active{
      background-color: #2972FE;
      color: white;
    }
  }
}
</style>
