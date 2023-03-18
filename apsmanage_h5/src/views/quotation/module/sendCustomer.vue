<!--报价信息弹窗-->
<template>
  <div>
    <van-action-sheet v-model:show="show">
      <div class="sheet">
        <!--头部标题-->
        <div class="ui-cell ui-cell-sb sheet_head">
          <div>
            <!--占位-->
          </div>
           <div class="pl-48">确认发给客户</div>
          <van-icon name="cross" size="24" @click="show=false"/>
        </div>
        <!--中间筛选主体-->
        <div class="sheet_main">
          <div class="height36 e-gray-color">选择发送方式</div>
          <el-radio-group v-model="status" class="ml-4">
            <el-radio label="1" size="large">
              邮件（系统自动发送）
            </el-radio>
            <div v-if="status==1" class="customer">
              <el-checkbox-group v-model="selectContactsList">
                <el-checkbox :label="index" v-for="(item,index) in contactsList" :key="index">
                  <div class="list ui-cell">
                    <img style="height: 34px" src="@/assets/images/avatarLarge.png" alt="">
                    <div>
                      <div>{{ item.name }}</div>
                      <div class="fz-12 e-gray-color">{{ item.email }}</div>
                    </div>
                  </div>
                </el-checkbox>
              </el-checkbox-group>
              <div class="height36 ui-cell self-end">
                <span class="e-gray-color mr-5">添加</span>
                <van-icon name="add" color="#1572F9" size="24px" @click="openAddForm = true"/>
              </div>
              <el-form class="custom-input" v-if="openAddForm" :model="contactInfo" label-position="left" ref="contactInfoRef" :rules="contactInfoRule">
                <el-form-item prop="name">
                  <el-input v-model="contactInfo.name" placeholder="输入姓名"/>
                </el-form-item>
                <el-form-item prop="email">
                  <el-input v-model="contactInfo.email" placeholder="输入邮箱"/>
                </el-form-item>
                <el-form-item prop="mobile">
                  <el-input v-model="contactInfo.mobile" placeholder="输入电话"/>
                </el-form-item>
              </el-form>
              <div class="btn" v-if="openAddForm">
                <div @click="openAddForm = false" class="mr-10">取消</div>
                <div @click="comfirmContact">确定</div>
              </div>
            </div>
            <el-radio label="2" size="large">复制报价link地址</el-radio>
            <el-radio label="3" size="large">下载pdf报价单到本地</el-radio>
<!--            v-if="isDd"-->
            <el-radio label="4" size="large" v-if="isDd">转发到内部钉钉</el-radio>
          </el-radio-group>
          <div class="ui-cell save-btn mt-12">
            <NextButton text="取消" min-text="" class="pt-10 save-preview" @click="show=false"></NextButton>
            <NextButton text="确认" min-text="" class="pt-10 save-confirm" @click="confirm"></NextButton>
          </div>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script setup>
import {checkEmail, checkPhoneNum} from "@/utils/validate.js"
import NextButton from "@components/button/nextButton.vue"
import {openShare, openSaveFile, close, clipboardData} from "@/utils/ddApi";
import {Notify, Toast} from "vant";
import {downloadOfferFile, getHttpContactList, sendToCustomer} from "@/api/business";
import {useSystemStore} from "@/store";
import throttle from "@/utils/throttle";
import {closeLoading, openLoading} from "@/utils/toastTips";
import useClipboard from 'vue-clipboard3'
const offerId = inject('offerId')
const emit = defineEmits(["update:popupShow"])
let {isDd}=storeToRefs(useSystemStore())

let props = defineProps({
  popupShow: {
    type: Boolean,
    default: false
  },
  shareTitle: {
    type: String,
    default: ''
  },
})

