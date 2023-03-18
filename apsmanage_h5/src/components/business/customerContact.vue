<template>
  <div class="contactsListWrap">
    <!-- 客户联系人列表 -->
    <ul class="contactsListList">
      <li class="flex relative" v-for="(item, index) in contactsList" :key="item.mobile">
        <div class="imgBox flex-center"><img src="../../assets/images/avatarLarge.png"></div>
        <div class="detailInfoWrap">
          <div><span class="e-gray-color">姓名: </span>{{ item?.name + ' ('+ positionList[item?.position - 1].label +')' }}</div>
          <div><span class="e-gray-color">邮箱: </span>{{ item?.email }}</div>
          <div><span class="e-gray-color">电话: </span>{{ item?.mobile }}</div>
        </div>
        <div class="deleteIconWrap flex-center" v-if="!isDetail">
          <van-icon name="cross" color="#707070" size="12.8px" @click="deleteCustomerContact(index)"/>
        </div>
      </li>
    </ul>
    <!-- 新增按钮 -->
    <template v-if="!isDetail">
      <div class="flex addWrap" v-if="contactsList.length < 10">
        <div class="flex-align-center">
          <span class="e-gray-color mr-5">添加</span>
          <van-icon name="add" color="#1572F9" size="24px" @click="openAddForm = !openAddForm"/>
        </div>
      </div>
      <div v-if="openAddForm" class="addInputWrap">
        <!-- 新增客户 -->
        <el-form :model="addContactInfo" label-position="left" ref="addContactInfoRef" :rules="addContactInfoRule">
          <el-form-item prop="position">
            <el-select v-model="addContactInfo.position" placeholder="对方职位" style="width: 100%">
              <el-option
                  v-for="item in positionList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item prop="name">
            <el-input v-model="addContactInfo.name" placeholder="输入姓名" />
          </el-form-item>

          <el-form-item prop="email">
            <el-input v-model="addContactInfo.email" placeholder="输入邮箱" />
          </el-form-item>

          <el-form-item prop="mobile">
            <el-input v-model="addContactInfo.mobile" placeholder="输入电话" />
          </el-form-item>

        </el-form>
        <div>
          <div class="btn1" @click="comfirmContact">确认</div>
          <div class="btn1 btn2"  @click="openAddForm = false">取消</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
  import validate from "@/utils/validate.js"
  import { Dialog } from 'vant'
  import { failTip } from "@/utils/toastTips"

  const props = defineProps({
    /* 联系人列表 */
    contactsList: {
      type: Array,
      default: () => []
    },
    isDetail: {
      type: Boolean,
      default: false
    },
  })
  /* 删除联系人、确认添加联系人 */
  const emit = defineEmits(["deleteContact", "confirmContact"])
  /* 职位列表 */
  const positionList = window.positionList
  /* 删除列表联系人 */
  const deleteCustomerContact = (index) => {
    Dialog.confirm({
      title: '提示',
      message: '是否确定要删除该客户联系人！',
    })
      .then(() => {
        emit("deleteContact", index)
      })
      .catch(() => {
      })
  }
  /* 显隐新增 */
  const openAddForm = ref(false)
  /* 新增数据 */
  const addContactInfo = reactive({
    position: '',
    name: '',
    email: '',
    mobile: ''
  })
  const addContactInfoRef = ref()
  /* 验证邮箱 */
  const checkEmail = async (rule, value, callback) => {
    if (!value) {
      callback(new Error('请输入邮箱'))
      return
    }
    if (!validate.email.test(value)) {
      callback(new Error('请输入正确格式邮箱'))
      return
    }
    callback()
  }
  /* 验证手机 */
  const checkPhoneNum = async (rule, value, callback) => {
    if (!value) {
      callback(new Error('请输入电话'))
      return
    }
    if (!validate.telnumber0.test(value)) {
      callback(new Error('请输入正确电话号码'))
      return
    }
    callback()
  }
  /* 新增客户规则 */
  const addContactInfoRule = reactive({
    position: [{ required: true, message: '请选择', trigger: 'change' }],
    name: [{ required: true, message: '请输入', trigger: 'change' }, { min: 0, max: 30, message: '最多只能输入30个字符', trigger: 'change' }],
    email: [{ validator: checkEmail, trigger: 'change' }],
    mobile: [{ validator: checkPhoneNum, trigger: 'change' }]
  })
  /* 确认添加 */
  const comfirmContact = () => {
    if (!addContactInfoRef) return
    addContactInfoRef.value.validate((valid, fields) => {
      if (valid) {
        emit("confirmContact", JSON.parse(JSON.stringify(addContactInfo)))
        openAddForm.value = false
        Object.keys(addContactInfo).forEach(item => {
          addContactInfo[item] = ''
        })
      } else {
        failTip("表单未填写完整，请完成后提交！")
      }
    })
  }
</script>

<style lang="scss" scoped>
  .contactsListWrap{
    padding: 0 20px;
    width: 100%;
    .contactsListList{
      li{
        height: 86px;
        width: 100%;
        background-color: $e-blue;
        padding: 10px 5px;
        box-sizing: border-box;
        margin-bottom: 10px;
        .imgBox{
          height: 66px;
          width: 66px;
          img{
            height: 100%;
            width: 100%;
          }
        }
        .detailInfoWrap{
          height: 100%;
          margin-left: 10px;
          flex: 1;
          &>div{
            font-size: 12px;
            height: 22px;
            width: 100%;
            line-height: 22px;
          }
        }
        .deleteIconWrap{
          position: absolute;
          top: 5px;
          right: 5px;
          height: 12px;
          width: 12px;
        }
      }
    }
  }
  .addWrap{
    justify-content: flex-end;
    height: 40px;
  }
  .addInputWrap{
    :deep(.el-form-item){
      margin-bottom: 15px;
    }
    :deep(.el-input__wrapper){
      box-shadow: none !important;
      background-color: #F6F6FB;
      input::placeholder {
        color: #B2BAD1;
      }
      height: 36px;
    }
    .btn1{
      float: right;
      width: 77px;
      height: 36px;
      background: #F1F7FF;
      border-radius: 2px;
      font-size: 16px;
      color: #0096FF;
      text-align: center;
      line-height: 36px;
    }
    .btn2{
      background: #F4F5FC;
      color: $b-gray;
      margin-right: 20px;
    }
  }
</style>
