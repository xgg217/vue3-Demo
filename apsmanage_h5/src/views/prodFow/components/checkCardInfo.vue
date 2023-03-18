<!--设备点检页面的列表-通用-->
<template>
  <div class="card">
    <div class="ui-cell ui-cell-sb card_tally" v-if="true">
      <div>点检人：张三</div>
      <div>发送通知</div>
    </div>
    <div class="flex card_info" v-for="item in 2" :key="item">
      <div class="ui-cell card_info--title" :style="titleColor(1)" v-if="true">
        <div>日</div>
        <div class="mt5">检</div>
      </div>
      <div class="card_info--list">
        <div class="ui-cell ui-cell-sb pb2 list_head">
          <div>SC0058000013</div>
          <div class="ui-nowrap">GKG-G5</div>
        </div>
        <div class="list_item">
          <div>设备型号</div>
          <div class="ui-nowrap">哈哈哈</div>
        </div>
        <div class="list_item">
          <div>设备类型</div>
          <div class="ui-nowrap">GKG-G5</div>
        </div>
        <div class="list_item">
          <div>截止时间</div>
          <div class="ui-nowrap">GKG-G5</div>
        </div>
        <div class="list_item">
          <div>超时时间</div>
          <div class="ui-nowrap">GKGGKGGKGGK</div>
        </div>
      </div>
      <svg width="98" height="31.875" viewBox="0 0 98 31.875" class="svg">
        <g transform="translate(-265 -248)">
          <g transform="translate(-6291.254 -6131.938)">
            <path :style="stateColor(2)" d="M8,0H98a0,0,0,0,1,0,0V27a0,0,0,0,1,0,0H8a8,8,0,0,1-8-8V8A8,8,0,0,1,8,0Z" transform="translate(6556.254 6379.938)"/>
            <path :style="stateColor(2)" d="M6641.281,6458.9v-4.875h7.86Z" transform="translate(5.113 -47.089)"/>
          </g>
          <text class="c" transform="translate(314 267)">
            <tspan x="-20.72" y="0">待执行</tspan>
          </text>
        </g>
      </svg>
    </div>
  </div>
</template>

<script setup name="checkCardInfo">
let props = defineProps({
  svgBottom: {
    type: String,
    default: '10px'
  },
})

function titleColor(type = 1) {
  let color = '#2DD4BF', background = '#CCFBF1'
  switch (type) {
    case 0:
      color = '#2DD4BF'
      background = '#CCFBF1'
      break
    case 1:
      color = '#818CF8'
      background = '#E0E7FF'
      break
    case 2:
      color = '#38BDF8'
      background = '#E0F2FE'
      break
  }
  return {
    color,
    background: background
  }
}

function stateColor(type = 1) {
  let fill = '#FF8B00'
  switch (type) {
    case 0:
      fill = '#FF8B00' //超时完成
      break
    case 1:
      fill = '#0096FF' //待执行
      break
    case 2:
      fill = '#FF3A35' //任务超时
      break
    case 4:
      fill = '#34C606' //完成
      break
  }
  return {
    fill
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: calc(100% - 40px);
  margin: 14px 20px 0 20px;
  color: $b-gray;

  &_tally {
    font-size: 16px;
    color: $b-gray;
    margin-bottom: 14px;

    div:last-of-type {
      color: $a-blue;
    }
  }

  &_info {
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 0px 16px 1px #EBF5FF;
    border-radius: 8px;
    margin-bottom: 12px;
    position: relative;

    &--title {
      writing-mode: vertical-lr;
      text-align: center;
      flex-shrink: 0;
      width: 32px;
      justify-content: center;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
    }

    &--list {
      flex: 1;
      padding: 10px 0 6px 0;
      color: $b-gray;

      .list_head {
        padding: 0 10px 13px 13px;
        border-bottom: 1px solid $a-gray;
      }

      .list_item {
        padding: 0 13px 10px 13px;
        display: flex;
        line-height: 20px;
        div:first-of-type {
          width: 80px;
          color: $e-gray;
          flex-shrink: 0;
        }
        div:last-of-type {
          width: 200px;
        }
      }
    }

    .svg {
      position: absolute;
      right: -8px;
      bottom: v-bind(svgBottom);

      .c {
        fill: #fff;
        font-size: 14px;
        letter-spacing: -0.02em;
      }
    }

  }

}
</style>
