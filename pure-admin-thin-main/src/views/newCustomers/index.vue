<script setup lang='ts'>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from "vue-router";
import { customerPageList } from '@/api/business';
import { businessStatus } from '@/enum/dict'

const router = useRouter();

// 表格 + 搜索
const {
  loading,
  total,
  formInline,
  tableData,
  asyncCustomerPageList,
  addCustomersPage,
  handleSizeChange,
  handleCurrentChange,
} = (function () {
  interface ITableData {
    id: number;
    name: string; // 客户名称
    createdTime: string; // 录入日期
    userId: number; // 录入人
    status: number; // 状态
    statusName: string; // 状态名称
    statusClass: string; // 状态样式
    days: number; // 天数
  }

  // 加载
  const loading = ref(false);

  // 搜索
  const formInline = reactive({
    user: '',
    currentPage: 1, // 当前页
    pageSize: 10, // 每页条数
  })

  const total = ref(0); // 总条数

  const tableData = ref<ITableData[]>([])

  // 获取客户列表
  const asyncCustomerPageList = () => {
    const obj = {
      pageNum: formInline.currentPage,
      pageSize: formInline.pageSize,
    }
    loading.value = true;
    customerPageList(obj).then(res => {
      console.log(res);
      const { data, success } = res;
      if (!success) { return }
      console.log(data);

      const { total: sum, list } = data as any;

      total.value = Number(sum);

      tableData.value = (list as ITableData[]).map(item => {

        const obj:ITableData = {
          id: item.id,
          name: item.name,
          createdTime: item.createdTime,
          userId: item.userId,
          status: item.status,
          statusName: businessStatus[item.status].lable,
          statusClass: businessStatus[item.status].className,
          days: item.days,
        };

        console.log(item.days);

        if (item.status === 0) {
          obj.statusName = obj.statusName +  ' 剩余' + item.days + '天到期'
        }

        return Object.freeze<ITableData>(obj);
      })

    }).catch(err => {
      console.error(err);
    }).finally(() => {
      loading.value = false;
    })
  };

  // 每页数量改变触发
  const handleSizeChange = (val: number) => {
    formInline.pageSize = val;
    asyncCustomerPageList();
  };

  // 当前页改变触发
  const handleCurrentChange = (val: number) => {
    formInline.currentPage = val;
    asyncCustomerPageList();
  };

  // 新增客户跳转
  const addCustomersPage = () => {
    console.log('新增客户')
    router.push({ name: 'addCustomers' })
  }

    return {
    loading,
    formInline,
    total,
    tableData,
    asyncCustomerPageList,
    addCustomersPage,
    handleSizeChange,
    handleCurrentChange,
  }
})();

onMounted(() => {
  asyncCustomerPageList()
})

</script>

<template>
  <div>
    <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline head">
      <el-form-item label="客户名称">
        <el-input v-model="formInline.user" placeholder="请输入" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
      </el-form-item>
    </el-form> -->

    <div class="table">
      <div class="table-title">
        <p>我的客户</p>
        <el-button type="primary" @click="addCustomersPage">新增</el-button>
      </div>

      <el-table v-loading="loading" :data="tableData" border style="width: 100%">
        <el-table-column type="index" width="50" />
        <el-table-column prop="name" label="客户名称" />
        <el-table-column prop="createdTime" label="录入日期" />
        <el-table-column label="状态">
          <template #default="scope">
            <span :class="scope.row.statusClass">{{ scope.row.statusName }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="name" label="合作模式" />
        <el-table-column prop="name" label="入料途径" />
        <el-table-column prop="name" label="结算币别" />
        <el-table-column prop="name" label="加工工序" />
        <el-table-column prop="name" label="业务员" /> -->
        <el-table-column prop="name" label="操作" width="200px">
          <template #default="scope">
            <el-button size="small">查看详情</el-button>
            <el-button size="small">会议决议</el-button>
            <el-button size="small">审批结果</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          v-model:current-page="formInline.currentPage"
          v-model:page-size="formInline.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
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

.pagination {
  margin-top: 20px;
  display: flex;
  flex-direction: row-reverse;
}
</style>
