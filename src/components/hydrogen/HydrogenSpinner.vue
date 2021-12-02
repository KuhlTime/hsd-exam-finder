<template>
  <div id="spinner"></div>
</template>

<script>
export default {
  name: 'hydrogen-spinner'
}
</script>

<style scoped>
#spinner {
  /* Display */
  display: inline-block;
  width: 28px;
  height: 28px;

  /* Style */
  border: 3px solid rgb(229, 229, 229);
  border-right: 3px solid black;
  border-radius: 50%;

  /* Animation */
  animation: spinner 1s linear infinite;
}

@keyframes spinner {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
