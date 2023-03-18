<template>
  <!-- 任务详情 -->
  <div class="taskInfoItemWrap relative">
    <!-- 头部 -->
    <header class="flex-align-center">
      <img class="mr-8" src="@/assets/images/task.png">
      <span class="nameWrap">{{ itemInfo?.serialNumber }}</span>
      <span class="statusTimeWrap">
       <slot></slot>
      </span>
    </header>
    <!-- 内容 -->
    <main>
      <ul>
        <li class="flex">
          <span class="mr-20 e-gray-color">工单号</span>
          <span>{{ itemInfo?.workOrderNo }}</span>
        </li>

        <li class="flex">
          <span class="mr-20 e-gray-color">料号</span>
          <span>{{ itemInfo?.partNo }}</span>
        </li>
        <li class="flex">
          <span class="mr-20 e-gray-color">客户名称</span>
          <span>{{ itemInfo?.custName }}</span>
        </li>
        <li class="flex">
          <span class="mr-20 e-gray-color">客户机型</span>
          <span>{{ itemInfo?.modelName }}</span>
        </li>
        <li class="flex">
          <span class="mr-20 e-gray-color">制程点</span>
          <span>{{ itemInfo?.nodeName }}</span>
        </li>
        <li class="flex">
          <span class="mr-20 e-gray-color">线别名称</span>
          <span>{{ itemInfo?.assemblyLineName }}</span>
        </li>
      </ul>
    </main>
  </div>
</template>

<script setup>
const props = defineProps({
  itemInfo: {
    type: Object,
    require: true
  }
})
</script>

<style lang="scss" scoped>
.taskInfoItemWrap {
  height: 260px;
  box-shadow: 0px 0px 25px 1px #DEEEFF;
  color: $b-gray;
  margin-bottom: 14px;

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
}
</style>
