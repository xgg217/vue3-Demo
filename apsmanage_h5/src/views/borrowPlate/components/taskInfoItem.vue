<template>
  <!-- 任务详情 -->
  <div class="taskInfoItemWrap relative">
    <!-- 头部 -->
    <header class="flex-align-center">
      <img class="mr-8" src="@/assets/images/task.png">
      <span class="nameWrap ui-nowrap">{{ itemInfo?.createBy }}的借板申请</span>
      <span class="statusTimeWrap">{{ getYMD(itemInfo?.createTime) }}</span>
    </header>
    <!-- 内容 -->
    <main>
      <ul>
        <li class="flex">
          <span class="mr-20 e-gray-color">借板数量</span>
          <span>{{ itemInfo?.qty }}</span>
        </li>
        <li class="flex">
          <span class="mr-20 e-gray-color">借板工段</span>
          <span>{{ itemInfo?.sectionCode }}</span>
        </li>
        <li class="flex">
          <span class="mr-20 e-gray-color">借板原因</span>
          <span>{{ itemInfo?.reason }}</span>
        </li>
      </ul>
    </main>
    <!-- 任务状态 -->
    <div class="absolute statusWrap ui-nowrap" :style="{backgroundColor:statusList[itemInfo?.status]?.color}">
      {{ statusList[itemInfo?.status]?.name }}
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
/* 状态 */
const statusList = {
  'reject': {name: "拒绝借板", color: "#FF3A35"},
  'wait_receiver': {name: "待填写接收人信息", color: "#34C606"},
  'wait_receiver_confirm': {name: "待接收人确认", color: "#34C606"},
  'borrowing': {name: "借板中", color: "#34C606"},
  'apply_returned': {name: "还板中，待确认", color: "#34C606"},
  'confirm_returned': {name: "已归还", color: "#34C606"}
}

const getYMD = (v) => {
  if (v){
    return v.slice(0,10)
  }
  return ''

}
</script>

<style lang="scss" scoped>
.taskInfoItemWrap {
  height: 163px;
  box-shadow: 0px 0px 25px 1px #DEEEFF;
  color: $b-gray;

  header {
    height: 49px;
    border-bottom: 1px solid #EEEFEF;
    padding: 0 20px;
    box-sizing: border-box;

    img {
      height: 32px;
      width: 32px;
    }

    & > span {
      height: 48px;
      line-height: 48px;
    }

    .nameWrap {
      flex: 1;
      font-weight: bold;
      font-size: 16px;
    }
  }

  main {
    padding: 10px 20px 0;
    box-sizing: border-box;

    li {
      height: 32px;
      line-height: 32px;
      font-size: 14px;
    }
  }

  .statusWrap {
    bottom: 0;
    right: 0;
    width: 95px;
    height: 32px;
    color: white;
    font-size: 14px;
    text-align: center;
    line-height: 32px;
    border-radius: 2px 0 2px 0;
    box-sizing: border-box;
    padding: 0 5px;
  }
}
</style>
