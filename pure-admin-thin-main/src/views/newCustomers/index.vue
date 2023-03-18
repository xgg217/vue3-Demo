<script setup lang='ts'>
import { reactive } from 'vue';
import { useRouter } from "vue-router";

const router = useRouter();



// 搜索
const {
  formInline
} = (function () {
  const formInline = reactive({
    user: '',
  })

  return {
    formInline
  }
})()



// 表格
const {
  tableData,
  addCustomersPage
} = (function () {
  interface ITableData {
    id: number;
    name: string;
  }

  const tableData = reactive<ITableData[]>([])

  for (let i = 0; i < 10; i++) {
    tableData.push({
      id: i,
      name: '客户名称' + i
    })
  }

  // 新增客户跳转
  const addCustomersPage = () => {
    console.log('新增客户')
    router.push({name: 'addCustomers'})
  }

  return {
    tableData,
    addCustomersPage
  }
})()

</script>

<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline head">
      <el-form-item label="客户名称">
        <el-input v-model="formInline.user" placeholder="请输入" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
      </el-form-item>
    </el-form>

    <div class="table">
      <div class="table-title">
        <p>客户列表</p>
        <el-button type="primary" @click="addCustomersPage">新增</el-button>
      </div>

      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" width="50" />
        <el-table-column prop="name" label="客户名称" />
        <el-table-column prop="name" label="录入日期" />
        <el-table-column prop="name" label="状态" />
        <el-table-column prop="name" label="合作模式" />
        <el-table-column prop="name" label="入料途径" />
        <el-table-column prop="name" label="结算币别" />
        <el-table-column prop="name" label="加工工序" />
        <el-table-column prop="name" label="业务员" />
        <el-table-column prop="name" label="操作" width="200px">
          <template #default="scope">
            <el-button size="small">查看详情</el-button>
            <el-button size="small">会议决议</el-button>
            <el-button size="small">审批结果</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.head {
  padding: 20px 20px 0 20px;
  margin-bottom: 20px;
  background-color: #fff;
}

.table {
  background-color: #fff;
  width: 100%;
  padding: 8px;

  .table-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    // padding: 20px 20px 10px 20px;
    padding: 16px;
    font-weight: bold;
    // font-size: 16px;
  }

}
</style>
