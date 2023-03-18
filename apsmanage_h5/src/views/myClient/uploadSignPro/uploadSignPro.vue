<template>
  <div class="uploadSignPro">
    <div class="signProFormWrap">
      <el-form :model="signProInfo" label-position="left" ref="signProFormRef" :rules="signProInfoRule" :disabled="!isEdit" >
        <el-form-item label="客户联系人" prop="contactsList" class="flex-cul">
          <div class="contactsListWrap">
            <!-- 客户联系人列表 -->
            <ul class="contactsListList">
              <li class="flex relative" v-for="(item, index) in signProInfo.contactsList" :key="item.mobile">
                <div class="imgBox flex-center"><img src="../../../assets/images/avatarLarge.png"></div>
                <div class="detailInfoWrap">
                  <div><span class="e-gray-color">姓名: </span>{{ item.name + ' ('+ positionList[item.position].label +')' }}</div>
                  <div><span class="e-gray-color">邮箱: </span>{{ item.email }}</div>
                  <div><span class="e-gray-color">电话: </span>{{ item.mobile }}</div>
                </div>
                <div class="deleteIconWrap flex-center" v-if="isEdit">
                  <van-icon name="cross" color="#707070" size="12.8px" @click="deleteCustomerContact(index)"/>
                </div>
              </li>
            </ul>
            <!-- 新增按钮 -->
            <div class="addWrap flex-align-center" v-if="isEdit && signProInfo.contactsList.length < 10">
              <span class="e-gray-color">添加</span>
              <van-icon name="add" color="#1572F9" size="24px" @click="openAddForm = !openAddForm"/>
            </div>
            <div v-if="openAddForm" class="addInputWrap">
              <!-- 新增客户 -->
              <el-form :model="addContactInfo" label-position="left" ref="addContactInfoRef" :rules="addContactInfoRule" :disabled="!isEdit" >
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
                <el-button type="primary" plain style="float: right; width: 20vw" @click="comfirmContact">确认</el-button>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="我司联系人" prop="companyContactsList" class="flex-cul">
          <!-- 添加我司联系人 -->
          <div class="addWrap flex-align-center companyContactsListAddWrap" style="width: 100%;" v-if="isEdit && signProInfo.companyContactsList.length < 11">
            <span class="e-gray-color">添加</span>
            <van-icon name="add" color="#1572F9" size="24px" @click="openSelectPerson"/>
          </div>
          <!-- 我司联系人列表 -->
          <ul class="companyContactsListListWrap flex" :style="{background: isEdit ? '#F1F7FF' : 'unset'}" v-if="signProInfo.companyContactsList.length">
            <li v-for="(item, index) in signProInfo.companyContactsList" :key="item.id" class="flex-align-center" :style="{background: isEdit ? '#E4EBF9' : '#F1F7FF'}" :class="{'noEditWrap': !isEdit}">
              <div class="surnameWrap" :style="{backgroundColor: colorList[index > 4 ? (index - (Math.floor(index / 4) * 4)) : index]}">{{ item.companyContacts[0] }}</div>
              <div class="more flex nameWrap">{{ item.companyContacts }}</div>
              <van-icon v-if="isEdit" name="cross" color="#707070" size="18px" @click="deleteCompanyContact(index)"/>
            </li>
          </ul>
        </el-form-item>
        <el-form-item label="回签协议" prop="signBackFile" class="flex-cul">
          <uploadFileAndShow style="width: 100%" :isEdit="isEdit" :getFileInfo="getSignProFileInfo" :fileList="signProInfo.signBackFile" :removeFile="removeSignProFileInfo" :limitNum="1"></uploadFileAndShow>
        </el-form-item>
      </el-form>
    </div>
    <div class="operaterWrap fz-12 d-gray-color" v-if="state > 13 && signProInfo.signBackFile.length">
      {{ signProInfo.signBackFile[0].createdBy }} {{ signProInfo.signBackFile[0].createdTime }}
    </div>
    <div class="splitWrap" v-if="!isEdit"></div>
  </div>
