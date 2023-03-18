<template>
 <div class="collection">

 </div>
</template>

<script setup>
import { removeItem} from "@/utils/utils";

let router=useRouter()
onMounted(()=>{
  router.push({name: "404", query: {'description': '你尚未购买该模块，如有需要请联系管理员！','title': '暂无权限','img': 'permission'}})
  removeItem('tabActive')
})
</script>

<style lang="scss" scoped>

</style>
