<template>
  <div class="logistics">
    <div class="busElInput">
      <template v-for="(item,index) in detail" :key="index">
        <el-form-item v-if="item.transportType==1" label="国内运输" >{{dictStore.getDictValue('z_logistics_company',item.logisticsCompanyId)}}</el-form-item>
        <el-form-item v-if="item.transportType==2" label="中港运输" >{{dictStore.getDictValue('g_logistics_company',item.logisticsCompanyId)}}</el-form-item>
        <div class="height36 ui-cell ui-cell-sb w-7/8 mx-auto">
          <div class="more">{{item.startAddress || '-'}}</div>
          <div class="more">{{item.targetAddress || '-'}}</div>
          <div class="more">{{item.vehicleType || '-'}}</div>
        </div>
        <el-form-item  label="货物信息" prop="remarks">{{item.prototypeNumber}} {{item.weight}} {{item.volume}}</el-form-item>
        <el-form-item  label="业务类型" prop="remarks">-</el-form-item>
        <el-form-item  label="是否提货" prop="remarks">-</el-form-item>
        <el-form-item  label="是否拼车" prop="remarks">-</el-form-item>
        <el-form-item  label="装车时间" prop="remarks">{{item.entruckTime|| '-'}}</el-form-item>
        <el-form-item  label="交仓时间" prop="remarks" v-if="item.transportType==2">{{item.warehouseTim || '-'}}</el-form-item>
        <el-form-item  label="收货时间" prop="remarks">{{item.receiveTime || '-'}}</el-form-item>
        <el-form-item  label="疫情附加费" prop="remarks">-</el-form-item>
        <el-form-item  label="物流备注" prop="remarks">{{item.remarks || '-'}}</el-form-item>
        <el-form-item  label=" " prop="remarks">{{dictStore.getDictValue('currency',item.currency)}} {{formatMoneyParser(item.logisticsOffer)}}</el-form-item>
      </template>
        <!--国内中港分开-->
      <div class="line" v-if="detail.length==2"></div>
    </div>
  </div>
</template>

<script setup>
import {useDictStore} from "@/store";
import {formatMoneyParser} from "@/utils/utils";
let dictStore=useDictStore()
let {g_logistics_company,z_logistics_company}=storeToRefs(dictStore)
const props = defineProps({
  detail: {
    type: Array,
    default: () => []
  },
})
</script>

<style scoped lang="scss">
.logistics {
  .line{
    height: 1px;
    background:#EEEFEF ;
    margin: 10px 0;
  }
  :deep(.el-form-item__label){
    justify-content: flex-start;
    width: 30vw;
  }
  :deep(.el-form-item){
    margin-bottom: 0;
  }

}

</style>
