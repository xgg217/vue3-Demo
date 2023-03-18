<template>
  <div class="select">
    <div class="select_title" v-if="title">
      {{ title }}
    </div>
    <div class="select_group">
      <van-config-provider :theme-vars="themeVars">
        <van-field
            v-model="message"
            rows="4"
            autosize
            type="textarea"
            :placeholder="placeholder"
            show-word-limit
        />
      </van-config-provider>



    </div>
  </div>
</template>
<script setup name="PxtTextarea">
const themeVars = {
  // rateIconFullColor: '#07c160',
  // sliderBarHeight: '4px',
  // sliderButtonWidth: '20px',
  // sliderButtonHeight: '20px',
  // sliderActiveBackgroundColor: '#07c160',
  // buttonPrimaryBorderColor: '#07c160',
  // buttonPrimaryBackgroundColor: '#07c160',
};


let props = defineProps({
  title: {
    type: String,
    default: '处理备注'
  },
  selectChecked:{
    type: String,
    default: ''
  },
  placeholder:{
    type: String,
    default: '添加处理意见和建议'
  },
  selectList: {
    type: Array,
    default: () => [
      {
        value: 'Option1',
        label: 'Option1',
      },
      {
        value: 'Option2',
        label: 'Option2',
      },
    ]
  },
})
let selectChecked = ref('')
const emit = defineEmits(["update:selectChecked"])

watch(
    () => props.selectChecked,
    () => {
      console.log('props.radioChecked update')
      selectChecked.value = props.selectChecked
    },{
      immediate:true
    }
)
</script>

<style lang="scss" scoped>
$input_height: 36px;
.select {
  &_title {
    color: $e-gray;
    margin-right: 10px;
    font-size: 14px;
    flex-shrink: 0;
  }

  &_group {
    display: flex;
    flex: 1;
    background: $e-blue;
    border-radius: 2px;
  }
}
</style>
