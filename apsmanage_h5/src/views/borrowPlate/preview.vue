<template>
  <div class="preview">
    <detail :detail="previewDetail"></detail>

    <!--  <layoutModule title="审批流程">-->
    <!--    <template #main>-->
    <!--      <flow></flow>-->
    <!--    </template>-->
    <!--  </layoutModule>-->
  </div>
</template>

<script setup>
import Detail from "@/views/borrowPlate/components/detail.vue";
import Flow from "@/views/borrowPlate/components/flow.vue";
import useReviewDetail from "@/views/borrowPlate/useReviewDetail";

let {previewDetail} = useReviewDetail()
console.log(previewDetail)
</script>

<style scoped lang="scss">
.preview {

}
</style>
