<template>
  <div class="project">
    <div class="label ui-cell">
      外发客户报价
    </div>
    <div class="flex ui-cell" v-for="(item,index) in receivedName" :key="index">
      <div  class="label">收件人</div>
      <div class="value">{{item}}（{{receivedEmail[index]}}）</div>
    </div>
    <RightIcon class="justify-end" text="邮件详情" @click="show=true"></RightIcon>
    <HandlePeople class="white-bg" height="36px" :time="detail?.createdTime" :name="detail?.createdBy"></HandlePeople>
    <PxtPrompt  title="邮件详情" v-model:showPrompt="show" :showCancelButton="false" @confirm="show=false">
     <div class="b-gray-color">
       <p>你好：</p>
       <p>&nbsp;&nbsp;&nbsp;&nbsp;贵司跟{{detail.factoryName}}的加工机型{{detail.material}}报价单已经生成，附件是电子档报价单，请查收。</p>
       <p>&nbsp;&nbsp;&nbsp;&nbsp;按此回复您对此份报价的确认结果，期待您尽快确认。</p>
       <p @click="setCopyToClipboard(detail.attachmentUrl)">&nbsp;&nbsp;&nbsp;&nbsp;或者复制此链接地址到浏览器：<span color="#1572F9">点此复制</span></p>
       <p>&nbsp;&nbsp;&nbsp;&nbsp;如有疑问，可以联系我司 贾欣鑫，Mail：jiaxinxin@pxtsc.com，Tel：15914042319</p>
       <p>&nbsp;&nbsp;&nbsp;&nbsp;此致</p>
       <p>&nbsp;&nbsp;&nbsp;&nbsp;此份邮件为系统自动发出，请勿回复</p>
     </div>
    </PxtPrompt>
  </div>
</template>

<script setup>
import HandlePeople from '@components/handlePeople.vue'
import RightIcon from '@components/rightIcon.vue'
import PxtPrompt from '@/components/dialog/prompt.vue'
import {copyToClipboard} from "@/utils/utils";
import {Toast} from "vant";
const props = defineProps({
  detail: {
    type: Object,
    default: () => {}
  }
})
let data = reactive({show: false})
let receivedName=computed(()=>{
  let ret=props.detail?.receivedName
  if(ret){
    return ret.split(',')
  }else {
    return []
  }
})
let receivedEmail=computed(()=>{
  let ret=props.detail?.receivedEmail
  if(ret){
    return ret.split(',')
  }else {
    return []
  }
})

let {show}=toRefs(data)

const setCopyToClipboard = (url) => {
  copyToClipboard(url)
  Toast("已复制到剪切板");
}
</script>

<style scoped lang="scss">
.project {
  &-base {
    background: #FFFFFF;
    padding: 10px 20px;
  }
  .label{
    width: 24vw;
    font-size: 14px;
    font-weight: 400;
    color: $e-gray;
    height: 36px;
    line-height: 36px;
  }
  .value{
    font-size: 14px;
    color: $b-gray;
  }
}
</style>
