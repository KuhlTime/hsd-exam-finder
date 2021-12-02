<template>
  <div class="flex parent" :class="{ debug }">
    <div ref="left" class="flex child left">
      <slot name="left" />
    </div>
    <div class="flex child center">
      <slot />
    </div>
    <div ref="right" class="flex child right">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Bar',
  props: {
    debug: {
      type: Boolean,
      default: false
    }
  },
  mounted: function () {
    this.render()
  },
  updated: function () {
    this.render()
  },
  methods: {
    render() {
      // Add +1 to prevent some elements from micro shrinking
      this.updateWidth(this.maxSideWidth() + 1)
    },
    width(reference) {
      return this.$refs[reference].clientWidth
    },
    updateWidth(width) {
      const pxWidth = `${width}px`
      // Set the calculated width for the left and the right element
      this.$refs.left.style.width = pxWidth
      this.$refs.right.style.width = pxWidth
    },
    maxSideWidth() {
      // Set the width to auto to get the width when updated
      this.$refs.left.style.width = 'auto'
      this.$refs.right.style.width = 'auto'
      // Return the largest width
      return Math.max(this.width('left'), this.width('right'))
    }
  }
}
</script>

<style scoped>
.flex {
  /* Position */
  position: relative;
  /* Display */
  display: flex;
  height: 100%;
  flex-wrap: nowrap;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
}
.parent {
  /* Display */
  width: 100%;
  height: 48px !important;
}
.child {
  /* Display */
  gap: 12px;
}
.left {
  /* Display */
  justify-content: flex-start;
}
.center {
  /* Display */
  flex-shrink: 1;
  justify-content: center;
}
.right {
  /* Display */
  justify-content: flex-end;
}
.debug,
.debug .child {
  /* Style */
  border: 1px dashed red;
}
</style>
