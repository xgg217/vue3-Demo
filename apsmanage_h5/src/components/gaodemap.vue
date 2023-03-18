<template>
  <div class="gaodemap">
    <div class="absolute searchInputWrap">
      <van-field :id="'mapSearchIn'" v-model="addressName" label="" placeholder="请输入地址" />
    </div>
    <div id="gaodeMapWrap"></div>
    <div class="comfirmWrap flex-center">
      <el-button :style="{width: route.name === 'addDemand' || props.isEdit ? '42%' : '90%'}" @click="closeMapWindow" type="primary" plain>关闭</el-button>
      <el-button style="width: 42%" v-if="route.name === 'addDemand' || props.isEdit" type="primary" @click="comfiremMapSelect">确定</el-button>
    </div>
  </div>
</template>

<script setup>
import remoteLoad from '@/utils/remoteLoad.js'
import { failTip } from "@/utils/toastTips"

const route = useRoute()

onMounted(async () => {
  if (window.AMap && window.AMapUI) {
    createdMap()
  } else {
    await remoteLoad(`https://webapi.amap.com/maps?v=1.4.15&key=${window.mapKey}&plugin=AMap.Autocomplete,AMap.Geocoder,AMap.PlaceSearch`)
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
  }
})

watch(props.lnglat, (newVal, oldVal) => {
  markMap(new AMap.LngLat(newVal.lng, newVal.lat))
  map.setCenter([newVal.lng, newVal.lat])
})

const emit = defineEmits(["getAddressInfo", "update:modelValue"])

const addressName = ref('')
let addressLnglat = null

/* 地图创建 */
let map = null
let marker = null
let geocoder = null
let AMap = null
const createdMap = () => {
  if (!window.AMap) {
    alert('载入地图失败！')
    return
  }
  // console.log(window.AMap)
  AMap = window.AMap
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
    console.log('地图加载完成')
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
    failTip("该地址不可用，请重新选择！")
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
const closeMapWindow = () => {
  emit('update:modelValue', false)
  window.openMap = null
}
/* 确认选择 */
const comfiremMapSelect = () => {
  if(addressLnglat){
    emit('getAddressInfo', { name: addressName.value, lnglat: addressLnglat })
    emit("update:modelValue", false)
    window.openMap = null
  }
}
</script>

<style lang="scss" scoped>
.gaodemap{
  overflow: hidden;
  z-index: 99;
}
#gaodeMapWrap{
  height: 100vh;
  width: 100vw;
}
.searchInputWrap{
  width: 100vw;
  z-index: 99;
}

.comfirmWrap{
  position: fixed;
  bottom: 0;
  left: 0;
  height: 60px;
  width: 100%;
  background-color: white;
  z-index: 9999;
  .el-button{
    height: 44px;
    border-radius: 2px;
    border: unset;
  }
}
</style>
