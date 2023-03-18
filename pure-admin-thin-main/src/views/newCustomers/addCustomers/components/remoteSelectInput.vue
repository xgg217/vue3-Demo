<template>
  <div class="remoteSelectInput flex">
    <div >
      <el-select
        v-if="!manual"
        v-model="value"
        filterable
        remote
        v-r-readonly="[0, 0, 0, 0]"
        reserve-keyword
        placeholder="关键字搜索"
        @change="selectItem"
        :remote-method="remoteMethod"
        :loading="loading"
        ref="selectCustomer"
        style="width: 400px"
      >
        <el-option
          v-for="(item, index) in options"
          :key="item.id"
          :label="item.name"
          :value="index"
        />
      </el-select>
      <div class="nameBox" v-else @click="changeToSelect">
        {{ value }}
      </div>
    </div>

    <!-- <div class="addNewItem flex-center b-blue-color">
      <el-button type="primary" @click="openAddCustomer">新增客户</el-button>
    </div> -->

    <!-- <van-overlay :show="show">
      <div class="wrapper" @click.stop>
        <div class="block flex-align-center flex-cul">
          <header class="fz-18">新增客户</header>
          <main class="flex-center">
            <el-input v-model="newName" placeholder="输入客户名称" />
          </main>
          <footer class="flex-center">
            <el-button style="width: 42%" type="primary" plain @click="show = false">取消</el-button>
            <el-button style="width: 42%" type="primary" @click="()=>submit()">确定</el-button>
          </footer>
        </div>
      </div>
    </van-overlay> -->
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue';
import { checkCustomer, addCustomer } from "@/api/business"
import throttle from "./../utils/throttle"
// import { openLoading, closeLoading, failTip, successTip } from "@/utils/toastTips"

const manual = ref(false) // 是否手动

/* 遮罩显影 */
const show = ref(false)
const newName = ref('')


/* 输入框搜索 */
const options = ref([])
const value = ref()
const loading = ref(false)

const getList = throttle((query) => {
  checkCustomer({searchValue: query})
    .then((res) => {
      if (res.code === 200) {
        options.value = res.data
      } else {
        // failTip(res.code + ' - ' + res.msg)
      }
      loading.value = false
    })
    .catch((e) => {
      console.log(e)
      // failTip(JSON.stringify(e))
      loading.value = false
    })
}, 500)

const remoteMethod = (query) => {
  if (query) {
    console.log(2);
    loading.value = true
    getList(query)
  } else {
    options.value = []
  }
}

/* 返回信息 */
const emit = defineEmits(["getCustomerInfo"])
const selectItem = (value) => {
  if (typeof value === 'number') {
    emit('getCustomerInfo', options.value[value])
    return
  }
  emit('getCustomerInfo', value)
}

const changeMethods = () => {
  manual.value = !manual.value
  value.value = ''
  selectItem({id: '', name: ''})
}

const changeToSelect = () => {
  manual.value = false
}

/* 新增客户窗口 */
const openAddCustomer = () => {
  newName.value = ''
  show.value = true
}
/* 提交新增 */
const submit = async (name) => {
  name=name || newName.value
  if (!name) return
  const res = await addCustomerReq({name})
  if (res) {
    const data = {id: res, name}
    options.value.push(data)
    successTip("添加成功！")
    show.value = false
    value.value = data
    emit('getCustomerInfo', data)
    return Promise.resolve()
  } else {
    show.value = false
    return Promise.reject()
  }
}
/* 新增客户 */
// const addCustomerReq = ( params ) => {
//   openLoading()
//   return new Promise(resolve => {
//     addCustomer(params)
//       .then((res) => {
//         if (res.code == 200) {
//           resolve(res.data)
//         } else {
//           resolve(false)
//           failTip(res.code + ' - ' + res.msg)
//         }
//       })
//       .catch((e) => {
//         failTip(JSON.stringify(e))
//         resolve(false)
//       })
//       .finally(() => {
//         closeLoading()
//       })
//   })
// }


onMounted(() => {
  loading.value = true
  console.log(1);
  getList('')
})
  /* 暴露表单信息 */
  defineExpose({
    submit
  })
</script>

<style lang="scss">
.remoteSelectInput{
  width: 100%;
  .van-overlay{
    z-index: 9999;
  }
  .nameBox{
    height: 100%;
    background: #F6F6FB;
    padding: 0 10px;
  }
  .addNewItem{
    width: 40%;
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .block {
    width: 292px;
    height: 199px;
    background-color: #fff;
    border-radius: 8px;
    padding: 15px;
    box-sizing: border-box;
    header{
      font-weight: 600;
    }
    main{
      width: 100%;
      height: 72px;
      background-color: #F6F6FB;
      margin: 15px 0;
      padding: 0 20px;
      box-sizing: border-box;
      input::-ms-input-placeholder{
        text-align: center;
      }
      input::-webkit-input-placeholder{
        text-align: center;
      }
    }
    footer{
      width: 100%;
      .el-button{
        border-radius: 2px;
      }
    }
  }
}
</style>
