<template>
  <div class="box1">
    <h3>纯CSS</h3>
    <div class="sphere">
      <div class="box"></div>
    </div>
  </div>
</template>

<style scoped>
.box1 {
  /* border: 1px solid red; */
  width: 100%;
  height: 100%;

  .sphere {
    position: relative;
    top: 0;
    left: 0;
    margin: 100px auto;
    width: 300px;
    height: 300px;
    border: 1px solid #000;
    border-radius: 50%;
  }

  .box {
    position: absolute;
    /* top: 50%;
    left: 50%; */
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    background-color: red;
    transform-origin: 150% 150%;
    animation: mymove 5s infinite linear;
    border-radius: 50%;
  }
}

@keyframes mymove {
  from {
    /* 开始时旋转0度 */
    transform: rotate(0deg);

    background-color: red;
  }
  to {
    /* 结束时旋转360度 */
    transform: rotate(360deg);
    background-color: blue;
  }
}
</style>
