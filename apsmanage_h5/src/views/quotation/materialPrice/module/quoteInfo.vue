<!--报价信息弹窗-->
<template>
  <div>
    <van-action-sheet v-model:show="show">
      <div class="sheet">
        <!--头部标题-->
        <div class="ui-cell ui-cell-sb sheet_head">
          <div>
            <!--占位-->
          </div>
          <div class="pl-48">更多</div>
          <van-icon name="cross"  size="24" @click="toggleShow(false)"/>
        </div>
        <!--中间筛选主体-->
        <div class="sheet_main">
          <div>
            <div class="ui-cell ui-cell-sb height36">
              <div class="w-2/8 flex-shrink-0 ui-nowrap">BOM层级</div>
              <div class="line"></div>
              <div class="w-1/8 flex-shrink-0 ui-nowrap">{{isEmpty(quoteInfoData?.[0]?.bomGroup)}}</div>
              <div class="line"></div>
              <div class="w-2/8 flex-shrink-0 ui-nowrap">
                <el-tooltip class="box-item" effect="dark" :content="quoteInfoData?.[0]?.subMaterialNo" placement="top-start">
                  {{isEmpty(quoteInfoData?.[0]?.subMaterialNo)}}
                </el-tooltip>
              </div>
            </div>
            <div class="ui-cell ui-cell-sb height36">
              <div class="w-2/8 flex-shrink-0 ui-nowrap">
                {{isEmpty(quoteInfoData?.[0]?.subType)}}
              </div>
              <div class="line"></div>
              <div class="w-1/8 flex-shrink-0 ui-nowrap">
                {{isEmpty(quoteInfoData?.[0]?.productStage)}}
              </div>
              <div class="line"></div>
              <div class="w-2/8 flex-shrink-0 ui-nowrap">
                <el-tooltip class="box-item" effect="dark" :content="quoteInfoData?.[0]?.materialName" placement="top-start">
                  {{isEmpty(quoteInfoData?.[0]?.materialName)}}
                </el-tooltip>
              </div>
            </div>
            <div class="height36 ui-nowrap">
              <el-tooltip class="box-item" effect="dark" :content="quoteInfoData?.[0]?.specModel" placement="top-start">
                {{isEmpty(quoteInfoData?.[0]?.specModel)}}
              </el-tooltip>
              </div>
          </div>
          <div v-for="(item,index) in quoteInfoData" :key="index" @click="changeOffer(index)">
            <div class="sheet_main--list" :class="{'active':item.isSelected===0}">
              <div></div>
              <div>
                <div v-for="(items,index) in dict" class="list_item ui-cell" :key="index">
                  <div>{{items.name}}</div>
                  <div class="ui-nowrap">
                    <el-tooltip class="box-item" effect="dark" :content="item?.[items.key]" placement="top-start">
                      {{isEmpty(item?.[items.key])}}
                    </el-tooltip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script setup>
const emit = defineEmits(["update:popupShow","changeOffer"])
let props = defineProps({
  popupShow: {
    type: Boolean,
    default: false
  },
  quoteIndex: {
    type: Number
  },
  quoteInfoData: {
    type: Array,
    default: () => []
  },
})
const dict=[
  {name:'品牌',key:'customerBrand'},
  {name:'账期',key:'accountPeriod'},
  {name:'税点',key:'taxPoint'},
  {name:'采购员',key:'createdBy'},
  {name:'实际用量',key:'actualUsage'},
  {name:'指定供应商',key:'supplier'},
  {name:'MOQ栏位',key:'moq'},
  {name:'对内报价(未税)',key:'internalOffer'},
  {name:'报价金额(未税)',key:'offerAmount'},
]
let show = computed(() => {
  return props.popupShow
})

const toggleShow = (value) => {
  emit('update:popupShow', value)
}
const changeOffer = (index) => {
  if(props.quoteInfoData.length!==1){
    emit("changeOffer",index)
  }
}
const isEmpty = (str) => {
  return str==='' ? '-':str
}
</script>

<style scoped lang="scss">
.sheet {
  position: relative;
  &_head {
    box-sizing: border-box;
    font-size: 18px;
    height: 46px;
    color: $b-gray;
    width: 100%;
    background: #FFFFFF;
    position: sticky;
    top: 0;
    z-index: 9;
    padding: 0 20px;
  }

  &_main {
    padding:0 20px;
    font-size: 16px;
    font-weight: 400;
    color: $b-gray;
    > div:first-of-type {
      border-bottom: 1px solid #EEEFEF;
    }
    &--list {
      cursor: pointer;
      width: 100%;
      height: 200px;
      border-radius: 8px;
      margin: 12px 0;
      display: flex;
      border: 1px solid #EEEFEF;

      > div:first-of-type {
        width: 8px;
        height: 200px;
        background: #F6F6FB;
        border-bottom-left-radius: 8px;
        border-top-left-radius: 8px;
      }

      > div:last-of-type {
        padding: 10px 12px;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
      }
      .list_item:nth-of-type(n){
        width: 40%;
      }
      .list_item:nth-of-type(2n){
        width: 60%;
      }
      .list_item{
        display: flex;
        flex-shrink: 0;
        font-size: 14px;
        font-weight: 400;
        color: $b-gray;
        div:first-of-type{
          color: $e-gray;
          flex-shrink: 0;
        }
        div:last-of-type{
          padding: 0 10px;
          flex: 1;
          text-align: right;
        }
      }
      .list_item:last-of-type{
        width: 60%;
        color: #FF3A35;
      }
    }

    .active {
      background: #E8F3FF;

      > div:first-of-type {
        background: #0076F6;
      }
    }
  }

  .line {
    width: 0;
    height: 19px;
    border-right: 1px solid #EEEFEF;
  }
}
</style>
