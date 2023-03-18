<template>
  <div class="single">
    <!--信息详情-->
    <InfoList :info-list="detailData" class="info" title="异常工治具"></InfoList>
    <!--详情状态下的处理方式-->
    <InfoList :info-list="detailData2" class="info" title="处理方式"></InfoList>
    <!--编辑状态下的 处理方式-->
    <layoutModule :show-title="false">
      <template #main>
        <div class="info">
          <header>处理方式</header>
          <el-form :model="form" ref="customerRef2" :rules="formRules" label-position="left" label-width="24vw" class="custom-input">
            <el-form-item label="处理方式" prop="orderNumber">
              <el-select v-model="form.orderNumber" value-key="paramValue" placeholder="请选择">
                <el-option :label="item.paramName" :value="item.paramValue" v-for="item in unit" :key="item.value"/>
              </el-select>
<!--              处理方式选择替换时，显示当前提示文本。-->
              <span color="#FF3000" style="width: 100%;text-align: right">库存不足，将自动生产采购需求</span>
            </el-form-item>
            <el-form-item label="处理备注" prop="remarks" >
              <el-input v-model.trim="form.remarks" type="textarea" rows="4" placeholder="添加处理意见和建议" maxlength="100"/>
            </el-form-item>
            <el-form-item label="上传附件" prop="remarks" >
              <van-uploader v-model="filesList" multiple />
<!--              <VantUpload keys="bomFileList" :filesList="filesList" :limitNum="1" :limitFormat="[imagesAccept]" @getFileInfo="getCheckFileInfo"-->
<!--                          class="pt-20">-->
<!--                <div></div>-->
<!--&lt;!&ndash;                <div class="upload"></div>&ndash;&gt;-->
<!--              </VantUpload>-->

            </el-form-item>
          </el-form>
        </div>
      </template>
    </layoutModule>
    <div class="deal">
      <pxt-button type="active" width="49%">取消</pxt-button>
      <pxt-button type="default" width="49%">确定</pxt-button>
    </div>
  </div>
</template>

<script setup>
import InfoList from '@/components/info/infoList.vue'
import {requiredValidate} from "@/utils/validate";
import VantUpload from '@/components/vantUpload.vue'
import {imagesAccept} from "@/constant/fileType";
import PxtButton from "@/components/button/button.vue";
let detailData = reactive({
  data: {},
  value: [
    {
      name: '工治具名称',
      value: 'customerNo',
    },
    {
      name: '库存',
      value: 'materialNo',
    },
    {
      name: '工治具编号',
      value: 'materialName',
    },
    {
      name: '异常描述',
      value: 'orderNum',
    },
    {
      name: '',
      value: 'orderNum',
      type:'img'
    },
  ]
})
let detailData2 = reactive({
  data: {},
  value: [
    {
      name: '处理方式',
      value: 'customerNo',
    },
    {
      name: '处理备注',
      value: 'materialNo',
    },
    {
      name: '参考',
      value: 'orderNum',
      type:'img'
    },
    {
      name: '异常处理人',
      value: 'materialName',
    },
    {
      name: '处理时间',
      value: 'orderNum',
    },
  ]
})
let form=reactive({
  orderNumber:'',
  remarks:''
})
let formRules=reactive({
  // remarks: [requiredValidate('请选择客户')],
  // customerName: [requiredValidate('请填写客户名称')],
})
let filesList=ref([])
const getCheckFileInfo = (info) => {
  filesList.value.push(info)
}

const removeCheckFile = (info) => {
  filesList.value.splice(info.index, 1)
}
</script>

<style lang="scss" scoped>
.single{
  padding-bottom: 80px;
}
.el-select{
  width: 100%;
}
header{
  margin-bottom: 10px;
}
.upload{
  height: 80px;
  width: 80px;
  background: #F6F6FB;
}
.vantUpload{
  padding-top: 0;
}
.deal{
  width:100% ;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px 20px;
  background: #FFFFFF;
  margin-top: 12px;
  position: absolute;
  bottom: 0;
}
</style>



