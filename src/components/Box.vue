<template>
  <div class="box">
    <div class="box-header">
      <slot name="header" />
    </div>
    <div class="default-slot">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'box'
}
</script>

<style lang="scss" scoped>
.box {
  position: relative;
  display: flex;
  border-radius: 4px 4px 0 0;
  background-color: #fff;
  overflow: hidden;
  height: 100%;
  flex-direction: column;
}

.box-header {
  height: 60px;
  color: #fff;
  overflow: hidden;
  overflow-x: scroll;
  border-bottom: 1px solid #5ca8ff;
}

.default-slot {
  overflow: hidden;
  height: 100%;
}
</style>
