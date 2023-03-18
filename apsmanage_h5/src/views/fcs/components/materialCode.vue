<template>
  <div class="customs">
    <div class="table-border w-full">
      <PxTable :cols="tableCol" :data-source="tableDetail.table" class="w-full">
        <template #customerNo="{row}">
          <div>{{ row.customerNo }}</div>
        </template>
        <template #materialNumber="{row}">
          <div>{{ row.materialNumber }}</div>
        </template>
        <template #materialSeq="{row}">
          <div>{{ row.materialSeq }}</div>
        </template>
      </PxTable>
    </div>
    <div class="busElInput pt-10"  v-if="tableDetail?.company">
      <el-form-item  label="海关账册编码" prop="remarks">{{tableDetail.bookNumber}}</el-form-item>
      <el-form-item  label="海关账册名称" prop="remarks">{{tableDetail.bookName}}</el-form-item>
      <el-form-item  label="手册类型" prop="remarks">{{tableDetail.manualType}}</el-form-item>
      <el-form-item  label="账册有效期" prop="remarks">{{tableDetail.startTime}}-{{tableDetail.endTime}}</el-form-item>
      <el-form-item  label="备案公司" prop="remarks">{{tableDetail.company}}</el-form-item>
      <el-form-item  label="未备案料件" prop="remarks">
        <div class="flex">
          <div color="#FF3A35" v-if="tableDetail.unFinishedMaterialsArr.length" @click="openUnFinishedMaterials(tableDetail.unFinishedMaterialsArr)">
           {{tableDetail.unFinishedMaterialsArr.length}} &nbsp;<span color="#1572F9"> 查看未备案料件清单</span>
          </div>
          <div  class="pr-10" v-else>0</div>
        </div>
      </el-form-item>
    </div>
    <PxtPrompt @confirm="openUnFinishedMaterials" v-model:show-prompt="showUnFinished" title="未备案料件" :show-cancel-button="false" >
      {{showUnFinishedStr}}
    </PxtPrompt>
  </div>
</template>

<script setup>
import PxtPrompt from '@/components/dialog/prompt.vue'
import PxTable from "@/components/table/table.vue"
const router = useRouter()
const props = defineProps({
  tableDetail: {
    type: Object,
    default: () => {}
  },
})
let showUnFinished=ref(false)
let showUnFinishedStr=ref('')
let tableCol=[
  {label: "客户料号", key: "customerNo", width: 90, scope: {customRender: "customerNo"},},
  {label: "我司料号（成品）", key: "materialNumber",width: 140,scope: {customRender: "materialNumber"}},
  {label: "备案成品料号", key: "materialSeq", width: 110,scope: {customRender: "materialSeq"}},
]
const openUnFinishedMaterials = (val) => {
  showUnFinished.value=!showUnFinished.value
  showUnFinishedStr.value=(val || []).map((item)=>item.materialName).join(',')
}
</script>

<style scoped lang="scss">
.customs {
  :deep(.el-form-item__label){
    justify-content: flex-start;
    width: 30vw;
  }
  :deep(.el-form-item){
    margin-bottom: 0;
  }
}

</style>
