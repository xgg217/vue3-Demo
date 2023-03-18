<template>
  <!-- 任务详情 -->
  <div class="taskInfoItemWrap relative">
    <!-- 头部 -->
    <header class="flex-align-center">
      <img class="mr-8" src="../../../assets/images/task.png">
      <span class="nameWrap">{{ Props.itemInfo[Props.deployData.header.nameKey] }}</span>
      <span class="statusTimeWrap">{{ Props.itemInfo[Props.deployData.header.timeStatusKey] }}</span>
    </header>
    <!-- 内容 -->
    <main>
      <ul>
        <li v-for="(item) in Props.deployData.content" :key="item.key" class="flex">
          <span class="mr-20 e-gray-colo" style="min-width: 15vw;flex-shrink:0">{{ item.label }}</span>
          <span class=" ui-nowrap">{{ Props.itemInfo[item.key] || "--" }}</span>
          <span class="ml-5  ui-nowrap" v-if="item.unitKey" :style="{color: Props.deployData.unitColor[Props.itemInfo[item.unitKey]]}"> ({{ Props.itemInfo[item.unitKey] }})</span>
        </li>
      </ul>
    </main>
    <!-- 任务状态 -->
    <div class="absolute statusWrap" :style="{backgroundColor: Props.deployData.status[Props.itemInfo[Props.deployData.statusKey] - 1].color}">
      {{ Props.deployData.status[Props.itemInfo[Props.deployData.statusKey] - 1].name }}
    </div>
  </div>
</template>

<script setup>
const Props = defineProps({
  itemInfo: {
    type: Object,
    require: true
    // default: () => {
    //   return {
    //     params1: "123456",
    //     params1Unit: "不合格",
    //     params2: "123456",
    //     params3: "123456",
    //     params4: "123456",
    //     params5: "123456",
    //     params6: "123456",
    //     status: 1,
    //     name: "测试",
    //     timeStatus: "超时2：58：02"
    //   }
    // }
  },
  deployData: {
    type: Object,
    require: true
    // default: () => {
    //   return {
    //     header: {
    //       nameKey: "name",
    //       timeStatusKey: "timeStatus"
    //     },
    //     content: [
    //         {label: "抽检类型", key: "params1", unitKey: "params1Unit"},
    //         {label: "工单编号", key: "params2"},
    //         {label: "料号", key: "params3"},
    //         {label: "抽检批号", key: "params4"},
    //         {label: "批号数量", key: "params5"},
    //         {label: "抽检时间", key: "params6"},
    //     ],
    //     /* 根据状态下标选择 */
    //     status:  [
    //         {name: "待执行", color: "#0096FF"},
    //         {name: "任务超时", color: "#FF3A35"},
    //         {name: "完成", color: "#34C606"},
    //         {name: "超时完成", color: "#FF8B00"}
    //     ],
    //     statusKey: "status",
    //     unitColor: {
    //         "不合格": "#FF3A35"
    //     }
    //   }
    // }
  }
})

</script>

<style lang="scss" scoped>
.taskInfoItemWrap{
  // height: 163px;
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
    padding: 10px 20px 24px;
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
