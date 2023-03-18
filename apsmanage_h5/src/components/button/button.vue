<template>
  <div class="button" :class="type">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "pxtButton",
  props: {
    type: {
      type: String,
      default:'default'
    },
    width: {
      type:String,
      default:'162px'
    },
    height: {
      type:String,
      default:'44px'
    },
    radius: {
      type:String,
      default:'2px'
    },
  },
}
</script>

<style scoped lang="scss">
.button{
  height: v-bind(height);
  width: v-bind(width);
  font-size: 16px;
  text-align: center;
  line-height: v-bind(height);
  border-radius: v-bind(radius);
}
.default{
  color:#0076F6;
  background: #E8F3FF;
}
.active{
  color:#FFFFFF;
  background:#0076F6;
}
.blue-gradient{
  color:#FFFFFF;
  background: linear-gradient(180deg, #6499FF 0%, #2972FE 100%);
}
.disable{
  color:#FFFFFF;
  background:#B8D4FD;
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
