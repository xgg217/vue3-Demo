<template>
  <!-- 任务详情 -->
  <div class="taskInfoItemWrap relative">
    <!-- 头部 -->
    <header class="flex-align-center">
      <img class="mr-8" src="../../../../assets/images/task.png">
      <span class="nameWrap">{{ Props.itemInfo.workOrderNo }}</span>
      <span class="statusTimeWrap">{{ Props.itemInfo.diffTime }}</span>
    </header>
    <!-- 内容 -->
    <main>
      <ul>
        <li v-for="(item) in keyList" :key="item.key" class="flex">
          <span class="mr-20 e-gray-color">{{ item.name }}</span>
          <span>{{ Props.itemInfo[item.key] || "--" }}</span>
        </li>
      </ul>
    </main>
    <!-- 任务状态 -->
    <div class="absolute statusWrap" :style="{backgroundColor: statusList[Props.itemInfo.taskStatus - 1].color}">
      {{ statusList[Props.itemInfo.taskStatus - 1].name }}
    </div>
  </div>
</template>

<script setup>
const Props = defineProps({
  itemInfo: {
    type: Object,
    require: true
  }
})
/* 内容展示key列表 */
const keyList = [
  {name: "所属产线", key: "pdlineName"},
  {name: "需求套数", key: "orderNum"},
  {name: "生产时间", key: "produceTime"},
]
/* 状态 */
const statusList = [
  {name: "待执行", color: "#0096FF"},
  {name: "任务超时", color: "#FF3A35"},
  {name: "完成", color: "#34C606"},
  {name: "超时完成", color: "#FF8B00"}
]

</script>

<style lang="scss" scoped>
.taskInfoItemWrap{
  height: 163px;
  box-shadow: 0px 0px 25px 1px #DEEEFF;
  color: $b-gray;
  header{
    height: 49px;
    border-bottom: 1px solid #EEEFEF;
    padding: 0 20px;
    box-sizing: border-box;
    img{
      height: 32px;
      width: 32px;
    }
    &>span{
      height: 48px;
      line-height: 48px;
    }
    .nameWrap{
      flex: 1;
      font-weight: bold;
      font-size: 16px;
    }
    .statusTimeWrap{
      font-size: 14px;
      color: #FF3A35;
    }
  }
  main{
    padding: 10px 20px 0;
    box-sizing: border-box;
    li{
      height: 32px;
      line-height: 32px;
      font-size: 14px;
    }
  }
  .statusWrap{
    bottom: 0;
    right: 0;
    width: 88px;
    height: 32px;
    color: white;
    font-size: 14px;
    text-align: center;
    line-height: 32px;
    border-radius: 2px 0 2px 0;
  }
}
</style>