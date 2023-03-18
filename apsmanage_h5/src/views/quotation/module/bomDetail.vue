<template>
  <div class="mt-12">
    <div class="bom">
      <div class="label">我司BOM</div>
      <div class="file">
        <BusinessFileList :showDelete="false" :fileList="bomFileList"></BusinessFileList>
      </div>
    </div>
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1">
        <template v-slot:title>
          <div class="ui-cell ui-cell-sb wh100">
            <div></div>
            <div class="pr-10 fz-14 shrink-0 font-normal" color="#1572F9">{{ title }}</div>
          </div>
        </template>
        <div class="collapse-main">
          <BomFile class="pt-0!" :bomDetail="bomDetail"></BomFile>
          <div v-for="(item,index) in bomDetail.companyBomInfo" :key="index">
            <div class="mt-12 bom">
              <!--没传文件的时候加个cell-->
              <div v-if="index!==0">
                <div class="label">我司BOM</div>
                <div class="file">
                  <BusinessFileList :showDelete="false" :fileList="[{name:item.companyBom,url:item.companyBomUrl}]"></BusinessFileList>
                </div>
              </div>
              <div :class="{'ui-cell':!item?.otherFile?.length}">
                <div class="label">其它附件</div>
                <div v-if="!item?.otherFile?.length">无</div>
                <div class="file" v-else>
                  <BusinessFileList :showDelete="false" :fileList="item?.otherFile || []"></BusinessFileList>
                </div>
              </div>
              <div class="ui-cell">
                <div class="label">备注</div>
                <div>{{ item.remark }}</div>
              </div>
              <HandlePeople :time="item.createdTime" :name="item.createdBy"></HandlePeople>
            </div>
            <div class="mt-12 bom">
              <div class="ui-cell">
                <div class="label w-24">我司BOM检查</div>
                <div>{{ item.checkBom == 0 ? '有误，需调整 ' : '无误，不需调整' }}</div>
              </div>
              <div class="ui-cell">
                <div class="label w-24">检查备注</div>
                <div>{{ item.checkRemark }}</div>
              </div>
              <HandlePeople :time="item.updatedTime" :name="item.updatedBy"></HandlePeople>
            </div>
          </div>
          <slot name="preview" :data="bomDetail"></slot>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
import BusinessFileList from '@/components/businessFileList/index.vue'
import HandlePeople from '@components/handlePeople.vue'
import BomFile from '../module/bomFile.vue'
import {getHttpBomUpdateRecord} from "@/api/business";
import {setTitle} from "@/utils/ddApi";
let route=useRoute()

const offerId = inject('offerId')
const props = defineProps({
  title: {
    type: String,
    default: '其它附件'
  },
  isPreview: {
    type: Boolean,
    default: false
  }
})
const data = reactive({
  activeNames: [],
  bomDetail: {
    customerBom: "",
    customerBomUrl: "",
    prototypePic: [],
    otherFile: [],
    createdTime: "",
    companyBomInfo: []
  }
})
let {activeNames, bomDetail} = toRefs(data)

let bomFileList = computed(() => {
  let name = bomDetail.value?.companyBomInfo?.[0]?.companyBom
  let url = bomDetail.value?.companyBomInfo?.[0]?.companyBomUrl
  if (!name || !url) {
    return []
  } else {
    return [{name, url}]
  }
})

onMounted(() => {
  getBomUpdateRecord()
})

const getBomUpdateRecord = () => {
  getHttpBomUpdateRecord(offerId).then((res) => {
    // 非预览页面只显示最新的一条数据
    if (!props.isPreview && res.data.companyBomInfo.length) {
      res.data.companyBomInfo.length = 1
    }
    bomDetail.value = res.data
    //上传bom的 就是报价单创建人
    setTitle(`${res.data.createdBy}发起的报价申请${route.meta?.assemTitle || ''}`)
  })
}

defineExpose({
  bomDetail, getBomUpdateRecord
})
</script>

<style lang="scss" scoped>
.bom {
  padding: 10px 20px 0 20px;
  background: #FFFFFF;
  color: #4a4a4a;
  font-size: 14px;

  .label {
    width: 24vw;
    font-size: 14px;
    color: $e-gray;
    height: 36px;
    line-height: 36px;
  }

  .file {
    width: 250px;
    margin-left: 16vw;
  }
}

.collapse-main {
  background-color: #F4F5FC;
}

:deep(.el-collapse) {
  margin-top: -12px;
}

:deep(.el-collapse-item__content) {
  padding-bottom: 0;
}

:deep(.el-collapse-item__header), :deep(.el-collapse-item__wrap), :deep(.el-collapse) {
  border-bottom: 0;
  border-top: 0;
}

:deep(.el-collapse-item__header) {
  padding: 0 6px;
}

</style>
