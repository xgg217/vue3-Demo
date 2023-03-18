<script setup lang="ts">
import { ref } from 'vue';
import demandForm from './components/demandForm.vue';

const {
  formData,
  submitFormData
} = (function () {
  const formData = ref()

  const submitFormData = () => {
    console.log('提交表单数据');
  }

  return {
    formData,
    submitFormData
  }
})()


</script>

<template>
  <div class="addDemand flex-cul">
    <div class="splitWrap" style="left: 0vw;"></div>
    <div class="formWrap">
      <demandForm ref="formData" :submitForm="submitFormData"></demandForm>
    </div>
    <!-- <div class="bottomOperate flex-center" v-if="state < 3 || (state > 5 && state < 7) || route.name == 'addDemand'">
      <div class="bottomOperateWrap flex-center">
        <template v-if="state != 1">
          <el-button v-if="route.name == 'addDemand'" @click="submit(false)" type="primary" plain>暂存，下次审批</el-button>
          <el-button v-if="state == 0 && route.name !== 'addDemand'" @click="changeFormState" type="primary" plain>放弃此数据</el-button>
        </template>

        <el-button v-if="state == 0 || route.name == 'addDemand' || state == 6" type="primary" @click="submit(true)">确认，发起审批</el-button>
        <el-button v-else-if="state == 2" style="width: 90%" type="primary" @click="chenckMettingInfo">查看评审会信息</el-button>
        <el-button v-else-if="state == 1" type="primary" @click="copyCustomer">复制此客户</el-button>
      </div>
    </div> -->

  </div>
</template>

<style scoped lang="scss">
.addDemand{
  // height: 100%;
  box-sizing: border-box;
  overflow: auto;
  color:#4A4A4A;
  background-color: white;
  .formWrap{
    overflow-y: auto;
    overflow-x: hidden;
    flex: 1;
    padding: 16px 20px 0;
  }
  .RethinkInfoWrap{
    box-sizing: border-box;
    padding: 0 20px;
  }
  .bottomOperate{
    height: 60px;
    position: relative;
    .bottomOperateWrap{
      width: 100%;
      height: 60px;
      box-sizing: border-box;
      box-shadow: 0 0 2px 2px rgb(238, 238, 238);
      position: fixed;
      bottom: 0;
      background-color: white;
      z-index: 99;
    }
    .el-button{
      height: 44px;
      border-radius: 2px;
      border: unset;
      width: 40%;
    }
  }
}
</style>
