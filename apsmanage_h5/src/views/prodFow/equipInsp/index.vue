<!--物料排产信息-->
<template>
  <div class="prod_main equip">
    <signature></signature>
    <BaseFilter v-model:filterData="filterData" ref="filter" @confirmFilter="confirmFilter">
      <div>
        <el-form :model="filterData" ref="ruleFormRef"  label-width="90px" label-position="left">
          <PxtSelect label="任务名称" prop="selectChecked" class="mt-12" v-model="filterData.selectChecked"></PxtSelect>
          <PxtRadio  label="点检类型" prop="radioChecked" v-model="filterData.radioChecked"></PxtRadio>
          <PxtCheckbox label="点检类型" prop="checkboxChecked" v-model="filterData.checkboxChecked"></PxtCheckbox>
        </el-form>
<!--        <PxtTextarea title="处理备注" class="mb-15 mt-9" v-model:selectChecked="filterData.selectChecked"></PxtTextarea>-->
      </div>
    </BaseFilter>
    <CheckCardInfo></CheckCardInfo>
  </div>
  <PxtPrompt title="" v-model:showPrompt="showPrompt" @confirm="showPrompt=false">
    <div class="title">通知已发送</div>
  </PxtPrompt>
</template>

<script setup>
import BaseFilter from '../components/baseFilter.vue'
import CheckCardInfo from '../components/checkCardInfo.vue'
import PxtCheckbox from '@/components/form/checkbox.vue'
import PxtTextarea from '@/components/form/textarea.vue'
import PxtRadio from '@/components/form/radio.vue'
import PxtSelect from '@/components/form/select.vue'
import PxtPrompt from '@/components/dialog/prompt.vue'
import {year} from "@/utils/utils";

let showPrompt = ref(false)
let ruleFormRef=ref({})
let filterData = ref({
  checkboxChecked: ['test1'],
  radioChecked: 'test1',
  selectChecked:'',
  time: year(new Date()),
  tab: 0
})

function confirmFilter() {
  console.log('confirmFilter')
}
</script>

<style lang="scss" scoped>
.equip {
  display: flex;
  flex-direction: column;
}

.title {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: $b-gray;
}
</style>
