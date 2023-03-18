<template>
  <div class="customs">
    <div class="table-border">
      <PxTable :cols="tableCol" :data-source="tableDetail">
        <template #materialType="{row}">
          <div>{{ row.materialType }}</div>
        </template>
        <template #materialSeq="{row}">
          <div :style="styleColor(row)">{{ row.materialSeq }}</div>
        </template>
        <template #plusQty="{row}">
          <div :style="styleColor(row)">{{ row.plusQty }}</div>
        </template>
        <template #fcsNumber="{row}">
          <div>{{ row.fcsNumber }}</div>
        </template>
      </PxTable>
    </div>
  </div>
</template>

<script setup>
import PxTable from "@/components/table/table.vue"
const router = useRouter()
const props = defineProps({
  tableDetail: {
    type: Array,
    default: () => []
  },
})
let tableCol=[
  {label: "类型", key: "materialType", scope: {customRender: "materialType"},},
  {label: "备案料号", key: "materialSeq",scope: {customRender: "materialSeq"}},
  {label: "账册结余", key: "plusQty",scope: {customRender: "plusQty"}},
  {label: "2周内FCS数量", key: "fcsNumber",scope: {customRender: "fcsNumber"}},
]
const styleColor = (row) => {
  return Number(row.plusQty)<Number(row.fcsNumber)?{color:'#FF3A35'}:{}
}
</script>

<style scoped lang="scss">
.customs {

}

</style>
