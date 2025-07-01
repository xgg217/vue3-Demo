<script setup lang="ts">
import { getDateLen } from "./utils";
import type { IItem, IDate } from "./types";
import Big from "big.js";

const name = "上班统计";

// 统计相关
const { xs, tjVal, len, tjArr } = (() => {
  const xs = ref(22); // 单价
  const tjVal = ref(0);

  const tjArr = shallowRef<string[]>([]);

  const len = computed(() => {
    if (tjVal.value === 0) {
      return 0;
    }
    return Big(tjVal.value).times(xs.value).toNumber();
  });

  return {
    xs,
    tjVal,
    len,
    tjArr,
  };
})();

const {
  tableData,
  loading,
  add,
  onClick,
  onSave,
  onRead,
  onDel,
  tableDataInit,
} = (() => {
  const tem: IItem = {
    day: 0,
    xwS: "", // 下午
    xwE: "", // 下午
    wsS: "", // 晚上
    wsE: "", // 晚上
    swS: "", // 上午
    swE: "", // 上午
  };

  const loading = ref(false);

  const tableData = shallowRef<IItem[]>([]);

  const add = () => {
    tableData.value.push({
      ...tem,
      day: 1,
    });
  };

  const onClick = () => {
    let tj = Big(0);
    tjArr.value = tableData.value
      .map(item => {
        const { day, xwS, xwE, wsS, wsE, swS, swE } = item;

        const arr1: IDate = [xwS, xwE];
        const arr2: IDate = [wsS, wsE];
        const arr3: IDate = [swS, swE];
        // arr.push(arr1, arr2, arr3)
        // const obj = {
        //   day,
        //   arr
        // }
        // return obj
        // return `${day}号`
        let str = `${day}号`;

        // 下午存在
        if (xwS && xwE) {
          str += ` ${xwS}-${xwE}`;
        }

        // 晚上存在
        if (wsS && wsE) {
          // str += ` ${wsS}-${wsE}`
          // 凌晨存在
          if (swS && swE) {
            str += ` ${xwS}-${swE}`;
          } else {
            str += ` ${wsS}-${wsE}`;
          }
        }

        const val = getDateLen(arr1, arr2, arr3);
        return {
          day: item.day,
          val,
        };
      })
      .filter(item => {
        return item.val > 0;
      })
      .map(item => {
        tj = Big(tj).plus(item.val);
        return `${item.day}号 ${item.val}小时`;
      });

    tjVal.value = tj.toNumber();
  };

  const onDel = (index: number) => {
    tableData.value.splice(index, 1);
  };

  // 存储
  const onSave = () => {
    window.localStorage.setItem(name, JSON.stringify(tableData.value));
  };

  // 读取
  const onRead = () => {
    const val = window.localStorage.getItem(name);
    if (val) {
      tableData.value = JSON.parse(val);
    }
  };

  // 初始化
  const tableDataInit = () => {
    const arr: IItem[] = [];
    loading.value = true;
    setTimeout(() => {
      for (let i = 1; i <= 31; i++) {
        arr.push({ ...tem, day: i });
      }
      tableData.value = arr;
      loading.value = false;
    }, 1000);
  };

  return {
    tableData,
    loading,
    add,
    onClick,
    onSave,
    onRead,
    onDel,
    tableDataInit,
  };
})();

onMounted(() => {
  tableDataInit();
});
</script>

<template>
  <main>
    <div class="row">
      <el-button type="primary" @click="add">新增一行</el-button>
      <el-button @click="onClick">统计</el-button>
      <el-button @click="onSave">保存</el-button>
      <el-button @click="onRead">读取</el-button>
      <el-input-number v-model="xs" />
    </div>
    <div class="table">
      <el-table :data="tableData" border stripe v-loading="loading">
        <el-table-column prop="day" label="日" width="120" sortable>
          <template #default="{ row }">
            <el-select v-model="row.day" style="width: 80px">
              <el-option
                v-for="item in 31"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="下午" label="下午" width="300">
          <template #default="{ row }">
            <el-time-select
              v-model="row.xwS"
              style="width: 120px"
              placeholder="开始"
              start="11:00"
              step="00:30"
              end="17:00"
            />
            <el-time-select
              v-model="row.xwE"
              style="width: 120px"
              placeholder="结束"
              start="11:00"
              step="00:30"
              end="17:00"
            />
          </template>
        </el-table-column>
        <el-table-column prop="晚上" label="晚上" width="300">
          <template #default="{ row }">
            <el-time-select
              v-model="row.wsS"
              style="width: 120px"
              max-time="24:30"
              placeholder="开始"
              start="16:00"
              step="00:30"
              end="24:00"
            />
            <el-time-select
              v-model="row.wsE"
              style="width: 120px"
              max-time="24:30"
              placeholder="开始"
              start="16:00"
              step="00:30"
              end="24:00"
            />
          </template>
        </el-table-column>
        <el-table-column prop="上午" label="上午" width="300">
          <template #default="{ row }">
            <el-time-select
              v-model="row.swS"
              style="width: 120px"
              max-time="11:30"
              placeholder="开始"
              start="00:00"
              step="00:30"
              end="11:00"
            />
            <el-time-select
              v-model="row.swE"
              style="width: 120px"
              max-time="11:30"
              placeholder="结束"
              start="00:00"
              step="00:30"
              end="11:00"
            />
          </template>
        </el-table-column>
        <!-- <el-table-column label="时长" width="400">
        <template #default="{ row }">
          <span>{{ getDateLen(row.xw, row.ws, row.sw) }}</span>
        </template>
      </el-table-column> -->
        <!-- <el-table-column prop="上午" label="统计" width="400"> </el-table-column> -->
        <el-table-column label="" width="80">
          <template #default="{ $index }">
            <el-button link type="primary" size="small" @click="onDel($index)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="li">
        <p>共计{{ tjVal }}小时 * {{ xs }}元/小时 = {{ len }}元</p>
        <ul>
          <li v-for="item of tjArr" :key="item">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  /* border: 1px solid #000; */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.row {
  display: flex;
  /* align-items: center; */
  margin: 20px 0;
}

.table {
  display: flex;
  justify-content: space-between;
  /* border: 1px solid #000; */
  width: 100%;
}

.li {
  border: 1px solid #000;
  width: 400px;
}
</style>
