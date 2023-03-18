<!--单行信息列表-->
<template>
  <layoutModule :show-title="false">
    <template #main>
      <div class="info">
        <header>{{ title }}</header>
        <div v-for="(item,index) in infoList.value" :key="index" class="ui-cell info_list" v-show="!item.hidden">
          <div :style="{color: item.labelColor}">{{ item.name ?? '-' }}</div>
          <div v-if="item.type==='img'">
            <img @click="ImagePreview(infoList.data[item.value],idx)" v-for="(img,idx) in infoList.data[item.value]" :key="idx" class="img" :src="img" alt="">
          </div>
          <div v-else class="ui-nowrap" :style="{color: item.contentColor}">{{ infoList.data[item.value] ?? '-' }}</div>
        </div>
      </div>
    </template>
  </layoutModule>
</template>

<script>
import {ImagePreview} from 'vant';
import 'vant/es/image-preview/style';

export default {
  name: 'infoList',
  props: {
    infoList: {
      type: Object,
      default: () => {
        return {
          data: {},
          value: [
            // {
            //   name: '客户单号',
            //   value: 'customerNo',
            //   hidden:true, //隐藏
            //   labelColor:'red',
            //   contentColor:'red'
            // },
            // {
            //   name: '料号',
            //   value: 'materialNo',
            // },
          ]
        }
      }
    },
    title: {
      type: String,
      default: '信息详情'
    }
  },
  setup(props) {
    const ImagePreview = (images,index) => {
      ImagePreview({
        images,
        startPosition: index,
      });
    }

    return {
      ImagePreview
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  width: 100%;
  height: 100%;

  & > header {
    height: 36px;
    line-height: 36px;
    font-size: 16px;
    font-weight: 550;
  }

  &_list {
    font-size: 14px;
    width: 100%;

    div:first-of-type {
      text-align: left;
      color: $e-gray;
      min-width: 80px;
      line-height: 36px;
      flex-shrink: 0;
    }

    div:last-of-type {
      color: $b-gray;
      flex: 1;
      overflow-x: hidden;
    }
  }

  .img {
    width: 68px;
    height: 68px;
    background: #F2F3F8;
    margin-right: 12px;
  }
}
</style>