</template>

<script setup>
  import uploadFileAndShow from "@/components/business/uploadFileWithshow.vue"
  import { openLoading, closeLoading, failTip, successTip } from "@/utils/toastTips"
  import { Dialog } from 'vant';
  import validate from "@/utils/validate.js"
  import colorList from "@/constant/colorList.js"
  import { chooseMenber } from "@/utils/ddApi.js"
  import { useBusinessStore } from "@/store/business"
  import { getYMDHM } from '@/utils/timeFormat'
  import { saveUploadSignPro } from "@/api/business"
  import bus from "@/utils/bus"


  const businessStore = useBusinessStore()
  const { state, businessProtocolData } = storeToRefs(businessStore)

  const isEdit = ref(true)

  const emit = defineEmits(["changeEditStatus"])

  watch(() => state.value, (newVal) => {
    if (newVal != 13) {
      isEdit.value = false
    } else {
      isEdit.value = true
    }
    emit("changeEditStatus", isEdit.value)
  })

  if (state.value != 13) {
    isEdit.value = false
    emit("changeEditStatus", isEdit.value)
  }

  /* 回签协议信息 */
  const signProFormRef = ref()
  const signProInfo = reactive({
    contactsList: [
      // {name: "鬼剑", position: 0, email: "wwwsdasd@qq.com", mobile: 486432153},
    ],
    companyContactsList: [
      // {companyContacts: "廖星", companyContactsId: "16281353481807069"},
      // {companyContacts: "格斗家", companyContactsId: 2},
      // {companyContacts: "神枪手", companyContactsId: 3}
    ],
    signBackFile: [
      // {name: "测试的文件", url: "96939.vc"},
    ]
  })

  const signProInfoRule = reactive({
    contactsList: [ {type: 'array', required: true, message: '请至少添加一人', trigger: 'blur'} ],
    companyContactsList: [ {type: 'array', required: true, message: '请至少选择一人', trigger: 'change'} ],
    signBackFile: [ {type: 'array', required: true, message: '请上传文件', trigger: 'change'} ]
  })

  /* 回填 */
  watch(() => businessProtocolData.value, (newVal) => {
    setSignProInfo(newVal)
  })

  const setSignProInfo = (data) => {
    const { signBackFile, contactsInfo, companyContactsInfo } = data
    signProInfo.contactsList = contactsInfo
    signProInfo.companyContactsList = companyContactsInfo
    signProInfo.signBackFile = JSON.stringify(signBackFile) == "{}" ? [] : [signBackFile]
  }

  if (businessProtocolData.value) {
    setSignProInfo(businessProtocolData.value)
  }


  /* 回签协议上传删除 */
  const getSignProFileInfo = (info) => {
    signProInfo.signBackFile.push(info)
    signProFormRef.value.validateField(["signBackFile"])
  }
  const removeSignProFileInfo = (info) => {
    signProInfo.signBackFile.splice(info.index, 1)
  }

  /* 客户联系人选择 */
  const deleteCustomerContact = (index) => {
    Dialog.confirm({
      title: '提示',
      message: '是否确定要删除该客户联系人！',
    })
      .then(() => {
        signProInfo.contactsList.splice(index, 1)
      })
      .catch(() => {
      })
  }

  const openAddForm = ref(false)
  const addContactInfoRef = ref()
  /* 新增客户服务 */
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

  /* 客户新增表单信息 */
  const addContactInfo = reactive({
    position: '',
    name: '',
    email: '',
    mobile: ''
  })
  const addContactInfoRule = reactive({
    position: [{ required: true, message: '请选择', trigger: 'change' }],
    name: [{ required: true, message: '请输入', trigger: 'change' }, { min: 0, max: 30, message: '最多只能输入30个字符', trigger: 'change' }],
    email: [{ validator: checkEmail, trigger: 'change' }],
    mobile: [{ validator: checkPhoneNum, trigger: 'change' }]
  })

  /* 职位列表 */
  const positionList = window.positionList
  /* 确认添加 */
  const comfirmContact = () => {
    if (!addContactInfoRef) return
    addContactInfoRef.value.validate((valid, fields) => {
      if (valid) {
        signProInfo.contactsList.push(JSON.parse(JSON.stringify(addContactInfo)))
        signProFormRef.value.validateField(["contactsList"])
        openAddForm.value = false
        Object.keys(addContactInfo).forEach(item => {
          addContactInfo[item] = ''
        })
      } else {
        failTip("表单未填写完整，请完成后提交！")
      }
    })
  }
  /* 新增我司联系人 */
  const deleteCompanyContact = (index) => {
    signProInfo.companyContactsList.splice(index, 1)
  }
  /* 跳转钉钉选人 */
  const openSelectPerson = () => {
    bus.emit("handelSelectPeople",{show:true})
    // chooseMenber((users) => {
    //   users.forEach(item => {
    //     signProInfo.companyContactsList.push({
    //       companyContacts: item.name,
    //       companyContactsId: item.emplId
    //     })
    //   })
    //   signProFormRef.value.validateField(["companyContactsList"])
    // })
  }

  /* 提交 */
  const submitForm = () => {
    if (!signProFormRef) return
    signProFormRef.value.validate(async (valid, fields) => {
      if (valid) {
        const params = {}
        Object.keys(signProInfo).forEach(item => {
          if (item === "signBackFile") {
            params[item] = signProInfo[item][0]
          } else {
            params[item] = signProInfo[item]
          }
        })
        openLoading()
        saveUploadSignPro(params)
          .then((res) => {
            if (res.code === 200) {
              successTip("提交成功！")
              bus.emit("refreshData")
            } else {
              failTip(res.code + ' - ' + res.msg)
            }
          })
          .catch((e) => {
            failTip('网络请求异常，请联系管理员')
          })
          .finally(() => {
            closeLoading()
          })
      } else {
        failTip("表单未填写完整，请完成后提交！" )
      }
    })
  }

  onMounted(() => {
    bus.on("getSelectPerson", (data) => {
      data.forEach(item => {
        signProInfo.companyContactsList.push({
          companyContacts: item.orgName,
          companyContactsId: item.id
        })
      })
      signProFormRef.value.validateField(["companyContactsList"])
    })
  })

  defineExpose({
    submitForm
  })
