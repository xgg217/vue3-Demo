<template>
  <div class="banner">
    <div class="work-banner">
      <van-swipe class="my-swipe" :autoplay="3000" :show-indicators="false" indicator-color="white">
        <van-swipe-item>
          <img src="@/assets/banner/banner1.png" alt="" class="img_100"/>
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/banner/banner2.png" alt="" class="img_100"/>
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/banner/banner3.png" alt="" class="img_100"/>
        </van-swipe-item>
      </van-swipe>
<!--      <swiper :effect="'cards'" :centeredSlides="true" :autoplay="{ delay: 10000, disableOnInteraction: false, }" :grabCursor="true" :modules="modules" class="mySwiper">-->
<!--        <swiper-slide><img src="@/assets/banner/banner1.png" alt="" class="img_100"/></swiper-slide>-->
<!--        <swiper-slide><img src="@/assets/banner/banner2.png" alt="" class="img_100"/></swiper-slide>-->
<!--        <swiper-slide><img src="@/assets/banner/banner3.png" alt="" class="img_100"/></swiper-slide>-->
<!--      </swiper>-->
      <div class="ui-cell ui-cell-sb work-banner_info">
        <div color="#1B2124">{{getDataSection()}}，{{ nickName }}</div>
        <div color="#A7A9B7" class="fz-12">{{ loginTime }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {Swiper, SwiperSlide} from "swiper/vue";
import { EffectCards,Autoplay } from "swiper";
// Import Swiper styles
// import "swiper/css";
// import "swiper/css/effect-cards";
import {useUserStore} from "@/store";
import {getDataSection} from "@/utils/timeFormat";
// let modules=[EffectCards,Autoplay]

let {nickName, loginTime} = storeToRefs(useUserStore())
</script>

<style lang="scss" scoped>
.banner{
  margin-top: 11px;
  .work-banner {
    //margin: 0 40px 0 20px;
    margin: 0 20px;
    .swiper {
      width: 313px;
      height: 215px;
    }
    //.swiper-slide{
    //  rotate: 0deg !important;
    //}
    //:deep(.swiper-slide-shadow){
    //  background: rgba(0,0,0,0);
    //}
    &_info {
      font-size: 14px;
      padding: 0 16px;
      position: relative;
      top: -30px;
      z-index: 99;
    }
  }
}
</style>
