<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
#tab-bar {
  display: flex;
  background-color: #f6f6f6;
  /* 将tab-bar移到最下面，left，right是为了将tab-bar拉开，占据整个屏幕宽度 */
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  box-shadow: 0 -1px 1px rgba(200, 200, 200, 0.2);
}
</style>
