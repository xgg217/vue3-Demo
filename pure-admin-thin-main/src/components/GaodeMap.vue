<template>
  <div class="gaodemap" v-loading="loading">
    <div class="absolute searchInputWrap">
      <el-input :id="'mapSearchIn'" v-model="addressName" label="" placeholder="请输入地址" />
    </div>
    <div id="gaodeMapWrap" ></div>
    <div class="comfirmWrap flex-center">
      <el-button
        :disabled="addressName.length === 0"
        type="primary"
        size="large"
        style="margin-left: 20px;"
        @click="comfiremMapSelect"
      >确定</el-button>
      <el-button @click="closeMapWindow" type="primary" plain size="large">关闭</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router';
import remoteLoad from '@/utils/remoteLoad.js'
import mapKey from '@/enum/mapKey'
import { ElMessage } from 'element-plus'
// import { failTip } from "@/utils/toastTips"

const route = useRoute()
const loading = ref(false) // 加载状态

onMounted(async () => {
  if (window.AMap && window.AMapUI) {
    createdMap()
  } else {
    await remoteLoad(`https://webapi.amap.com/maps?v=1.4.15&key=${mapKey}&plugin=AMap.Autocomplete,AMap.Geocoder,AMap.PlaceSearch`)
    // await remoteLoad("/maps.js")
    createdMap()
  }
})

onUnmounted(() => {
  destoryMap()
})

const props = defineProps({
  lnglat: {
    type: Object,
    default: () => {return {lng: 113.94027, lat: 22.512353}}
  },
  isEdit: {
    type: Boolean,
    default: true
  },

  // 类型，防止同一个页面有多个地方需要地图
  type: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(["getAddressInfo", 'close'])

const addressName = ref('')
let addressLnglat = null

/* 地图创建 */
let map = null
let marker = null
let geocoder = null
let AMap = null
const createdMap = () => {
  if (!window.AMap) {
    // alert('载入地图失败！')
    ElMessage.error('载入地图失败！')
    return
  }
  AMap = window.AMap;
  loading.value = true;
  map = new AMap.Map('gaodeMapWrap', {
    WebGLParams: {
      preserveDrawingBuffer: true
    },
    center: [props.lnglat.lng || 113.94027, props.lnglat.lat || 22.512353],
    // layers: 'normal',
    zoom: 16,
    // mapStyle: '', // 地图主题,和个人账号绑定
    features: ['bg', 'road', 'building', 'point'], // 地图显示要素（bg:区域面,road:道路,building:建筑物,point:标注）
    showLabel: true,
    defaultCursor: 'pointer',
    showIndoorMap: false, // 是否在有矢量底图的时候自动展示室内地图，PC默认true,移动端默认false,
    resizeEnable: true, // 是否监控地图容器尺寸变化，默认值为false
    dragEnable: true, // 地图是否可通过鼠标拖拽平移，默认为true
    keyboardEnable: false, // 地图是否可通过键盘控制，默认为true
    doubleClickZoom: false, // 地图是否可通过双击鼠标放大地图，默认为true
    zoomEnable: true, // 地图是否可缩放，默认值为true
    rotateEnable: false, // 地图是否可旋转，3D视图默认为true,若设置为false则固定视角，2D视图默认false
    pitchEnable: true,
    pitch: 0, // 视角
    rotation: 0,
    expandZoomRange: true,
    // viewMode: '3D', // 开启3D视图,默认为关闭
    buildingAnimation: true // 楼块出现是否带动画
  })

  map.on('complete', function () {
    loading.value = false
    if (AMap.Autocomplete) {
      const auto = new AMap.Autocomplete({
        input: 'mapSearchIn'
      })
      AMap.event.addListener(auto, 'select', (e) => {
        markMap(e.poi.location)
        map.setCenter([e.poi.location.lng, e.poi.location.lat])
      })
    }
  })
  map.on('click', function (e) {
    if (props.isEdit) {
      markMap(e.lnglat)
    }
  })
}

/* 销毁地图 */
const destoryMap = () => {
  map && map.destroy()
  map = null
}

/* 地图标记 */
const markMap = (lnglat) => {
  if (!lnglat) {
    // failTip("该地址不可用，请重新选择！")
    ElMessage.warning('该地址不可用，请重新选择！')
    return
  }
  if (!geocoder) {
    geocoder = new AMap.Geocoder()
  }

  if (!marker) {
    marker = new AMap.Marker()
    map.add(marker)
  }
  marker.setPosition(lnglat)
  addressLnglat = reactive(JSON.parse(JSON.stringify(lnglat)))
  geocoder.getAddress(lnglat, function (status, result) {
    if (status === 'complete') {
      const { regeocode } = result
      addressName.value = regeocode.formattedAddress
      addressLnglat = JSON.parse(JSON.stringify(lnglat))
    }
  })
}
// 关闭地图
const closeMapWindow = () => {
  // emit('update:modelValue', false)
  emit('close')
  window.openMap = null
}
/* 确认选择 */
const comfiremMapSelect = () => {
  if(addressLnglat){
    emit('getAddressInfo', { type: props.type ,name: addressName.value, lnglat: addressLnglat })
    // emit("update:modelValue", false)
    closeMapWindow()
  }
}

watch(() => props.type, (newVal, oldVal) => {
  const { lng, lat } = props.lnglat;

  if (!lng || !lat) {
    addressName.value = '';
    return;
  }
  if(!markMap) { return }

  markMap(new AMap.LngLat(lng, lat))
  map.setCenter([lng, lat])
}, {immediate: true})
</script>

<style lang="scss" scoped>
.gaodemap{
  overflow: hidden;
  z-index: 99;
}
#gaodeMapWrap{
  height: 50vh;
  width: 50vw;
}
.searchInputWrap{
  width: 40vw;
  z-index: 99;
}

.comfirmWrap{
  margin-top: 40px;
  background-color: white;
  display: flex;
  flex-direction: row-reverse;
}
</style>
