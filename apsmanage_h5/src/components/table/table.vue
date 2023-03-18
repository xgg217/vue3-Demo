<template>
  <div class="table" ref="pxTable" style="color: rebeccapurple" >
    <div :class="innerClass">
      <!--表头-->
      <table class="table-header" :style="`width:${_table_width}px`">
        <colgroup>
          <col
              v-for="(item, index) in columns"
              :key="`table-tr-${index}`"
              :name="`table_tr_${index}`"
              :width="`${item.width}px`"
          />
        </colgroup>
        <thead class="table-header-thead">
        <tr  :style="headerCellStyle()">
          <th
              v-for="(item, index) in columns"
              :key="`table-thead-${index}`"
              :class="thClass(item)"
          >{{ item.label }}
          </th>
        </tr>
        </thead>
      </table>
      <!--表体-->
      <div class="table-body-area" :style="bodyAreaStyle">
        <div class="scrollbar"></div>
        <table class="table-body" :style="`width:${_table_width}px`">
          <colgroup>
            <col
                v-for="(item, index) in columns"
                :key="`table-tr-${index}`"
                :name="`table_tr_${index}`"
                :width="`${item.width}px`"
            />
          </colgroup>

          <tbody class="table-body-tbody">
          <!-- 暂无数据-->
          <tr class="table-empty-tr" v-if="isEmpty">
            <td :colspan="columns.length">暂无数据</td>
          </tr>
          <template v-else>
            <tr v-for="(item, index) in dataSource" :key="`table-tbody-tr-${index}`" :style="cellStyle(item,index)">
              <td
                  v-for="(v, k) in columns"
                  :key="`table-tbody-td-${index}-${k}`"
                  :class="tdClass(v)"
              >
                <template v-if="!v.scope">{{ item[v.key] ?? '-' }}</template>

                <slot
                    v-else
                    :name="v.scope.customRender"
                    :row="item"
                    :index="index"
                    :data="item[v.key]"
                ></slot>
              </td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue'
import {useTable} from './table'

const emit = defineEmits(["headerCellStyle", "cellStyle"])
const props = defineProps({
  cols: {type: Array, default: () => []}, // 表格头部列表 Table header list
  dataSource: {type: Array, default: () => []}, // 表格数据 Table data source
  height: {type: String, default: ""}, // 固定高度 Fixed height
  border: {type: Boolean, default: false}, // 展示边框 Bordered or not
  stripe: {type: Boolean, default: false}, // 斑马纹 Stripe or not
})

const {pxTable, columns, _table_width} = useTable(props)

const isEmpty = computed(() => props.dataSource.length === 0)
const hasBorder = computed(() => props.border)
const isStripe = computed(() => props.stripe)
const fixedHeight = computed(() => props.height)

const bodyAreaStyle = computed(() => {
  if (props.height) {
    return `width:${_table_width.value}px;max-height:${props.height}px;height:${props.height}px;overflow-y:auto`
  }
  return `width:${_table_width.value}px`
})

const innerClass = computed(() => {
  return ["table-inner",
    {"table-border": hasBorder.value},
    {"table-stripe": isStripe.value},
    {"table-fixed-header": fixedHeight.value}
  ]
})

const thClass = (item) => {
  let align = `text-${item['headerAlign'] || item['align'] || 'left'}`
  return [align]
}

const tdClass = (item) => {
  let align = `text-${item['align'] || 'left'}`
  return [align]
}
// 表头自定义样式
const headerCellStyle = () => {
  let ret = {}
  emit('headerCellStyle',  (val) => {
    ret = val
  })
  return ret
}
// 表行自定义样式
const cellStyle = (row, index) => {
  let ret = {}
  emit('cellStyle', {row, $index: index}, (val) => {
    ret = val
  })
  return ret
}
</script>

<script>
export default {name: "px-table"};
</script>
<style lang="scss" scoped>
@import "table";
</style>
