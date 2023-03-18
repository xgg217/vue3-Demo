<template>
  <div class="bom">
    <div :class="{'ui-cell':!bomFileList.length}">
      <div class="label">客供BOM</div>
      <span v-if="!bomFileList.length">无</span>
      <div class="file" v-else>
        <BusinessFileList :showDelete="false" :fileList="bomFileList"></BusinessFileList>
      </div>
    </div>
    <div :class="{'ui-cell':!bomDetail.prototypePic.length}">
      <div class="label">样机图片</div>
      <span v-if="!bomDetail.prototypePic.length">无</span>
      <div class="file" v-else>
        <BusinessFileList :showDelete="false" :fileList="bomDetail.prototypePic"></BusinessFileList>
      </div>
    </div>
    <div :class="{'ui-cell':!bomDetail.otherFile.length}">
      <div class="label">其它附件</div>
      <span v-if="!bomDetail.otherFile.length">无</span>
      <div class="file" v-else>
        <BusinessFileList :showDelete="false" :fileList="bomDetail.otherFile"></BusinessFileList>
      </div>
    </div>
    <HandlePeople :time="bomDetail?.createdTime" :name="bomDetail?.createdBy"></HandlePeople>
  </div>
</template>

<script setup>
import BusinessFileList from '@/components/businessFileList/index.vue'
import HandlePeople from '@components/handlePeople.vue'

const offerId = inject('offerId')

const props = defineProps({
  bomDetail: {
    type: Object,
    default: () => {
    }
  },
})

let bomFileList = computed(() => {
  let name = props.bomDetail?.customerBom
  let url = props.bomDetail?.customerBomUrl
  if (!name || !url) {
    return []
  } else {
    return [{name, url}]
  }
})

</script>

<style lang="scss" scoped>
.bom {
  padding: 10px 20px 0 20px;
  background: #FFFFFF;
  color: #4a4a4a;
  font-size: 14px;

  .label {
    font-size: 14px;
    color: $e-gray;
    height: 36px;
    line-height: 36px;
    width: 24vw;
  }

  .file {
    margin-left: 16vw;
    //width: 245px;
    //width: 250px;
  }

  .detail {
    font-size: 14px;
    margin-left: -45px;
    color: #4a4a4a;
    display: inline-block;
  }

}
</style>
