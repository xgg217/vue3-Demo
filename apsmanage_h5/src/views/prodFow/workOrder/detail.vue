<template>
  <div class="prod_main detail" :class="{'flex-cul': detailData.base.data?.bqtNum == 0}">
    <infoList :infoList="detailData.base" class="info-list" :class="{'flex1': detailData.base.data?.bqtNum == 0}"></infoList>
    <layoutModule title="欠料明细" v-if="detailData.base.data?.bqtNum!=0" >
      <template #main>
        <div class="table">
          <el-table  :data="detailData.table" style="width: 100%" :header-cell-style="headerState" :cell-style="(row)=>rowState(row,[],{fontSize:'14px'})" empty-text="暂无数据">
            <el-table-column class-name="codeColWrap" prop="materialNo"  label="物料编码"/>
            <el-table-column  prop="materialName"  label="物料名称" show-overflow-tooltip  width="90px"/>
            <el-table-column  prop="qty"  label="欠量" show-overflow-tooltip  width="60px"/>
<!--            <el-table-column  prop="arrivalDate"  label="预计到货" show-overflow-tooltip  width="100px"/>-->
          </el-table>
        </div>
      </template>
    </layoutModule>
    <div class="detail_material ui-cell-cn ui-cell fz-16" v-else>
      <van-icon name="passed" size="20"/>
      <div>订单齐料</div>
    </div>

  </div>
</template>

<script setup>
import InfoList from "@/components/info/infoList.vue";
import {getWorkOrderDetail} from '@/api/prodFow'
import {setTitle} from '@/utils/ddApi'
import {getImage} from '@/utils/utils'
import {headerState, rowState} from "@/utils/table";
import {useRouteQuery} from "@vueuse/router/index";
import useList from "@/views/prodFow/hook/useList";
import {closeLoading} from "@/utils/toastTips"
let {ddSetShareIcon} = useList()
const orderNo = useRouteQuery('orderNo')

let detailData = reactive({
  base: {
    data: {},
    value: [
      {
        name: '客户单号',
        value: 'customerNo',
      },
      {
        name: '料号',
        value: 'materialNo',
      },
      {
        name: '产品名称',
        value: 'materialName',
      },
      {
        name: '订单数量',
        value: 'orderNum',
      },
      {
        name: '齐料套数',
        value: 'qtNum',
      },
      {
        name: '欠料套数',
        value: 'bqtNum',
      },
    ]
  },
  table: [],
})


onMounted(() => {
  getWorkOrderDetail(orderNo.value).then((res) => {
    let {materialInfo = {}, materialDetail = [],excelFile=''} = res.data
    detailData.base.data = materialInfo
    detailData.table = materialDetail
    //欠料套数为0不显示
    detailData.base.value[5].hidden = materialInfo.bqtNum == 0
    setTitle(`${materialInfo.projectName}物料概况`)
    // 分享
    ddSetShareIcon(excelFile)
  }).finally(closeLoading)
})

onUnmounted(() => {
  ddSetShareIcon()
})


</script>

<style lang="scss" scoped>
.detail {
  &_material {
    width: 100%;
    height: 44px;
    background: #B8D4FD;
    color: #ffffff;
    justify-content: center;

    div {
      padding-left: 5px;
    }
  }
  .table{
    width: 100%;
    border: 1px solid #EBF1F7;
  }
}
// :deep(.codeColWrap){
//   padding-right: 40px;
// }
.info-list{
  :deep(.layout_main){
    margin-top: 0;
  }
}

</style>

