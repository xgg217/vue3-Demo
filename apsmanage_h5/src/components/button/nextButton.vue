<template>
  <div class="save">
    <div>
      <span>{{ text }}</span>
      <span>{{ minText }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: '保存'
  },
  minText: {
    type: String,
    default: '返回小6对话'
  },
})
</script>

<style scoped lang="scss">
.save {
  width: 100%;
  height: 54px;
  border-radius: 2px;
  font-size: 16px;
  overflow: hidden;
  background: #FFFFFF;

  > div {
    margin: 0 21px;
    //width: calc(100% - 42px);
    background: #1572F9;
    text-align: center;
    height: 44px;
    line-height: 44px;
    color: #FFFFFF;
    overflow: hidden;
    border-radius: 2px;
    //margin-top: 6px;
  }

  span:last-of-type {
    font-size: 12px;
    padding-left: 6px;
  }

  .c-font-14 {
    font-size: 14PX;
  }

}

</style>
