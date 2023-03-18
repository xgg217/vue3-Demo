<template>
  <div class="project-table">
    <LayoutModule :title="currency" class="layout-one">
      <template v-slot:main>
        <div>
          <div class="ui-cell ui-cell-sb pb-19" style="border-bottom: 1px solid #EBF1F7">
            <div>
              <div class="label height36">采购价（未税）</div>
              <div class="value">{{formatMoney(detail?.purchaseAmountTotal)}}</div>
            </div>
            <div>
              <div class="label height36">报价（未税）</div>
              <div class="value">{{ formatMoney(detail?.offerAmountTotal) }}</div>
            </div>
            <div>
              <div class="label height36">利润（￥）</div>
              <div class="value">{{ formatMoney(detail?.profitTotal) }}</div>
            </div>
          </div>
          <div class="textRight">
            <div class="label height36">利润率</div>
            <div class="value " color="#FF3A35!">{{ detail?.profitRateTotal }}</div>
          </div>
          <slot>
          </slot>
        </div>
      </template>
    </LayoutModule>
  </div>
</template>

<script setup>
import LayoutModule from "@/components/layout/layoutModule.vue"
import {formatMoney} from "@/utils/utils";
const currency = inject('currency')
let props = defineProps({
  detail: {
    type: Object,
    default: () => {
    }
  },
})
</script>

<style scoped lang="scss">
.label {
  font-size: 14px;
  font-weight: 500;
  color: $e-gray;
  flex-shrink: 0;
}

.value {
  font-size: 14px;
  font-weight: 400;
  color: $b-gray;
  flex-shrink: 0;
}
</style>
