<template>
  <div class="prod_main main">
    <infoList :infoList="detailData.base" class="info-list"></infoList>
    <layoutModule :title="table.base.lineName"  v-for="table in detailData.table" :key="table.base.currency">
      <template #main>
        <div class="flex fz-14 ui-cell order ">
          <div class="e-gray-color">工单号</div>
          <div class="ui-nowrap pr-10" >{{ table.base?.workOrder ?? '-' }}</div>
        </div>
        <infoListTwo :infoList="{data:table.base,value:table.config}" class="table_info"></infoListTwo>
<!--        <el-table empty-text="暂无数据" :data="table.data" style="width: 100%" :header-cell-style="headerState" :cell-style="row=>rowState(row,[0],{fontSize:'14px'})">-->
<!--          <el-table-column prop="title" width="100px" fixed="left">-->
<!--            <template #header>-->
<!--              <div></div>-->
<!--            </template>-->
<!--            <template #default="scope">-->
<!--              <div>{{ scope.$index === 0 ? '计划产出' : '正常工时' }}</div>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column v-for="(item) in table.key" :label="item" :key="item" :prop="item" show-overflow-tooltip/>-->
<!--        </el-table>-->

        <div class="table">
          <div class="table_left">
            <div class="table_line1">列表项</div>
            <div class="table_line2 table_line"><span>计划产出</span></div>
            <div class="table_line3 table_line"><span>正常工时</span></div>
          </div>
          <div class="table_right" >
            <div class="table_right--box" v-for="item in table.data" :key="item">
              <div class="table_line1 ui-nowrap"><span>{{item.time}}</span></div>
              <div class="table_line2"><span>{{item.planOutput}}</span></div>
              <div class="table_line3"><span>{{item.workTimes}}</span></div>
            </div>
          </div>
        </div>
<!--        <div class="expect_time">欠料预计 7-20  18:30 前齐套</div>-->
      </template>
    </layoutModule>
  </div>
</template>

<script setup>
import InfoList from "@/components/info/infoList.vue";
import InfoListTwo from "@/components/info/infoListTwo.vue";
import {getImage} from '@/utils/utils'
import {headerState, rowState} from "@/utils/table";
import {getScheduleDetail} from '@/api/prodFow'
import {useRouteQuery} from '@vueuse/router'
import {setTitle} from "@/utils/ddApi";
import useList from "@/views/prodFow/hook/useList";
import {closeLoading} from "@/utils/toastTips"
const orderNo = useRouteQuery('orderNo')
let {ddSetShareIcon}=useList()
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
        name: '已产出数',
        value: 'producedQty',
      },
      {
        name: '未产出数',
        value: 'unproducedQty',
      },
    ]
  },
  table: [],
})


onMounted(() => {
  getScheduleDetail(orderNo.value).then((res) => {
    let {scheduleDetail = [], scheduleInfo = {},excelFile=''} = res.data
    detailData.base.data = scheduleInfo
    // 处理下面列表的数据
    let tableData = []
    scheduleDetail.forEach((item) => {
      let data = {
        config: [
          {
            name: '未生产数',
            value: 'unproducedQty'
          },
          {
            name: '人力',
            value: 'personNum'
          },
          {
            name: 'UPH/1H',
            value: 'uph'
          },
          {
            name: '面别',
            value: 'currency',
            //1和5才有这个字段
            hidden:item.lineName.indexOf('SMT')==-1 || item.lineName.indexOf('smt')==-1
          }
        ],
        base: item,
        data:[]
      }
      data.data=item.data
      tableData.push(data)
    })
    detailData.table = tableData
    setTitle(`${scheduleInfo.projectName}生产排程概况`)
    // 分享
    ddSetShareIcon(excelFile)
  }).finally(closeLoading)
})

onUnmounted(()=>{
  ddSetShareIcon()
})
</script>

<style lang="scss" scoped>
.main {
  .table_info {
    padding: 0;
    margin-top: 0;
  }
  .expect_time{
    color: $e-gray;
    font-size: 14px;
  }
  .table{
    display: flex;
    line-height: 36px;
    font-size: 14px;
    color:$b-gray;
    text-align: center;
    margin-top: 20px;
    z-index: 0;
    border: 1px solid #EBF1F7;
    &_left{
      width: 80px;
      flex-shrink: 0;
      >div{
        text-align: center;
        height: 36px;
        position: relative;
        padding-right: 10px;
      }
      .table_line:after{
        content: "";
        position: absolute;
        width: 10px;
        height: 36px;
        bottom: -1px;
        right: 0;
        overflow-x: hidden;
        overflow-y: hidden;
        touch-action: none;
        pointer-events: none;
        box-shadow: inset 10px 0 5px -10px rgba(0, 0, 0, .20);
      }
    }
    &_right{
      width: 100%;
      overflow-x: auto;
      display: flex;
      &--box{
        box-sizing: border-box;
        min-width: 32%;
        flex: 1;
        flex-shrink: 0;
        span{
          display: inline-block;
          padding: 0 5px;
        }
      }
    }

    &_line1{
      height: 36px;
      line-height: 36px;
      background: #EBF5FF;
      font-size: 14px;
      position: relative;
    }
    &_line2{
      border-bottom: 1px solid #EBF1F7;
    }
  }
  .info-list{
    :deep(.layout_main){
      margin-top: 0;
    }
  }
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  ::-webkit-scrollbar-track {
    width: 0;
  }
}
.order{
  div:first-of-type{
    min-width: 80px;
  }
  height: 36px;
}
</style>



