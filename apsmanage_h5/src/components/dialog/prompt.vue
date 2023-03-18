<template>
  <div class="prompt">
    <van-overlay :show="showPrompt" v-bind="$attrs">
      <div class="wrapper" @click.stop="emit('update:showPrompt',false)">
        <div class="wrapper_main" @click.stop>
          <div class="wrapper_main--title">
            <slot name="title">{{ title }}</slot>
          </div>
          <div class="wrapper_main--main">
            <slot></slot>
          </div>
          <div class="bottom-4 wrapper_main--button">
            <pxt-button height="36px" class="ml2 mr2 flex1" @click.stop="cancel" v-if="showCancelButton">{{cancelButtonText}}</pxt-button>
            <pxt-button height="36px" class="ml2 mr2 flex1" type="active" v-if="showConfirmButton" @click="confirm">{{confirmButtonText}}</pxt-button>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script setup name="PxtPrompt">
import PxtButton from "@/components/button/button.vue";

const emit = defineEmits(["update:showPrompt","confirm","cancel"])
let props = defineProps({
  //标题
  title: {
    type: String,
    default: ''
  },
  //确认按钮文案
  confirmButtonText: {
    type: String,
    default: '确认'
  },
  //取消按钮文案
  cancelButtonText: {
    type: String,
    default: '取消'
  },
  // 是否显示弹窗
  showPrompt: {
    type: Boolean,
    default: false
  },
  // 是否显示确认按钮
  showConfirmButton: {
    type: Boolean,
    default: true
  },
  // 是否显示取消按钮
  showCancelButton: {
    type: Boolean,
    default: true
  },
  // 主体最小高度
  minHeight : {
    type: String,
    default: '100px'
  },
})

const confirm = () => {
  emit('confirm')
}
const cancel = () => {
  emit('update:showPrompt',false)
  emit('cancel')
}

</script>

<style lang="scss" scoped>
.prompt {
  :deep(.van-overlay){
    z-index: 3;
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    &_main {
      width: 252px;
      min-height: v-bind(minHeight);
      background: #FFFFFF;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      padding: 20px 20px 60px 20px;
      box-sizing: content-box;
      position: relative;

      &--title {
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        color: $b-gray;
        //margin-top: 26px;
      }

      &--button {
        display: flex;
        position: absolute;
        width: calc(100% - 40px);
      }
    }
  }
}
</style>
