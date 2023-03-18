<template>
  <div class="allot">
    <AllotDetail class="allot-detail" :data="data.kpiInfo"></AllotDetail>
    <div class="distribute custom-input">
      <el-radio-group v-model="data.assignType" class="height36">
        <el-radio :key="item.value" :label="item.value" v-for="item in distributeDict">{{ item.name }}</el-radio>
      </el-radio-group>
      <div v-if="data.assignType==2">
        <template v-for="item in data.kpiData" :key="item.id">
          <div class="distribute-list" v-if="item.type==2">
            <div class="distribute-list_item ui-cell ui-cell-sb">
              <div class="ui-cell">
                <img src="@/assets/images/avatar2.svg" alt="">
                <div class="pl-21 pr-10 name ui-nowrap">{{ item.name }}</div>
              </div>
              <div class="ui-cell">
                <el-input v-model.number="item.value" type="number" inputmode="decimal"/>
                <!--              <div class="pl-4">%</div>-->
              </div>
            </div>
          </div>
          <div class="distribute-list" v-else>
            <div class="distribute-list_item ui-cell ui-cell-sb">
              <div class="ui-cell">
                <img src="@/assets/images/department.png" alt="">
                <div class="pl-21 pr-10 name ui-nowrap">{{ item.name }}</div>
              </div>
              <div class="ui-cell">
                <el-input v-model.number="item.value" type="number" inputmode="decimal"/>
                <!--              <div class="pl-4">PCB%</div>-->
              </div>
            </div>
            <div class="distribute-list_item2">
              <el-radio-group v-model="item.assignType" class="height36">
                <el-radio :key="item.value" :label="item.value" v-for="item in distributeDict2">{{ item.name }}</el-radio>
              </el-radio-group>
              <div class="mt-10" v-if="item.assignType==2">
                <SelectPerson v-model:selectPerson="item.assignUsers" class="person"></SelectPerson>
                <!--              <el-input  v-model.number="data.packWorkHours" placeholder="默认组织负责人" maxlength="10"/>-->
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="ui-cell save-btn mt-12">
      <NextButton text="取消" min-text="" class="pt-10 save-preview" @click="$router.back()"></NextButton>
      <NextButton text="确认" min-text="" class="pt-10 save-confirm" @click="handelKpiAssign"></NextButton>
    </div>
  </div>
</template>

<script setup>
import {useDictStore} from "@/store";
import AllotDetail from './module/allotDetail.vue'
import NextButton from '@components/button/nextButton.vue'
import {kpiAssign, kpiAssignDetail} from "@/api/workbench";
import SelectPerson from "@components/selectPerson.vue";
import {Notify, Toast} from "vant";
import router from "@/router";

const {distributeDict, distributeDict2} = useDictStore()
let {params} = useRoute()
let data = reactive({
  assignType: 1,
  kpiData: [],
  kpiInfo: {}
})
onMounted(() => {
  kpiAssignDetail({id: params.id}).then((res) => {
    Object.assign(data, res.data)
  })
})
const handelKpiAssign = () => {
  console.log(check())
  if (!check()) {
    return Notify('请填写完成');
  }
  let param = {
    kpiId: params.id,
    assignType: data.assignType,
    kpiData: []
  }
  if (data.assignType === 2) {
    param.kpiData = data.kpiData
  }
  kpiAssign(param).then((res)=>{
    Toast("提交成功");
    setTimeout(()=>{
      router.back()
    }, 1000)
  })
}
//校验
const check = () => {
  let ret=true
  if (data.assignType === 2) {
    data.kpiData.forEach(({value, type, assignType, assignUsers}) => {
      if (!value) ret=false
      //组织类型需要判断分配方式
      if (type == 1) {
        if (!assignType) ret=false
        //分配方式为指定人员时，需要判断长度不为空
        if (assignType == 2 && (!assignUsers || !assignUsers.length)) {
          ret=false
        }
      }
    })
  }
  return ret
}
</script>

<style lang="scss" scoped>
.allot {
  height: 100%;
  box-sizing: border-box;
  padding-top: 10px;

  .distribute {
    background: #FFFFFF;
    margin-top: 10px;
    padding: 10px 20px;

    &-list {
      &_item {
        width: 335px;
        height: 72px;
        border-radius: 14px;
        border: 1px solid #F1F3F6;
        padding: 0 12px;
        box-sizing: border-box;
        margin: 8px 0;

        .name {
          width: 90px;
        }

        img {
          height: 48px;
        }

        div {
          flex-shrink: 0;
        }

        :deep(.el-input__wrapper) {
          width: 100px;
          background: #F4F6F9;
          border: 1px solid #F5F5F5;
        }

        //:deep(.el-input){
        //  width: 130px;
        //}
      }

      &_item2 {
        padding-left: 80px;
        display: flex;
        flex-direction: column;

        :deep(.el-radio-group) {
          height: 70px;
        }
      }
    }
  }

  .save-btn {
    position: sticky;
    bottom: 0;

    :deep(.save:first-of-type) > div {
      margin-right: 5px;
      background: #E8F3FF;
      color: #1572F9;
    }

    :deep(.save:last-of-type) > div {
      margin-left: 5px;
    }
  }

  .allot-detail {
    padding: 0 20px;
    background: #FFFFFF;

    :deep(.el-form-item__label) {
      font-size: 14px;
      font-weight: 500;
      color: #8D9092;
      height: 50px;
      line-height: 50px;
    }

    :deep(.el-form-item__content) {
      font-size: 14px;
      font-weight: 500;
      color: #1B2124;
    }

    :deep(.el-form-item) {
      margin-bottom: 0;
      min-height: 50px;
      border-bottom: 0;
    }

    :deep(.el-form) {
      margin-bottom: 10px !important;
    }
  }
}
</style>
