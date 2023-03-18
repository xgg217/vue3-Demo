<template>
  <div class="tool">
    <EndTime time="2019-01-01"></EndTime>
    <!--信息详情-->
    <InfoList :info-list="detailData" class="info"></InfoList>
    <!--异常处理列表-->
    <layoutModule :show-title="false">
      <template #main>
        <div class="info">
          <header>异常处理</header>
          <div class="task" v-for="(item,index) in [{},{},{}]" :key="index">
            <div class="ui-cell title">
              <img src="@/assets/images/task.png" alt="">
              <span>SMT钢网</span>
            </div>
            <div class=" label">
              <div class="e-gray-color">工治具编号</div>
              <div>SC0020171077</div>
            </div>
            <div class=" label">
              <div class="e-gray-color">异常描述</div>
              <div>SMT钢网外框有变形问题，请确认是否可以正常使用！</div>
            </div>
            <div class=" label">
              <div class="e-gray-color">处理方式</div>
              <div>更换</div>
            </div>
            <div class="status">
              处理/已处理#D6DDE4
            </div>
          </div>
          <!--   详情状态下的处理结论-->
          <div class="task">
            <div class="ui-cell title">
              <img src="@/assets/images/task.png" alt="">
              <span>处理结论</span>
            </div>
            <div class=" label">
              <div class="e-gray-color">处理结论</div>
              <div>SC0020171077</div>
            </div>
            <div class=" label">
              <div class="e-gray-color">异常描述</div>
              <div>SMT钢网外框有变形问题，请确认是否可以正常使用！</div>
            </div>
            <div class="label">
              <div class="e-gray-color">处理人</div>
              <div>更换</div>
            </div>
            <div class="label">
              <div class="e-gray-color">处理时间</div>
              <div>更换</div>
            </div>
          </div>
        </div>
      </template>
    </layoutModule>
    <!--编辑状态下的 处理结论-->
    <layoutModule :show-title="false">
      <template #main>
        <div class="info">
          <header>处理结论</header>
          <el-form :model="form" ref="customerRef2" :rules="formRules" label-position="left" label-width="24vw" class="custom-input">
            <el-form-item label="订单量" prop="orderNumber">
              <el-select v-model="form.orderNumber" value-key="paramValue" placeholder="请选择">
                <el-option :label="item.paramName" :value="item.paramValue" v-for="item in unit" :key="item.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="备注说明" prop="remarks" hide-required-asterisk>
              <el-input v-model.trim="form.remarks" type="textarea" rows="4" placeholder="添加处理意见和建议" maxlength="100"/>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </layoutModule>
    <!--处理按钮-->
    <div class="deal">
<!--      <pxt-button type="active" width="100%">提交</pxt-button>-->
      <pxt-button type="default" width="100%">已处理</pxt-button>
    </div>
<!--    -->
    <PromptStock v-model:show-prompt="showError" title="还有异常的工治具未处理!" ></PromptStock>
    <PromptStock v-model:show-prompt="showConfirm" title="确定提交处理意见吗？" ></PromptStock>
  </div>
</template>

<script setup>
import EndTime from '../components/endTime.vue'
import InfoList from '@/components/info/infoList.vue'
import {initValidate, requiredValidate} from "@/utils/validate";
import PxtButton from "@/components/button/button.vue";
import bus from "@/utils/bus";
import {useNavBarStore} from "@/store";
import PromptStock from "@/components/dialog/promptStock.vue";
let navBarStore=useNavBarStore()
onMounted(() => {
  navBarStore.updateNavBar({rightText:'异常列表'})
  bus.on("onNavBarClickRight", () => {
    console.log("异常处理列表")
  })
})
onUnmounted(()=>{
  bus.off('onNavBarClickRight')
  navBarStore.updateNavBar({rightText:''})
})
const route = useRoute()
const router = useRouter()
let showError=ref(false)
let showConfirm=ref(false)

let detailData = reactive({
  data: {},
  value: [
    {
      name: '异常单编号',
      value: 'customerNo',
    },
    {
      name: '项目名称',
      value: 'materialNo',
    },
    {
      name: '工单编号',
      value: 'materialName',
    },
    {
      name: '料号',
      value: 'orderNum',
    },
    {
      name: '生产产线',
      value: 'producedQty',
    },
    {
      name: '计划生产时间',
      value: 'unproducedQty',
    },
    {
      name: '异常发起人',
      value: 'unproducedQty',
    },
  ]
})
let form=reactive({
  orderNumber:'',
  remarks:''
})
let formRules=reactive({
  remarks: [requiredValidate('请选择客户')],
  customerName: [requiredValidate('请填写客户名称')],
})
</script>

<style lang="scss" scoped>
.tool {
  .info {
    margin-top: 0;
  }

  header {
    height: 36px;
    line-height: 36px;
    font-size: 16px;
    font-weight: 550;
    margin-bottom: 15px;
  }

  .task {
    position: relative;
    width: 335px;
    background: #FFFFFF;
    box-shadow: 0px 0px 25px 1px #DEEEFF;
    border-radius: 2px;
    margin-bottom: 15px;
    padding-bottom: 30px;

    img {
      height: 32px;
      margin: 0 10px 0 20px;
    }

    .title {
      font-size: 16px;
      font-weight: bold;
      color: $b-gray;
      height: 48px;
      border-bottom: 1px solid #EEEFEF;;
    }
    .label{
      font-size: 14px;
      font-weight: 400;
      padding: 0 20px;
      color: $b-gray;
      display: flex;
      margin-top: 12px;

      div:first-of-type{
        width: 100px;
        flex-shrink: 0;
      }
    }
    .status{
      position: absolute;
      width: 88px;
      height: 32px;
      font-size: 14px;
      font-weight: 400;
      color: #FFFFFF;
      background: #1673F9;
      right: 0;
      bottom: 0;
      text-align: center;
      line-height: 32px;
      border-radius: 2px;
    }
  }
  .el-select{
    width: 100%;
  }
  .deal{
    width:100% ;
    box-sizing: border-box;
    padding: 10px 20px;
    background: #FFFFFF;
    margin-top: 12px;
  }
}
:deep(.prompt){
  .wrapper_main--title{
    margin-top: 40px;
  }
}
</style>



