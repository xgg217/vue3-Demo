## Table 属性/事件

| **参数**      | **说明**        | **类型**   | **可选值** | **默认值** |
|-------------|---------------|----------|---------|---------|
| cols        | 表格头部列表        | Array    | -       | []      |
| data-source | 表格数据          | Array    | -       | []      |
| height      | 固定高度(ios有回弹)  | String   | -       | -       |
| loading     | 加载状态          | Boolean  | -       | false   |
| border      | 展示边框          | Boolean  | -       | false   |
| stripe      | 斑马纹           | Boolean  | -       | false   |
| cellStyle      | 行样式参考eltable  | FUnction | -       | -       |
| headerCellStyle      | 表头样式参考eltable | FUnction  | -       | -       |

## Table-columns 属性
| **参数**       | **说明**                 | **类型**               | **可选值**                         | **默认值** |
|--------------|------------------------|----------------------|---------------------------------|---------|
| label        | 列标题                    | String               | -                               | -       |
| key          | 对应数据中的键值               | String &#124; Number | -                               | -       |
| width        | 列的宽度                   | String &#124; Number | -                               | -       |
| min-width    | 列的最小宽度                 | String &#124; Number | -                               | -       |
| align        | 列的对齐方式                 | String               | left &#124; center &#124; right | left    |
| header-align | 表头对齐方式，如不设置则默认使用 align | String               | left &#124; center &#124; right | left    |
| scope        | 作用域插槽，用于自定义列模板         | Object               | {customRender}                  | -       |

```vue
<template>
  <div style="width: 80%;overflow-y: auto;margin: 0 auto">
    <PxTable @cellStyle="cellStyle" @headerCellStyle="headerCellStyle"  border height="200" stripe :cols="demoCol" :data-source="demoData">
      <template #action>
        <div style="color: red">编辑</div>
      </template>
    </PxTable>
  </div>
</template>

<script setup>
import PxTable from '@/components/table/table.vue'

let demoCol= [
      { label: "座号", key: "seat", width: 100 },
      { label: "姓名", key: "name" },
      { label: "成绩", key: "results" },
      { label: "班级排名", key: "ranking" },
      { align: "center", label: "操作", scope: { customRender: "action" } },
    ]
let demoData=[
      { seat: "1", name: "李小颖", results: "522", ranking: "4" },
      { seat: "15", name: "杜小浩", results: "462", ranking: "18" },
      { seat: "18", name: "汤小青", results: "482", ranking: "12" },
      { seat: "28", name: "田小锋", results: "475", ranking: "15" },
      { seat: "35", name: "吴小豪", results: "372", ranking: "41" },
      { seat: "41", name: "吴小可", results: "404", ranking: "33" },
      { seat: "46", name: "木小亦", results: "409", ranking: "40" },
      { seat: "43", name: "邹小辉", results: "293", ranking: "53" },
    ]
const cellStyle = ({row,index},callback) => {
  if(row.name==="李小颖"){
    callback({
      color:'red'
    })
  }else{
    callback({
      color:'blue'
    })
  }
}
const headerCellStyle = (callback) => {
  callback({
    color:'#efefef',
    fontSize:'24px'
  })
}
</script>
```
