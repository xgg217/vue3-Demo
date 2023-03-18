<template>
  <div class="card">
    <header class="flex-align-center">
      <span class="fz-13">{{ cardType.value }}</span>
      <span class="fz-12">{{ cardData.customerNo }}</span>
    </header>
    <main>
      {{ cardData[cardType.key] ?? '--' }}
    </main>
    <footer>
      <ul class="flex">
        <li v-for="(item, index) in cardConfig" :key="item.key" :style="{width: cardConfig.length - 1 == index ? '25%' : '25%' }">
          <div class="lable">{{ item.value }}</div>
          <div class="value">{{ cardData[item.key] ?? '--' }}</div>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'cardInfo',
  props: {
    cardData: {
      type: Object,
      default: () => {}
    },
    cardType: {
      type: Object,
      default: () => { return {key: 'productDate', value: '计划生产时间'}}
    },
    cardConfig: {
      type: Array,
      default: () => [
        {key: "pno", value: "订单周别"}, {key: "producedQty", value: "已产出数"}, {key: "orderNum", value: "订单数量"}, {key: "date", value: "订单日期"},
      ]
    },
    offset: {
      type: String,
      default: '0px'
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: 157px;
  background-image: url("../../assets/images/layoutBg2.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-bottom: 14px;
  border-radius: 2px;
  padding: 0 20px;
  box-sizing: border-box;
  color: white;
  header{
    height: 48px;
    padding-top: 7px;
    box-sizing: border-box;
    justify-content: space-between;
  }
  main{
    height: 53px;
    font-size: 26px;
    letter-spacing: 2px;
  }
  footer{
    height: 56px;
    ul{
      height: 100%;
      li{
        height: 100%;
        &>div{
          height: 50%;
        }
        .lable{
          font-size: 10px;
          line-height: 30px;
        }
        .value{
          font-size: 14px;
          line-height: 22px;
          white-space: nowrap;
        }
      }
    }
  }
  &_time {
    padding: 12px;
    color: $d-blue;
    font-size: 12px;
  }

  &_list {
    color: #ffffff;
    font-size: 20px;
    height: 50px;
    > div {
      //width: 25%;
      text-align: center;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      >div{
        flex-shrink: 0;
      }
    }

    > div:nth-of-type(1) {
      line-height: 55px;
    }

    > div > div:nth-of-type(1):before {
      display: inline-block;
      content: '';
      height: 19px;
      background-color: $f-gray;
      width: 1px;
      position: absolute;
      left:v-bind(offset);
      top: 18px;
      z-index: 0;
    }

    > div > div:nth-of-type(2) {
      font-size: 12px;
      //line-height: 30px;
      color: $d-blue;
    }
  }
}
</style>
