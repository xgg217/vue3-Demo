<template>
  <div class="back">
    <detail :detail="previewDetail"></detail>
    <layoutModule title="还板拍照" v-if="isEdit">
      <template #main>
        <div class="flex flex-wrap">
          <VantUpload multiple  :max-count="9" :files-list="form.photos" :btnName="'上传附件'" :limitNum="999" :limitFormat="[imagesAccept]" @getFileInfo="getCheckFileInfo">
            <img src="@/assets/images/pic.jpg" class="pic" @click="imagePreview">
          </VantUpload>
          <div v-for="(item,index) in form.photos" class="pic" :key="item">
            <img :src="item" alt="" class="img_100" @click="imagePreview(index)">
            <div class="close">
              <van-icon name="cross" color="#fff" @click="removeCheckFile(item)"/>
            </div>
          </div>
        </div>
      </template>
    </layoutModule>
    <layoutModule title="报废板上报" v-if="isEdit">
      <template #right>
        <van-icon name="scan" size="30" badge="" @click="handelScan"/>
      </template>
      <template #main>
        <div>
          <plateInfoItem v-for="(item ,index) in form.scrapSns" :key="index" :item-info="item">
            <van-icon name="cross" size="22" @click="delPlateInfo(index)"/>
          </plateInfoItem>
        </div>
      </template>
    </layoutModule>

    <div class="next">
      <nextButton text="确认归还" min-text="" @click="confirm" v-if="isEdit"></nextButton>
    </div>
    <pxtPrompt @confirm="confirmButton" v-model:show-prompt="show">
      <template #title>
        <span>上报<span color="#FF3A35">{{ form.scrapSns.length }}</span>片报废品，请确认责任方</span>
      </template>
      <el-form class="form custom-input" ref="ruleFormRef" :model="form" label-position="left" label-width="18vw">
        <el-form-item label="责任" prop="price">
          <el-select v-model="form.dutyUnit" placeholder="请选择责任方">
            <el-option :label="item" :value="item" v-for="item in ['厂内责任','客户责任','供应商责任','其他责任']" :key="item"/>
          </el-select>
        </el-form-item>
        <el-form-item label="报废原因" prop="price">
          <el-input v-model.trim="form.specificCause" type="textarea" placeholder="请说明具体原因" rows="4"/>
        </el-form-item>
      </el-form>
    </pxtPrompt>
  </div>

</template>

<script setup>
import Detail from "@/views/borrowPlate/components/detail.vue";
import PlateInfoItem from "@/views/borrowPlate/components/plateInfoItem.vue";
import PxtPrompt from '@/components/dialog/prompt.vue'
import {ImagePreview, Notify, Toast} from "vant";
import {imagesAccept} from "@/constant/fileType";
import LayoutModule from "@/components/layout/layoutModule.vue";
import VantUpload from "@/components/vantUpload.vue";
import NextButton from "@/components/button/nextButton.vue";
import {scan, close} from "@/utils/ddApi";
import useReviewDetail from "@/views/borrowPlate/useReviewDetail";
import {getDetailBySnCode, ipqcConfirm, otherConfirm} from "@/api/borrowPlate";
import to from "await-to-js";
import {closeLoading, openLoading} from "@/utils/toastTips";

let {previewDetail, id} = useReviewDetail()

let show = ref(false)
let form = reactive({
  photos:[],
  scrapSns: [],
  dutyUnit: '',
  specificCause: '',
})
const isEdit = computed(() => {
  // 申请人确认归还页面： 状态为：borrowing-借板中或者reject-拒绝借板  则可以编辑，否则不行
  return previewDetail?.status === 'borrowing' || previewDetail?.status === 'reject'
})

const isIPQC = computed(() => {
  return previewDetail?.type === 'IPQC'
})

const confirm = () => {
  if (form.scrapSns.length) {
    show.value = true
  } else {
    confirmButton()
  }
}
const confirmButton = () => {
  // 非ipqc必须传3张
  if (!isIPQC.value && form.photos.length < 3) {
    return Notify(`请上传至少三张还板照片`)
  }
  // 上传废板需要填责任方
  if (form.scrapSns.length && !form.dutyUnit) {
    return Notify(`请填写责任方信息`)
  }
  // 上传废板需要填责任方
  if (form.scrapSns.length && !form.specificCause) {
    return Notify(`请填写报废原因`)
  }
  let fn = isIPQC.value ? ipqcConfirm : otherConfirm
  let params = {
    ...toRaw(form),
    scrapSns: form.scrapSns.map(item => item.serialNumber)
  }
  // 无废板删除责任方信息
  if (!form.scrapSns.length) {
    delete params.dutyUnit
    delete params.specificCause
  }
  openLoading()
  fn(id, params).then(() => {
    Toast("提交成功");
    show.value = false
    setTimeout(close, 2000)
  }).finally(closeLoading)
}

const imagePreview = (index) => {
  ImagePreview({
    images: form.photos,
    startPosition: index,
  });
}

const getCheckFileInfo = (info) => {
  info.forEach(({url})=>{
    form.photos.push(url)
  })
}

const removeCheckFile = (info) => {
  form.photos.splice(info.index, 1)
}

const delPlateInfo = (index) => {
  form.scrapSns.splice(index, 1)
}
const handelScan = async () => {
  let [err, data] = await to(scan())
  if (!data) return
  console.log('scan', data)
  getDetailBySnCode(data).then((res) => {
    if (!res.data.length) {
      return Notify(`数据不存在`)
    }
    let {customer_name, serial_number, spec1, work_order, process_name, pdline_name,part_no,stage_name} = res.data[0]
    let isNotBorrow = (previewDetail?.serialNumbers || []).some((item) => item.serialNumber === serial_number)
    if (!isNotBorrow) {
      return Notify(`SN号不存在当前批次借板中`)
    }
    let isCurrent = form.scrapSns.findIndex(item => item.serialNumber === serial_number)
    let temp = {
      serialNumber: serial_number, //SN号
      custName: customer_name, //客户名称
      modelName: spec1, //机型
      workOrderNo: work_order, //工单号
      assemblyLineName: pdline_name, //线别名称
      nodeName: process_name, //制程点
      partNo:part_no, //料号
      stageName:stage_name //区段
    }
    if (isCurrent < 0) {
      form.scrapSns.unshift({...temp})
    } else {
      form.scrapSns[isCurrent] = {...temp}
    }
  })
}

</script>

<style scoped lang="scss">
.back {
  padding-bottom: 100px;

  .pic {
    height: 80px;
    width: 80px;
    margin-right: 10px;
    margin-bottom: 10px;
    position: relative;

    .close {
      background: #efefef;
      position: absolute;
      top: 0;
      right: 0;
      width: 14px;
      height: 14px;
      background: rgba(0, 0, 0, .7);
      border-radius: 0 0 0 12px;

      .van-icon-cross {
        position: absolute;
        top: 0px;
        right: 0px;
        font-size: 14px;
        transform: scale(.7) translate(10%, -10%);
      }
    }
  }

  .next {
    position: fixed;
    width: 100%;
    bottom: 0;

    .save {
      padding-top: 10px;
    }
  }

  .form {
    margin-top: 20px;
  }
}
</style>
