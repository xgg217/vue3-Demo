<template>
  <div>homes页面111</div>
  <!-- <p>{{ val }}</p> -->
  <!-- <button @click="handleAdd"> 点击</button>
  <button @click="handlerShow">显示/隐藏</button> -->
  <!-- <p>{{ text }}</p>
  <input v-model="text"> -->

  <!-- <p>{{ val }}</p> -->
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref, reactive, readonly, isReactive, isReadonly, isProxy, watch, computed, watchEffect } from 'vue';

const count = ref(0);
const obj1 = reactive({ a:' 张三' });
const obj2 = readonly({ a:' 张三' });
const obj3 = { a:' 张三' };

const obj4 = new Proxy({
  name: 1,
}, {});

console.log(isProxy(count)); // false
console.log(isProxy(obj1)); // true
console.log(isProxy(obj2)); // true
console.log(isProxy(obj3)); // false
console.log(isProxy(obj4)); // false

console.log(isReactive(obj1)); // true
console.log(isReactive(obj2)); // false

const obj6 = readonly(obj1);
console.log(isReactive(obj6)); // false

// const obj6 = readonly(obj1);
console.log(isReadonly(obj2)); // false

const obj7 = readonly(obj1);
console.log(isReadonly(obj7)); // true

// setTimeout(() => {
//   count.value++;
// }, 2000);

// setTimeout(() => {
//   obj.a = '李四';
// }, 2000);

// (function() {
//   const data = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><GetWebUrl xmlns="http://tempuri.org/"><JsonData>{  "UserId" : 10194,  "Version" : "1.0.1",  "Language" : 3,  "MasterSecret" : "CTGi*7d54Fs*ssxH8*Rtg3dtrEa2K8d===Yhdt6",  "UserToken" : "7D30994BE0A3BC82757C0E1A671740BA3635C0C9A016F288B02CA7E8D24026BD58B7B46903A803E9E6725F6C31BD6DEF8A0F7E17663788990C08673AB3FB2CC2A0310C5B5C10E3F0",  "ClientType" : 1,  "UrlType" : 7,  "AppMerchantId" : "49E47C84BCD177E3",  "AppEstateId" : "CF2A3FC76F4D80E6",  "DeviceInfo" : "iPad|15.3.1|1.0.0"}</JsonData></GetWebUrl></soap:Body></soap:Envelope>';
//   axios.post('/api/MerchantService.svc', data, {

//     headers: {
//       'Content-Type': 'text/xml',
//       'SOAPAction': 'http://tempuri.org/IMerchantService/GetWebUrl',
//       'Accept': 'application/json;text/javascript;*/',
//     },
//   })
//     .then(function (response) {
//       alert(response.status);
//       console.log(response);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// })();


</script>

<style scoped>

</style>
