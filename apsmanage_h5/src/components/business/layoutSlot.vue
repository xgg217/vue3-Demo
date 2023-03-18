<template>
  <div class="businessLayoutSlot">
    <div class="splitWrap"></div>
    <header :style="{height: showMore ? 'auto' : '111vw'}">
    <!-- <header :style="{height: showMore ? 'auto' : props.headerHeight}"> -->
      <slot name="header"></slot>
    </header>

    <main class="relative">
      <div v-if="!showMore" @click="showMore = true" class="showMoreIconBox absolute flex-center"><van-icon name="arrow-down" /></div>
      <div class="contentWrap">
        <slot name="main"></slot>
      </div>
      <div v-if="showMore" @click="showMore = false" class="showMoreIconBox absolute flex-center bottomIcon"><van-icon name="arrow-up" /></div>
      <template v-if="isEdit">
        <div class="operaterWrap fz-12 d-gray-color">
          {{ nickName }} {{ getYMDHM(new Date(), '.') }}
        </div>
        <div class="splitWrap"></div>
      </template>

    </main>

    <footer v-if="isEdit" class="pageFooter">
      <div class="buttonWrap flex-center">
        <slot name="footer"></slot>
      </div>
    </footer>
  </div>
</template>

<script setup>
  import { getYMDHM } from '@/utils/timeFormat'
  import { useUserStore } from "@/store/user"

  const userStore = useUserStore()
  const { nickName } = storeToRefs(userStore)

  const props = defineProps({
    // headerHeight: {
    //   type: String,
    //   default: "40%"
    // },
    isEdit: {
      type: Boolean,
      default: true
    },
    // mainHeight: {
    //   type: String,
    //   default: "60%"
    // }
  })

  const showMore = ref(false)

</script>

<style lang="scss" scoped>
.businessLayoutSlot{
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  header{
    // overflow-y: auto;
    overflow: hidden;
    padding: 10px 20px 0;
    box-sizing: border-box;
    background-color: white;
    // min-height: 18vh;
  }
  .showMoreIconBox{
    width: 16px;
    height: 16px;
    background-color: white;
    border-radius: 8px;
    color: #1572F9;
    right: 25px;
    top: -29.5px;
  }
  .bottomIcon{
    position: fixed;
    bottom: 85px;
    right: 25px;
    top: unset;
    z-index: 999;
  }
  main{
    padding: 0px 20px;
    box-sizing: border-box;
    overflow: visible;
    background-color: white;
    input::placeholder {
      color: #B2BAD1;
    }
    .contentWrap{
      // overflow-y: auto;
      height: 100%;
    }
    .el-input-group__append, .el-input-group__prepend{
      background-color: unset;
    }
    .el-input.is-disabled .el-input__wrapper{
      background-color: white;
    }
    .el-select .el-input__wrapper.is-focus {
      box-shadow: none !important;
    }
    .el-select .el-input.is-focus .el-input__wrapper, .el-input-group__append{
      box-shadow: none !important;
    }
    .el-input__wrapper{
      box-shadow: none !important;
      background-color: #F6F6FB;
      border-radius: 2px;
    }
    .el-form-item__label{
      color:$e-gray;
    }

    .el-textarea__inner{
      background-color: #F6F6FB;
      border: unset;
      box-shadow: unset;
    }
    .busCancelEdit{
      .el-form-item{
        margin-bottom: 5px;
      }
      .grayWrap{
        background-color: white;
      }
      .el-input-group__append, .el-input-group__prepend{
        background-color: #F2F8FD;
      }
      .el-textarea.is-disabled .el-textarea__inner{
        background-color: white;
        color: $b-gray;
      }
      .el-input.is-disabled .el-input__inner, .el-radio__input.is-disabled+span.el-radio__label, .el-checkbox__input.is-disabled+span.el-checkbox__label{
        color: $b-gray;
      }

      .el-radio, .el-checkbox{
        display: none;
      }

      .is-checked{
        display: flex;
      }

      .el-input__suffix{
        display: none;
      }
    }
  }
  // footer{
  //   height: 60px;
  //   position: relative;
  //   .buttonWrap{
  //     box-sizing: border-box;
  //     box-shadow: 0 0 2px 2px rgb(238, 238, 238);
  //     height: 60px;
  //     position: fixed;
  //     z-index: 99;
  //     bottom: 0;
  //     left: 0;
  //     background-color: white;
  //     width: 100vw;
  //   }
  //   .el-button{
  //     height: 44px;
  //     border-radius: 2px;
  //     border: unset;
  //   }
  // }

}
</style>
