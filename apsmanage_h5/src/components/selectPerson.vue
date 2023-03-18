<template>
  <div class="selectPersonWrap flex-align-center">
    <div class="personWrap">
      <ul class="personInnerWrap">
        <li v-for="(item, index) in personList" :key="item.userId">
          <span>{{ item.name }}</span>
          <span @click="deleteItem(index)" class="ml-10"><van-icon name="cross" /></span>
        </li>
      </ul>
    </div>
    <div class="plusWrap" @click="openSelectPerson"></div>
  </div>
</template>

<script setup>
import bus from "@/utils/bus";
const emit = defineEmits(["update:selectPerson"])
const props = defineProps({
  selectPerson: {
    type: Array,
    default:()=>[]
  },
  //是否只显示用户所在组的数据
  filter:{
    type: Boolean,
    default:false
  },
  limit:{
    type: Number,
    default:0
  },
  keys: {
    type: String
  }
})
const personList=computed({
  get: () => props.selectPerson,
  set: (value) => {
    emit('update:selectPerson',value)
  }
})
onMounted(() => {
  bus.on("getSelectPerson", (data) => {
    if (window.selectCurrentKey != props.keys) return
    getSelectPerson(data)
  })
})
onUnmounted(()=>{
  bus.off('getSelectPerson')
})

/* 跳转钉钉选人 */
const openSelectPerson = () => {
  window.selectCurrentKey = props.keys
  bus.emit("handelSelectPeople",{show:true,filter:props.filter,limit:props.limit})
}
//获取选人数据
const getSelectPerson = (data) => {
  data.forEach(item => {
    personList.value.push({name: item?.orgName, userId: item?.id})
  })
}
/* 删除人员 */
const deleteItem = (index) => {
  personList.value.splice(index, 1)
}

watch(() => props.selectPerson, (newVal) => {
  // 处理特殊情况，props.selectPerson为null
  if (newVal === null) {
    personList.value = []
  }
},{immediate:true})


</script>

<style lang="scss" scoped>
.selectPersonWrap{
  height: 32px;
  margin: 10px 0;
  .personWrap{
    flex: 1;
    border: 1px solid #F5F5F5;
    height: 100%;
    border-radius: 16px;
    box-sizing: border-box;
    overflow: hidden;
    .personInnerWrap{
      width: 100%;
      height: 40px;
      padding: 2px;
      white-space: nowrap;
      overflow-x: auto;
      overflow-y: hidden;
      li{
        height: 26px;
        border-radius: 16px;
        display: inline-block;
        background-color: #EAF1FF;
        padding: 0 10px;
        line-height: 28px;
        margin-right: 10px;
        font-size: 14px;
      }
    }
  }
  .plusWrap{
    height: 24px;
    width: 24px;
    margin-left: 10px;
    background: url(../assets/commonProcess/plus.png);
    background-size: contain;
  }
}
</style>
