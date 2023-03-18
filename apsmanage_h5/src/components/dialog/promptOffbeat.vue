<template>
  <div class="prompt">
    <van-overlay :show="showPrompt" >
      <div class="wrapper" @click.stop="emit('update:showPrompt',false)">
        <div class="wrapper_main" @click.stop>
          <div class="mb-4">
            <slot></slot>
          </div>
          <div class="bottom-4 wrapper_main--button">
            <pxt-button class="mr2 flex1" :height="props.height" @click.stop="emit('update:showPrompt',false)" v-if="showCancelButton">{{cancelButtonText}}</pxt-button>
            <pxt-button class="ml2 flex1" :height="props.height" type="active" v-if="showConfirmButton" @click="confirm">{{confirmButtonText}}</pxt-button>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script setup name="PxtPrompt">
import PxtButton from "@/components/button/button.vue";

const emit = defineEmits(["update:showPrompt","confirm"])
let props = defineProps({
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
    default: false
  },
  height: {
    type: String,
    default: '44px'
  }
})

const confirm = () => {
  emit('confirm')
}
</script>

<style lang="scss" scoped>
.prompt {
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    &_main {
      width: 252px;
      min-height: 100px;
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
        margin-top: 26px;
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