</script>

<style lang="scss">
.uploadSignPro{
  padding-top: 10px;
  box-sizing: border-box;
  .signProFormWrap{
    // .el-form-item{
    //   margin-bottom: 5px;
    // }
    .el-form-item__label{
      color: $e-gray;
    }
    .el-textarea__inner{
      background-color: #F6F6FB;
      border: unset;
      box-shadow: unset;
    }
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
      justify-content: space-between;
      height: 40px;
    }
    .addInputWrap{
      .el-form-item{
        margin-bottom: 15px;
      }
      .el-input__wrapper{
        box-shadow: none !important;
        background-color: #F6F6FB;
        input::placeholder {
          color: #B2BAD1;
        }
        height: 36px;
      }
    }
    .companyContactsListAddWrap{
      padding: 0 20px;
    }
    .companyContactsListListWrap{
      padding: 10px 5px 0px;
      width: 100%;
      flex-wrap: wrap;
      li{
        width: 96px;
        height: 34px;
        margin-right: 10px;
        // background-color: #E4EBF9;
        border-radius: 17px;
        font-size: 12px;
        margin-bottom: 10px;
        .surnameWrap{
          width: 22px;
          height: 22px;
          line-height: 22px;
          text-align: center;
          color: white;
          border-radius: 17px;
        }
        .nameWrap{
          // width: 49px;
          flex: 1;
          padding: 0 5px;
          box-sizing: border-box;
          // justify-content: space-between;
          display: inline-block;
          text-align: justify;
          text-align-last: justify;
          height: 100%;
          line-height: 36px;
        }
        .van-badge__wrapper{
          width: 22px;
        }
      }
      .noEditWrap{
        .nameWrap{
          padding: 0 15px;
        }
      }
    }
  }
}
</style>
