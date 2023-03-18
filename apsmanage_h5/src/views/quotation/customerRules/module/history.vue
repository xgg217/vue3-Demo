<template>
  <!--历史修改记录-->
  <div class="history">
    <el-collapse v-model="data.activeNames" @change="openHistory">
      <el-collapse-item name="1">
        <template v-slot:title>
          <div class="ui-cell ui-cell-sb wh100">
            <HandlePeople :name="materialOfferRulesInfo.createdBy" :time="materialOfferRulesInfo.createdTime" v-if="materialOfferRulesInfo.createdTime"></HandlePeople>
            <div v-else></div>
            <div class="pr-10 fz-14 shrink-0" color="#0076F6">修改记录</div>
          </div>
        </template>
        <div v-for="(item,index) in data.historyList" :key="index" class="history-list">
          <layout-module title="基础报价规则">
            <template v-slot:main>
              <div class="table-border" v-if="item.baseOfferInfo.length">
                <el-table  :data="item.baseOfferInfo" style="width: 100%" :header-cell-style="()=>headerState({background:'#F5F5F5'})"
                          :cell-style="(row)=>rowState(row,[],{fontSize:'14px'})" empty-text="">
                  <el-table-column prop="workStage" label="工序"></el-table-column>
                  <el-table-column prop="unitId" label="单位">
                    <template #default="scope">
                      <div :style="compare(index,scope,'baseOfferInfo','unitId')">{{ getDictValue('unit', scope.row.unitId) }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="数量" show-overflow-tooltip>
                    <template #default="scope">
                      <div :style="{...compare(index,scope,'baseOfferInfo','maxQuantity'),...compare(index,scope,'baseOfferInfo','minQuantity')}">
                        {{ scope.row.minQuantity }}-{{ scope.row.maxQuantity }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="price" label="价格">
                    <template #default="scope">
                      <div :style="compare(index,scope,'baseOfferInfo','price')" v-format-money="scope.row.price"></div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </template>
          </layout-module>
          <layout-module title="MOQ规则">
            <template v-slot:main>
              <div class="table-border" v-if="item.moqOfferInfo.length">
                <el-table  :data="item.moqOfferInfo" style="width: 100%" :header-cell-style="()=>headerState({background:'#F5F5F5'})"
                          :cell-style="(row)=>rowState(row,[],{fontSize:'14px'})" empty-text="">
                  <el-table-column label="数量" show-overflow-tooltip>
                    <template #default="scope">
                      <div :style="{...moqCompare(index,scope,'moqOfferInfo','minQuantity'),...moqCompare(index,scope,'moqOfferInfo','maxQuantity')}">
                        {{ scope.row.minQuantity }}-{{
                          scope.row.maxQuantity
                        }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="multiple" label="倍数">
                    <template #default="scope">
                      <div :style="moqCompare(index,scope,'moqOfferInfo','multiple')">{{ scope.row.multiple }}</div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </template>
          </layout-module>
          <layout-module title="物流报价规则">
            <template v-slot:main>
              <div class="table-border" v-if="item.logisticsRulesInfo.length">
                <el-table  :data="item.logisticsRulesInfo" style="width: 100%" :header-cell-style="()=>headerState({background:'#F5F5F5'})"
                          :cell-style="(row)=>rowState(row,[],{fontSize:'14px'})" empty-text="">
                  <el-table-column prop="projectId" label="物流项目" show-overflow-tooltip>
                    <template #default="scope">
                      <div>{{ getDictValue('logistics_project', scope.row.projectId) }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="quantity" label="价格">
                    <template #default="scope">
                      <div :style="compare(index,scope,'logisticsRulesInfo','quantity')" v-format-money="scope.row.quantity"></div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="currency" label="币别" >
                    <template #default>
                      <div>{{getDictValue('currency', offerCurrency) }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="unitId" label="单位" show-overflow-tooltip>
                    <template #default="scope">
                      <div :style="compare(index,scope,'logisticsRulesInfo','unitId')">{{ getDictValue('unit2', scope.row.unitId) }}</div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </template>
          </layout-module>
          <layout-module title="关务报价规则">
            <template v-slot:main>
              <div class="table-border" v-if="item.customsRulesInfo.length">
                <el-table  :data="item.customsRulesInfo" style="width: 100%" :header-cell-style="()=>headerState({background:'#F5F5F5'})"
                          :cell-style="rowState" empty-text="">
                  <el-table-column prop="projectId" label="报关项目">
                    <template #default="scope">
                      <div>{{ getDictValue('customs_project', scope.row.projectId) }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="quantity" label="价格">
                    <template #default="scope">
                      <div :style="compare(index,scope,'customsRulesInfo','quantity')" v-format-money="scope.row.quantity"></div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="currency" label="币别" >
                    <template #default>
                      <div>{{getDictValue('currency', offerCurrency) }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="unitId" label="单位">
                    <template #default="scope">
                      <div :style="compare(index,scope,'customsRulesInfo','unitId')">{{ getDictValue('unit2', scope.row.unitId) }}</div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </template>
          </layout-module>
          <layout-module title="返工单价规则">
            <template v-slot:main>
              <div class="table-border" v-if="item.reworkPriceRulesInfo.length">
                <el-table  :data="item.reworkPriceRulesInfo" style="width: 100%" :header-cell-style="()=>headerState({background:'#F5F5F5'})"
                          :cell-style="(row)=>rowState(row,[],{fontSize:'14px'})" empty-text="">
                  <el-table-column prop="unitId" label="单位">
                    <template #default="scope">
                      <div :style="moqCompare(index,scope,'reworkPriceRulesInfo','unitId')">{{ getDictValue('unit', scope.row.unitId) }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="数量" show-overflow-tooltip>
                    <template #default="scope">
                      <div :style="{...moqCompare(index,scope,'reworkPriceRulesInfo','minQuantity'),...moqCompare(index,scope,'reworkPriceRulesInfo','maxQuantity')}">
                        {{ scope.row.minQuantity }}-{{
                          scope.row.maxQuantity
                        }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="unitPrice" label="单价">
                    <template #default="scope">
                      <div :style="moqCompare(index,scope,'reworkPriceRulesInfo','unitPrice')" v-format-money="scope.row.unitPrice"></div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="currency" label="币别">
                    <template #default>
                      <div>{{getDictValue('currency', offerCurrency) }}</div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </template>
          </layout-module>
          <HandlePeople :name="item.createdBy" :time="item.createdTime"></HandlePeople>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
import {headerState} from "@/utils/table";
import LayoutModule from "@/components/layout/layoutModule.vue";
import {useDictStore} from "@/store";
import HandlePeople from './handlePeople.vue'
import {getHttpCustomerOfferRulesHistory} from "@/api/business";
const {getDictValue} = useDictStore()
const props = defineProps({
  text: {
    type: String,
    default: '新增'
  },
  offerCurrency:{
    type: Number,
    default: 0
  },
  materialOfferRulesInfo: {
    type: Object,
    default: () => {
    }
  }
})

const emit = defineEmits(["handleIcon"])

const data = reactive({
  activeNames: [],
  historyList: []
})

const handleIcon = () => {
  emit('handleIcon')
}
const rowState = ({row}) => {
  let ret = {
    color: '#4A4A4A',
    fontSize: '14px',
    height: '36px',
    fontWeight: 400,
  }
  if (row.isAdd) {
    ret.color = '#FF3A35'
  } else if (row.isDel) {
    ret.color = '#A2A2A2'
    ret.textDecoration = 'line-through';
  }
  return ret
}
const openHistory = async (value) => {
  let materialId = props.materialOfferRulesInfo?.materialId
  if (value.length && !data.historyList.length && materialId) {
    getHttpCustomerOfferRulesHistory(materialId).then((res) => {
      let historyList = res.data
      contrast(historyList) //基础
      contrast(historyList, 'logisticsRulesInfo', 'projectId') //物流
      contrast(historyList, 'customsRulesInfo', 'projectId') //关务
      moqContrast(historyList)
      moqContrast(historyList,'reworkPriceRulesInfo')
      data.historyList = historyList
    })
  }
}
// 基础\物流/关务规则新增/删除对比
const contrast = (historyList, key = 'baseOfferInfo', field = 'workStage') => {
  for (let i = 0; i < historyList.length - 1; i++) {
    let currentData = historyList[i][key]
    let compareData = historyList[i + 1][key]
    for (let j = 0; j < currentData.length; j++) {
      //拿本次工序id 去上一次的数据里面找，没找到表示是新增的
      if (!compareData.some((item2) => currentData[j][field] === item2[field])) {
        currentData[j].isAdd = true
      }
    }
    for (let j = 0; j < compareData.length; j++) {
      //判断删除的，上一次有的，本次没有，就是删除的
      if (!currentData.some((item2) => compareData[j][field] === item2[field])) {
        currentData.push({...compareData[j], isDel: true})
      }
    }
  }
}
// moq  返工单价规则  规则新增/删除对比
const moqContrast = (historyList, key = 'moqOfferInfo') => {
  for (let i = 0; i < historyList.length - 1; i++) {
    let currentData = historyList[i][key]
    let compareData = historyList[i + 1][key]
    if (currentData.length === compareData.length) {
      continue
    }
    //把多出来的 打上新增标记
    if (currentData.length > compareData.length) {
      for (let j = compareData.length; j < currentData.length; j++) {
        currentData[j].isAdd = true
      }
    }
    //把少的 打上删除标记
    if (currentData.length < compareData.length) {
      for (let j = currentData.length; j < compareData.length; j++) {
        currentData.push({...compareData[j], isDel: true})
      }
    }
  }
}

/**
 * 规则修改对比
 * @param index1 第一层索引
 * @param scope 第二层的scope
 * @param key1 要对比的第一层key
 * @param key2 要对比的第二层key
 * @returns {{color: (string)}|{}}
 */
const compare = (index1, scope, key1, key2) => {
  //最开始那份数据（数组尾部）,新增，和删除，不需要对比
  if (index1 === data.historyList.length - 1 || scope.row?.isDel || scope.row?.isAdd) {
    return {}
  }
  let compareData = (data.historyList[index1 + 1]?.[key1] || []).filter((item) => {
    return item[key2] === scope.row[key2] && !item?.isDel
  })
  return {
    color: !compareData.length ? '#FF3A35' : ''
  }
}
/**
 * moq 返工单价规则规则修改对比
 * @returns {{color: (string)}|{}}
 * @param index
 * @param scope
 * @param key
 */
const moqCompare = (index, scope,key, key2) => {
  //最开始那份数据（数组尾部）不需要对比
  if (index === data.historyList.length - 1 || scope.row?.isDel || scope.row?.isAdd) {
    return {}
  }
  //对比当前行和下一份的当前行字段数据是否一致
  let currentData = data.historyList[index]?.[key]?.[scope.$index][key2]
  let compareData = data.historyList[index + 1]?.[key]?.[scope.$index][key2]
  return {
    color: compareData !== currentData ? '#FF3A35' : ''
  }
}
</script>

<style scoped lang="scss">
.history {
  margin-top: 12px;

  :deep(.el-collapse-item__content,.el-collapse-item__wrap) {
    padding-bottom: 0;
    border-bottom: 0;
  }

  .layout {
    //padding-top: 0;
    margin-top: 0;
  }

  .layout:first-of-type {
    padding-top: 0;
  }

  &-list {
    padding-bottom: 10px;
    border-bottom: 12px solid #F7F6FB;
  }
}


</style>
