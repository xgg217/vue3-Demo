<template>
  <div class="remoteSelectPro flex">
    <div>
      <el-select
        v-if="!manual"
        v-model="value"
        filterable
        remote
        reserve-keyword
        placeholder="关键字搜索"
        @change="selectItem"
        :remote-method="remoteMethod"
        :loading="loading"
        ref="selectProduct"
      >
        <el-option
          v-for="(item, index) in options"
          :key="item.id"
          :label="item.productName"
          :value="index"
        />
      </el-select>
      <div class="nameBox" v-else @click="changeToSelect">
        {{ value }}
      </div>
      <!-- <el-input v-else v-model="value" placeholder="请输入产品名称" @input="selectItem"/> -->
    </div>

    <div class="addNewItem flex-center b-blue-color">
      <!-- <span @click="changeMethods">{{ !manual ? '手动输入' : '查询选项' }}</span> -->
      <span @click="openAddProduct"><van-icon name="plus" /> 新增产品</span>
    </div>

    <!-- <van-overlay :show="show">
      <div class="wrapper" @click.stop>
        <div class="block flex-align-center flex-cul">
          <header class="fz-18">新增产品</header>
          <main class="flex-center">
            <el-input v-model="newName" placeholder="输入产品名称" />
          </main>
          <footer class="flex-center">
            <el-button style="width: 42%" type="primary" plain @click="show = false">取消</el-button>
            <el-button style="width: 42%" type="primary" @click="submit">确定</el-button>
          </footer>
        </div>
      </div>
    </van-overlay> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// import { Notify } from 'vant';
import { checkProduct, addProduct  } from "@/api/business"
import throttle from "./../utils/throttle"
// import { openLoading, closeLoading, failTip, successTip } from "@/utils/toastTips"

const manual = ref(false) // 是否手打

const emit = defineEmits(["getProductInfo"])

/* 遮罩显影 */
const show = ref(false)
const newName = ref('')

const props = defineProps({
  initInfo: {
    type: Object
  }
})

/* 输入框搜索 */
const options = ref([])
const value = ref()
const loading = ref(false)

const getList = throttle((query) => {
  checkProduct({searchValue: query})
    .then((res) => {

      if (res.code === 200) {
        options.value = res.data
        if (props.initInfo.id) {
          const data = {id: props.initInfo.id, productName: props.initInfo.name}
          const index =  options.value.findIndex(item => item.id === props.initInfo.id)
          if (index) {
            options.value.splice(index, 1)
          }
          options.value.push(data)
          value.value = data
          emit('getProductInfo', data)
        }
      } else {
        // failTip(res.code + ' - ' + res.msg)
      }
      loading.value = false
    })
    .catch((e) => {
      // failTip(JSON.stringify(e))
      loading.value = false
    })
}, 200)

const remoteMethod = (query) => {
  if (query) {
    loading.value = true
    getList(query)
  } else {
    options.value = []
  }
}

/* 返回信息 */
const selectItem = (value) => {
  console.log(options.value[value])
  if (typeof value === 'number') {
    emit('getProductInfo', options.value[value])
    return
  }
  emit('getProductInfo', value)
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
const openAddProduct = () => {
  newName.value = ''
  show.value = true
}

/* 提交新增 */
const submit = async () => {
  if (!newName.value) return
  const res = await addProductReq(newName.value)
  if (res) {
    const data = {id: res, productName: newName.value}
    options.value.push(data)
    // successTip("添加成功！")
    show.value = false
    value.value = data
    emit('getProductInfo', data)
  } else {
    show.value = false
  }
}

/* 新增产品 */
const addProductReq = (name) => {
  // openLoading()
  return new Promise(resolve => {
    addProduct({productName: name})
      .then((res) => {
        if (res.code == 200) {
          resolve(res.data)
        } else {
          resolve(false)
          // failTip(res.code + ' - ' + res.msg)
        }
      })
      .catch((e) => {
        // failTip(JSON.stringify(e))
        resolve(false)
      })
      .finally(() => {
        // closeLoading()
      })
  })
}

onMounted(() => {
  loading.value = true
  getList('')
})
</script>

<style lang="scss">
.remoteSelectPro{
  width: 100%;
  .addNewItem{
    // width: 40%;
  }
  .van-overlay{
    z-index: 9999;
  }
  .nameBox{
    height: 100%;
    background: #E3EEFE;
    padding: 0 10px;
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
      .el-input__wrapper{
        background-color: unset !important;
      }
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