const show = computed({
  get: () => props.popupShow,
  set: (value) => {
    emit('update:popupShow', value)
  }
})
const contactInfoRule = reactive({
  name: [{required: true, message: '请输入姓名', trigger: 'change'}, {min: 0, max: 30, message: '最多只能输入30个字符', trigger: 'change'}],
  email: [{validator: checkEmail, trigger: 'change'}],
  mobile: [{validator: checkPhoneNum, trigger: 'change'}]
})
let data = reactive({
  status: "1",
  selectContactsList: [],
  openAddForm: false,
  contactInfo: {
    email: '',
    name: '',
    mobile: ''
  },
  contactsList: [] //客户联系人
})
let contactInfoRef = ref()
let {contactsList, status, selectContactsList, contactInfo, openAddForm} = toRefs(data)
onMounted(()=>{
  getContactList()
})
const getContactList = () => {
  getHttpContactList({offerId}).then((res)=>{
    let data=res.data || []
    contactsList.value.push(...data)
  })
}
const comfirmContact = () => {
  contactInfoRef.value.validate((valid, fields) => {
    if (valid) {
      let len = contactsList.value.push({...contactInfo.value})
      selectContactsList.value.push(len - 1)
      openAddForm.value = false
      contactInfoRef.value.resetFields()
    }
  })
}
const confirm = throttle(()=>{

  if(status.value==='1'){
    if(!selectContactsList.value.length){
      return Notify(`请填写客户信息`);
    }
    openLoading()
    sendToCustomer({offerId,contactsList:getContactsList(selectContactsList.value),operationType:'sendEmail'}).then((res)=>{
      Toast("发送成功");
      setTimeout(close,1000)
    }).finally(closeLoading)
  }else if(status.value==='2'){
    openLoading()
    sendToCustomer({offerId,operationType:'copyLink'}).then(async (res)=>{
      await clipboardData(res.msg)
      setTimeout(close,1000)
    }).finally(closeLoading)
  }else if(status.value==='3'){
    downloadOfferFile({offerId}).then((res)=>{
      openSaveFile(res.data.name,res.data.url,{isClose:true})
    })
  }else if(status.value==='4'){
    openLoading()
    sendToCustomer({offerId,operationType:'copyLink'}).then((res)=>{
      openShare({title:props.shareTitle,url:res.msg})
      setTimeout(close,2000)
    }).finally(closeLoading)
  }
})
const getContactsList = (list=[]) => {
  let ret=[]
  list.forEach((item)=>{
    let info=contactsList.value.filter((items,index)=>index==item)
    if(info.length)ret.push(info[0]);
  })
  return ret
}
</script>

<style scoped lang="scss">
.sheet {
  position: relative;

  &_head {
    box-sizing: border-box;
    font-size: 18px;
    height: 46px;
    color: $b-gray;
    width: 100%;
    background: #FFFFFF;
    position: sticky;
    top: 0;
    z-index: 9;
    padding: 0 20px;
  }

  &_main {
    padding: 0 20px;
    font-size: 16px;
    font-weight: 400;
    color: $b-gray;
    min-height: 300px;
    position:relative;
    :deep(.el-radio-group) {
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
    }

    :deep(.el-radio__label) {
      font-weight: 400;
      color:$b-gray
    }

    .customer {
      width: calc(100% - 60px);
      margin-left: 60px;
      flex-direction: column;
      display: flex;

      :deep(.el-checkbox-group) {
        display: flex;
        flex-direction: column;
      }

      :deep(.el-checkbox) {
        height: 50px;
        margin-bottom: 10px;
      }

      .list {
        width: 235px;
        height: 50px;
        background: #F6F6FB;
        font-size: 14px;
        font-weight: 400;
        color: #333333;
        padding: 0 7px;
        line-height: 20px;
      }

      .btn {
        display: flex;
        justify-content: end;
        margin-top: 5px;


        div {
          width: 77px;
          height: 30px;
          background: #F4F5FC;
          border-radius: 2px;
          font-size: 14px;
          font-weight: 500;
          color: $b-gray;
          text-align: center;
          line-height: 30px;
        }

        div:last-of-type {
          color: #0096FF;
          background: #F1F7FF;
        }
      }
    }

    .save-btn {
      :deep(.save:first-of-type) > div {
        margin: 0;
        margin-right: 5px;
        background: #E8F3FF;
        color: #1572F9;
      }

      :deep(.save:last-of-type) > div {
        margin: 0;
        margin-left: 5px;
      }
    }
  }

}
</style>
