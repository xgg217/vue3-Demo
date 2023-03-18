<template>
  <div>
    <!-- 筛选选项 -->
    <van-popup
      v-model:show="showPop"
      round
      position="bottom"
      :overlay-style="{'backgroundColor': '#2283d48'}"
      :style="{ height: 'auto' }"
      @closed="hidePop"
    >
      <div class="conditionWrap">
        <header class="relative">{{ Props.title }}
          <span class="absolute" @click="showPop = !showPop">
            <img src="../../../assets/images/closer.png" alt=""></span>
        </header>
        <main>
          <!-- 搜索 -->
          <search v-if="Props.showSearch" prompt="输入关键字搜索" v-model:searchValue="searchValue"></search>
          <!-- 条件 -->
          <div v-for="item in Props.conditionList" :key="item.receiveKey" class="conditionItem">
            <div class="titleWrap">{{ item.label }}</div>
            <div class="selectWrap">
              <!-- 选时间 -->
              <selectDate v-if="item.type === 'selectTime'" v-model:selectTime="condition[item.receiveKey]"></selectDate>
              <!-- 选人 -->
              <selectPerson v-else-if="item.type === 'selectPerson'" :keys="item.receiveKey" v-model:selectPerson="condition[item.receiveKey]"></selectPerson>
              <!-- 多选框 -->
              <el-checkbox-group class="checkboxGroupWrap" v-else-if="item.type === 'checkbox'" v-model="condition[item.receiveKey]">
                <template v-for="(ele, idx) in item.list" :key="ele[checkboxOption['label']]">
                  <el-checkbox v-if="ele[checkboxOption['value']] || ele[checkboxOption['value']]===0" class="checkboxWrap" :label="ele[checkboxOption['value']]" :class="getCheckboxStyle(idx + 1)">{{ ele[checkboxOption['label']]}}</el-checkbox>
                  <el-checkbox v-else class="checkboxWrap" :label="ele[checkboxOption['label']]" :class="getCheckboxStyle(idx + 1)" />
                </template>
                <span v-for="e in restNum(item.list)" :key="item.receiveKey + 'block' + e" class="checkboxWrap"></span>
              </el-checkbox-group>
            </div>
          </div>

        </main>
        <!-- 底部按钮 -->
        <div class="block"></div>
        <footer class="flex">
          <pxtButton width="48%" @click="reset" radius="22px">重置</pxtButton>
          <pxtButton width="48%" type='blue-gradient' @click="comfirm" radius="22px">确定</pxtButton>
        </footer>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import search from "./search.vue"
import selectDate from "./selectDate.vue";
import selectPerson from "@components/selectPerson.vue";
import pxtButton from "@/components/button/button.vue"

const Props = defineProps({
  /* 显隐pop */
  showPop: {
    type: Boolean,
    require: true
  },
  /* 标题 */
  title: {
    type: String,
    default: "筛选条件录入"
  },
  /* 是否显示搜索框 */
  showSearch: {
    type: Boolean,
    default: false
  },
  /* 搜索内容 */
  searchValue: {
    type: String,
    default: ''
  },
  /* 条件列表 */
  conditionList: {
    type: Array,
    default: () => [
      /* label: "名称", type: "类型", receiveKey: "接收值的key" , list: "选项值" */
      {label: "流程类型", type: "checkbox", receiveKey: "businessType", list: [{label: "业务需求", value: 1}, {label: "报价", value: 2}]},
      {label: "发起时间", type: "selectTime", receiveKey: "startTime"},
      {label: "完成时间", type: "selectTime", receiveKey: "FinishTime"},
      {label: "发起人", type: "selectPerson", receiveKey: "promoterIds"},
      {label: "参与人", type: "selectPerson", receiveKey: "playersIds"}
    ]
  },
  /* 条件列表 */
  checkboxOption: {
    type: Object,
    default: () => {
      return {label:'label',value:'value'}
    }
  },
  initExec: {
    type: Boolean,
    default: false
  }
})
const Emit = defineEmits(["update:showPop", "getCondition"])
/* 显隐pop */
const showPop = ref(false)
watch(() => Props.showPop, (newVal) => {
  showPop.value = newVal
})
const hidePop = () => {
  Emit("update:showPop", false)
}
/* 搜索条件 */
const searchValue = ref('')

/* 生成条件接收对象 */
const condition = ref({})
const createRecive = () => {
  const temp = {}
  const tempRef = {}
  Props.conditionList.forEach(item => {
    if (item.type === "checkbox") {
      temp[item.receiveKey] = []
    } else {
      temp[item.receiveKey] = null
      tempRef[item.receiveKey] = null
    }
  })
  condition.value = temp
}
createRecive()
/* 补齐多选框剩余数 */
const restNum = (list) => {
  const num = 3 - list.length % 3
  if (num != 3) {
    return num
  }
  return 0
}
/* 多选框样式 */
const getCheckboxStyle = (index) => {
  if ((index - 2) % 3 === 0) {
    return "flexCenter"
  }
  if ((index - 3) % 3 === 0) {
    return "flexEnd"
  }
}
/* 确定 */
const comfirm = () => {
  Emit("getCondition", {...condition.value, searchValue: searchValue.value})
}
/* 重置 */
const reset = () => {
  createRecive()
  searchValue.value = ""
}

onMounted(() => {
  if (Props.initExec) {
    comfirm()
  }
})
</script>

<style lang="scss" scoped>
.conditionWrap{
  padding: 0 20px;
  width: 100%;
  box-sizing: border-box;
  min-height: 100px;
  position: relative;
  header{
    height: 49px;
    line-height: 49px;
    text-align: center;
    color: #8D9092;
    font-size: 18px;
    font-weight: 500;
    &>span{
      right: 0;
      top: -3px;
      img{
        height: 24px;
        width: 24px;
      }
    }
  }
  .conditionItem{
    margin-top: 10px;
    .titleWrap{
      font-size: 16px;
      color: #1B2124;
    }
    .selectWrap{
      padding: 0px 0 0px 36px;
    }
  }
  .block{
    position: relative;
    height: 10px;
    width: 100vw;
    left: -20px;
    background-color: #F5F5F5;
    margin: 10px 0;
  }
  footer{
    width: 100%;
    justify-content: space-between;
    margin-bottom: 10px;
    .buttonWrap{
      height: 36px;
      border-radius: 18px;
      line-height: 36px;
      text-align: center;
      width: 48%;
    }
    .reset{
      background-color: #EAF1FF;
      color: #2972FE;
      font-size: 16px;
    }
    .comfirm{
      background: linear-gradient(180deg, #5C94FF 0%, #2972FE 100%);
      color: #fff;
      font-size: 16px;
    }
  }
  .checkboxGroupWrap{
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .checkboxWrap{
      width: 30%;
      margin: 0;
      display: flex;
    }
  }
}
</style>
