<template>
  <div class="center">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Center'
}
</script>

<style lang="scss" scoped>
.center {
  /* Position */
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;

  /* Display */
  width: 100%;

  /* Transform */
  transform: translate(-50%, -50%);
}
</style>
