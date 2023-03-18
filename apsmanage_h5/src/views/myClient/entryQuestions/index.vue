<template>
  <div class="questionsWrap">
    <businessLayoutSlot mainHeight="30%" :isEdit="isEdit">
      <template v-slot:header>
        <demandForm></demandForm>  
      </template>
      <template v-slot:main>
        <uploadProtocol></uploadProtocol>
        <entryQuestions ref="entryQuestionsComp" @changeEditStatus="changeEditStatus" @changeSaveStatus="changeSaveStatus"></entryQuestions>
      </template>
      <template v-slot:footer v-if="isEdit">
        <el-button v-if="route.name === 'entryQuestions' || route.query.name === 'entryQuestions'" style="width: 90%;" type="primary" @click="entryQuestion">录入问题点</el-button>
        <el-button v-else-if="route.name === 'answerQuestions' || route.query.name === 'answerQuestions'" style="width: 90%;" type="primary" @click="answerQuestions"><span class="fz-16" style="margin-right: 4vw">确认</span><span class="fz-12">回复</span></el-button>
        <template v-else-if="route.name === 'legalAppraise' && state == 9">
          <el-button v-if="!isSave" style="width: 43%;" type="primary" plain @click="saveData(false)"><span class="fz-16" style="margin-right: 4vw">保存</span><span class="fz-12">数据稍后预约</span></el-button>
          <el-button :style="{width: isSave ? '90%' : '43%'}" type="primary" @click="saveData(true)"><span class="fz-16" style="margin-right: 4vw">确认</span><span class="fz-12">预约风险评审会</span></el-button>
        </template>
        <el-button v-else-if="(route.name === 'legalAppraise' || route.query.name === 'legalAppraise') && state == 11" style="width: 90%;" type="primary" @click="offlineBridge"><span class="fz-16" style="margin-right: 4vw">下一步</span><span class="fz-12">业务线下沟通</span></el-button>
      </template>
    </businessLayoutSlot>
  </div>
</template>

<script setup>
  import businessLayoutSlot from "@/components/business/layoutSlot.vue";
  import entryQuestions from "./entryQuestions.vue";
  import uploadProtocol from "../uploadProtocol/uploadProtocol.vue"
  import demandForm from '../addDemand/module/demandForm.vue';
  import { useBusinessStore } from "@/store/business"

  const businessStore = useBusinessStore()
  const { state } = storeToRefs(businessStore)

  const route = useRoute()


  const entryQuestionsComp = ref()
  const isEdit = ref(true)
  const isSave = ref(false)

  const changeEditStatus = (value) => {
    isEdit.value = value
  }

  const changeSaveStatus = (value) => {
    isSave.value = value
  }

  const entryQuestion = () => {
    entryQuestionsComp.value.entryQuestions()
  }

  const answerQuestions = () => {
    entryQuestionsComp.value.answerQuestions()
  }

  const saveData = (flag) => {
    console.log("触发")
    entryQuestionsComp.value.saveData(flag)
  }

  const offlineBridge = () => {
    entryQuestionsComp.value.offlineBridge()
  }
</script>

<style lang="scss" scoped>
.questionsWrap{
  // height: 100%;
  background-color: #F4F5FC;
}
</style>